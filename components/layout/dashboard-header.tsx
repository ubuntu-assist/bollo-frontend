'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface NavItem {
  title: string
  path: string
}

interface NotificationItem {
  message: string
  timeAgo: string
}

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false)
      }
    }

    if (isProfileOpen || isNotificationOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isProfileOpen, isNotificationOpen])

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const navItems: NavItem[] = [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Services', path: '/offered-services' },
    { title: 'Payout History', path: '/payments' },
    { title: 'Wishlist', path: '/wishlist' },
    { title: 'Review', path: '/reviews' },
  ]

  const notifications: NotificationItem[] = [
    { message: 'Notification one', timeAgo: '7 hours ago' },
    { message: 'Notification one', timeAgo: '7 hours ago' },
    { message: 'Notification one', timeAgo: '7 hours ago' },
    { message: 'Notification one', timeAgo: '7 hours ago' },
  ]

  return (
    <>
      <header className='header headerAbsolute left-0 right-0 top-0 z-50 bg-white'>
        <div className='4xl:large-container max-4xl:container'>
          <div className='text-s1 flex items-center justify-between py-6'>
            <div className='flex items-center justify-start gap-3 pb-1'>
              <button
                className='text-3xl text-[#1B3B86] lg:hidden'
                onClick={toggleMobileMenu}
              >
                <i className='ph ph-list'></i>
              </button>
              <Link href='/'>
                <img
                  src='/assets/images/logo.png'
                  alt='Bollo logo'
                  className='w-auto h-14'
                />
              </Link>
            </div>

            <nav className='max-lg:hidden'>
              <ul className='flex items-center justify-center gap-2 font-medium xxl:gap-6'>
                {navItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className='dashboardMenu rounded-full px-4 py-3 text-gray-600 transition-colors duration-300 hover:bg-[#1B3B86] hover:text-white'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='flex items-center justify-end gap-2 sm:gap-6'>
              <div
                ref={notificationRef}
                className='relative flex cursor-pointer items-center justify-center rounded-full bg-[#1B3B86]/5 p-3 text-[#1B3B86] hover:bg-[#1B3B86]/10 transition-colors'
                onClick={toggleNotification}
              >
                <i className='ph ph-bell text-2xl !leading-none'></i>
                <span className='absolute right-3 top-3 rounded-full bg-[#E31C79]/10 p-px'>
                  <span className='block size-2.5 rounded-full bg-[#E31C79]'></span>
                </span>

                <div
                  className={`absolute right-0 top-12 w-[230px] origin-top-right rounded-2xl border border-[#1B3B86]/10 bg-white py-4 shadow-lg duration-500 ${
                    isNotificationOpen ? 'modalOpen' : 'modalClose'
                  }`}
                >
                  <p className='px-4 pb-3 text-lg font-semibold text-gray-900'>
                    Notification
                  </p>
                  <div className='flex w-full flex-col items-start justify-start gap-4 border-y border-[#1B3B86]/10 p-3'>
                    {notifications.map((note, index) => (
                      <div
                        key={index}
                        className='flex items-start justify-start gap-2'
                      >
                        <i className='ph ph-bell flex items-center justify-center rounded-full bg-[#1B3B86] p-2 text-white'></i>
                        <div>
                          <p className='text-gray-900'>{note.message}</p>
                          <p className='text-sm text-gray-500'>
                            {note.timeAgo}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className='px-4 pt-3 text-lg font-semibold text-[#1B3B86] hover:text-[#E31C79] cursor-pointer transition-colors'>
                    See All Notification
                  </p>
                </div>
              </div>

              <div
                ref={profileRef}
                className='relative cursor-pointer rounded-full bg-[#1B3B86]/5 p-px hover:bg-[#1B3B86]/10 transition-colors'
                onClick={toggleProfile}
              >
                <img
                  src='/assets/images/people_small1.png'
                  className='size-11 rounded-full'
                  alt='User profile'
                />
                <div
                  className={`absolute right-0 top-12 w-[200px] origin-top-right rounded-2xl border border-[#1B3B86]/10 bg-white py-4 shadow-lg duration-500 ${
                    isProfileOpen ? 'modalOpen' : 'modalClose'
                  }`}
                >
                  <ul className='flex flex-col gap-3 pl-4'>
                    {['Profile', 'Edit Profile', 'Settings', 'Logout'].map(
                      (item) => (
                        <li
                          key={item}
                          className='font-medium text-gray-600 hover:text-[#E31C79] transition-colors'
                        >
                          <Link
                            href={`/${item.toLowerCase().replace(' ', '-')}`}
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className='lg:hidden'>
          <div
            className={`fixed left-0 top-0 z-[998] h-full w-full bg-[#1B3B86]/5 duration-700 ${
              isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={toggleMobileMenu}
          />

          <div
            className={`fixed left-0 top-0 z-[999] flex h-full w-3/4 flex-col items-start justify-start gap-8 bg-[#1B3B86] text-white/90 duration-700 min-[500px]:w-1/2 ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className='fixed top-0 flex w-full items-center justify-between bg-[#1B3B86] p-4 sm:p-8'>
              <Link href='/'>
                <img
                  src='/assets/images/logo.png'
                  alt='logo'
                  className='w-[150px]'
                />
              </Link>
              <button
                className='text-3xl text-white hover:text-[#E31C79] transition-colors'
                onClick={toggleMobileMenu}
              >
                <i className='ph ph-x'></i>
              </button>
            </div>

            <ul className='flex w-full flex-col items-start gap-6 overflow-y-auto pb-10 pl-8 pt-24 text-lg sm:text-xl lg:gap-10'>
              {navItems.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.path}
                    className='text-white/90 hover:text-[#E31C79] transition-colors'
                    onClick={toggleMobileMenu}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
      <div className='h-[160px]'></div>
    </>
  )
}

export default Header
