import JoinWaitlistCTA from '@/components/common/join-waitlist-cta'

export default function JoinWaitlistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Join the Waitlist
            </h1>
            <p className="text-xl text-gray-600">
              Be among the first to experience Bollo when we launch
            </p>
          </div>
          <JoinWaitlistCTA />
        </div>
      </div>
    </div>
  )
} 