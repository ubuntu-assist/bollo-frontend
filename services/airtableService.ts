export interface WaitlistEntry {
  fullName: string
  email: string
  phone?: string
  interest: string
  agreeTerms: boolean
}

export interface AirtableRecord {
  id: string
  fields: {
    ID: number
    'Full Name': string
    Email: string
    Phone: string
    Interest: string
    'Agree Terms': boolean
    Status: string
    'Submission Date': string
  }
  createdTime: string
}

class AirtableService {
  private baseId: string
  private apiToken: string
  private tableName: string
  private baseUrl: string

  constructor() {
    this.baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!
    this.apiToken = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN!
    this.tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Waitlist'
    this.baseUrl = `https://api.airtable.com/v0/${this.baseId}/${this.tableName}`

    if (!this.baseId || !this.apiToken) {
      throw new Error('Airtable credentials not found in environment variables')
    }
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    }
  }

  // Add new waitlist entry
  async addWaitlistEntry(data: WaitlistEntry): Promise<AirtableRecord> {
    try {
      const payload = {
        fields: {
          'Full Name': data.fullName,
          Email: data.email,
          Phone: data.phone || '',
          Interest: data.interest,
          'Agree Terms': data.agreeTerms,
          Status: 'Pending',
          'Submission Date': new Date().toISOString(),
        },
      }

      console.log(payload)

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          `Airtable API Error: ${errorData.error?.message || 'Unknown error'}`
        )
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error adding waitlist entry:', error)
      throw error
    }
  }

  // Check if email already exists
  async emailExists(email: string): Promise<boolean> {
    try {
      const encodedEmail = encodeURIComponent(email)
      const url = `${this.baseUrl}?filterByFormula={Email}="${encodedEmail}"`

      const response = await fetch(url, {
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to check email existence')
      }

      const result = await response.json()
      return result.records.length > 0
    } catch (error) {
      console.error('Error checking email:', error)
      return false // Assume email doesn't exist on error
    }
  }

  // Get all waitlist entries
  async getAllEntries(): Promise<AirtableRecord[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?sort[0][field]=Submission%20Date&sort[0][direction]=desc`,
        {
          headers: this.getHeaders(),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch waitlist entries')
      }

      const result = await response.json()
      return result.records
    } catch (error) {
      console.error('Error fetching entries:', error)
      throw error
    }
  }

  // Get waitlist count
  async getWaitlistCount(): Promise<number> {
    try {
      const entries = await this.getAllEntries()
      return entries.length
    } catch (error) {
      console.error('Error getting waitlist count:', error)
      return 0
    }
  }

  // Update entry status
  async updateEntryStatus(
    recordId: string,
    status: string
  ): Promise<AirtableRecord> {
    try {
      const payload = {
        fields: {
          Status: status,
        },
      }

      const response = await fetch(`${this.baseUrl}/${recordId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to update entry status')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error updating entry status:', error)
      throw error
    }
  }
}

// Lazy-loaded service instance
let airtableServiceInstance: AirtableService | null = null

export const getAirtableService = (): AirtableService => {
  if (!airtableServiceInstance) {
    airtableServiceInstance = new AirtableService()
  }
  return airtableServiceInstance
}

// For backward compatibility
export const airtableService = {
  addWaitlistEntry: (data: WaitlistEntry) => getAirtableService().addWaitlistEntry(data),
  emailExists: (email: string) => getAirtableService().emailExists(email),
  getAllEntries: () => getAirtableService().getAllEntries(),
  getWaitlistCount: () => getAirtableService().getWaitlistCount(),
  updateEntryStatus: (recordId: string, status: string) => getAirtableService().updateEntryStatus(recordId, status),
}
