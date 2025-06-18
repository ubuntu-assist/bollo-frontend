'use client'

import { useEffect, useState } from 'react'
import WelcomeGuide from './welcome-guide'

const WelcomeGuideWrapper: React.FC = () => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure this only runs on client side
  useEffect(() => {
    setIsClient(true)

    // Logic to determine if user is new
    const hasSeenTour = localStorage.getItem('bollo-tour-completed')
    const userRegistrationDate = localStorage.getItem('user-registration-date')

    // Example logic - customize based on your needs
    if (!hasSeenTour) {
      setIsNewUser(true)
    }
  }, [])

  // Handle tour completion
  const handleTourComplete = () => {
    console.log('Tour completed!')
    // Add any additional completion logic here
    // You could also dispatch events, call APIs, etc.
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null
  }

  return <WelcomeGuide isNewUser={isNewUser} onComplete={handleTourComplete} />
}

export default WelcomeGuideWrapper
