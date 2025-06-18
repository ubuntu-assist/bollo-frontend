'use client'

import {
  IconBrandLinkedin,
  IconBrandX,
  IconFileText,
  IconShieldLock,
  IconArrowUp,
} from '@tabler/icons-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const navigationLinks = [
    { label: 'Find Work', href: '/find-work' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ]

  return (
    <footer className='bg-[#1B3B86] text-white relative'>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className='absolute -top-6 right-4 md:right-8 bg-[#E31C79] hover:bg-[#E31C79]/90 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E31C79] focus:ring-offset-2'
        aria-label='Scroll to top'
      >
        <IconArrowUp size={24} stroke={2} />
      </button>

      <div className='container'>
        {/* Navigation Links */}
        <div className='flex items-center justify-between gap-6 py-10 text-base font-medium max-lg:flex-col sm:text-lg lg:py-20 xl:text-xl'>
          <ul className='flex items-center justify-start gap-4 sm:gap-6 lg:gap-10'>
            {['Home', 'About Us', 'FAQ'].map((item) => (
              <li key={item}>
                <a
                  className='duration-500 hover:text-[#E31C79]'
                  href={`./${item.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <a href='./index'>
            <img
              src='/assets/images/bollo-logo-white.png'
              alt='Bollo logo'
              className='w-auto h-16'
            />
          </a>

          <ul className='flex items-center justify-start gap-4 sm:gap-6 lg:gap-10'>
            {navigationLinks.map(({ label, href }) => (
              <li key={label}>
                <Link className='duration-500 hover:text-[#E31C79]' href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className='border-y border-white/20'>
        <div className='container py-8 flex justify-center'>
          <div className='flex flex-col items-center md:flex-row md:items-center md:justify-center gap-5'>
            <p className='text-lg font-medium'>Subscribe to our newsletter</p>
            <div className='rounded-full border-2 border-white'>
              <input
                type='text'
                className='bg-transparent px-2 outline-none placeholder:text-white/80 max-[400px]:w-[200px] min-[400px]:px-4 lg:px-8'
                placeholder='Enter Email'
              />
              <button className='rounded-full border-2 border-[#E31C79] bg-[#E31C79] px-2 py-3 font-medium text-white transition-colors hover:bg-[#E31C79]/90 sm:px-4 sm:py-4 xl:px-8'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='container flex items-center justify-between gap-6 py-8 font-medium max-md:flex-col'>
        {/* Terms & Privacy Links */}
        <div className='flex items-center justify-start gap-4'>
          <Link
            href='/terms-and-agreements'
            className='flex items-center gap-2 hover:text-[#E31C79] transition-colors'
          >
            <IconFileText size={20} />
            <span>Terms & Agreements</span>
          </Link>
          <Link
            href='/privacy-policy'
            className='flex items-center gap-2 hover:text-[#E31C79] transition-colors'
          >
            <IconShieldLock size={20} />
            <span>Privacy Policy</span>
          </Link>
        </div>

        {/* Social Links with Tabler Icons */}
        <div className='flex items-center justify-center gap-5'>
          <a
            href='https://x.com/bollochain'
            className='hover:text-[#E31C79] transition-colors'
            aria-label='X'
            target='_blank'
          >
            <IconBrandX size={28} stroke={1.5} />
          </a>
          <a
            href='https://www.linkedin.com/company/bolloo'
            className='hover:text-[#E31C79] transition-colors'
            aria-label='Instagram'
            target='_blank'
          >
            <IconBrandLinkedin size={28} stroke={1.5} />
          </a>
        </div>

        <p>Copyright @ {currentYear} Bollo</p>
      </div>
    </footer>
  )
}

export default Footer
