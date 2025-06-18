'use client'

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const JoinWaitlistCTA: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setIsExpanded(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const handleJoinWaitlist = (): void => {
    // Track waitlist engagement if needed
    console.log('Redirecting to waitlist page...')
  }

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      {/* Expanded Card */}
      {isExpanded && (
        <div className='mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300'>
          <div className='flex items-start gap-3 mb-4'>
            <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#1B3B86] to-[#E31C79] rounded-full flex items-center justify-center'>
              <i className='ph ph-bell text-white text-xl'></i>
            </div>
            <div className='flex-1'>
              <h3 className='font-bold text-gray-900 text-lg'>Join Waitlist</h3>
              <p className='text-sm text-gray-600'>Be the first to know!</p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            >
              <i className='ph ph-x text-lg'></i>
            </button>
          </div>

          <div className='mb-4'>
            <p className='text-gray-700 text-sm leading-relaxed mb-3'>
              Join our exclusive waitlist to get early access to new features
              and services.
            </p>
            <div className='flex items-center gap-2 text-xs text-gray-500'>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                <span>Early access</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                <span>Exclusive updates</span>
              </div>
            </div>
          </div>

          <Link
            href='/join-waitlist'
            onClick={handleJoinWaitlist}
            className='group relative w-full flex items-center justify-center bg-gradient-to-r from-[#1B3B86] to-[#E31C79] text-white rounded-full py-3 px-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg'
          >
            <span>Join Waitlist</span>
            <i className='ph-bold ph-arrow-right ml-2 transition-transform group-hover:translate-x-1'></i>
          </Link>

          <p className='text-xs text-gray-500 text-center mt-2'>
            Get notified when we launch new features
          </p>
        </div>
      )}

      {/* Floating Button */}
      <div className='relative'>
        {/* Pulse Animation Ring */}
        <div className='absolute inset-0 bg-[#E31C79] rounded-full animate-ping opacity-25'></div>
        <div className='absolute inset-0 bg-[#E31C79] rounded-full animate-ping opacity-25 animation-delay-75'></div>

        {/* Main Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='relative group bg-gradient-to-br from-[#1B3B86] to-[#E31C79] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#E31C79]/30'
        >
          {/* Icon with rotation animation */}
          <div
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          >
            {isExpanded ? (
              <i className='ph ph-x text-2xl'></i>
            ) : (
              <i className='ph ph-bell text-2xl'></i>
            )}
          </div>

          {/* Notification Badge */}
          <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center'>
            <span className='text-xs font-bold text-white'>!</span>
          </div>
        </button>

        {/* Tooltip for collapsed state */}
        {!isExpanded && (
          <div className='absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'>
            Join our waitlist!
            <div className='absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900'></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JoinWaitlistCTA
