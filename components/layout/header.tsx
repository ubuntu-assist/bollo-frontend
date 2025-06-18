'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  Plus,
  Maximize,
  Minimize,
} from 'lucide-react'
import { useResizeDetector } from 'react-resize-detector'
import Link from 'next/link'

interface NavOption {
  title: string
  url: string
}

interface NavItem {
  name: string
  type: 'link' | 'dropdown'
  to?: string
  options?: NavOption[]
}

interface Language {
  code: string
  name: string
  countryCode: string
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState<string>('en')
  const [navSize, setNavSize] = useState('normal')

  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  const languages: Language[] = [
    { code: 'en', name: 'English', countryCode: 'GB' },
    { code: 'fr', name: 'Français', countryCode: 'FR' },
  ]

  const navItems: NavItem[] = [
    { name: 'Home', type: 'link', to: '/' },
    {
      name: 'Services',
      type: 'dropdown',
      options: [
        { title: 'All Services', url: '/services' },
        { title: 'Browse Tasks', url: '/browse-tasks' },
      ],
    },
    {
      name: 'Workers',
      type: 'dropdown',
      options: [
        { title: 'Find Workers', url: '/find-workers' },
        { title: 'Worker Directory', url: '/worker-directory' },
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (width) {
      if (width < 768) {
        setNavSize('compact')
      } else if (width >= 768 && width < 1280) {
        setNavSize('normal')
      }
    }
  }, [width])

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Toggle submenu in mobile view
  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name)
  }

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code)
  }

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === currentLanguage)
  }

  const toggleNavSize = () => {
    if (navSize === 'normal') {
      setNavSize('compact')
    } else if (navSize === 'compact') {
      setNavSize('normal')
    } else {
      setNavSize('normal')
    }
  }

  const getFlagUrl = (countryCode: string) => {
    return `https://flagsapi.com/${countryCode}/flat/32.png`
  }

  return (
    <>
      <motion.header
        ref={ref}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-2'
            : navSize === 'compact'
            ? 'py-2'
            : navSize === 'normal'
            ? 'py-3'
            : 'py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='container mx-auto px-4'>
          <div
            className={`bg-white/80 backdrop-blur-md rounded-full border border-gray-200 flex items-center justify-between px-5 py-2 ${
              scrolled ? 'shadow-lg' : ''
            }`}
          >
            <div className='flex items-center'>
              {/* Mobile Menu Button (LEFT side) */}
              <button
                onClick={toggleMenu}
                className='lg:hidden text-[#1B3B86] mr-3 w-10 h-10 flex justify-center items-center rounded-full bg-[#1B3B86]/10 hover:bg-[#1B3B86]/20 transition-colors duration-300'
                aria-label='Toggle menu'
              >
                {isOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </button>

              {/* Resize Button */}
              <button
                onClick={toggleNavSize}
                className='hidden md:flex text-[#1B3B86] mr-3 w-10 h-10 justify-center items-center rounded-full bg-[#1B3B86]/10 hover:bg-[#1B3B86]/20 transition-colors duration-300'
                aria-label='Resize navbar'
              >
                {navSize === 'compact' ? (
                  <Maximize className='h-5 w-5' />
                ) : navSize === 'expanded' ? (
                  <Minimize className='h-5 w-5' />
                ) : (
                  <Maximize className='h-5 w-5' />
                )}
              </button>

              {/* Logo - CLASSE AJOUTÉE POUR LE TOUR */}
              <Link href='/' className='logo flex items-center'>
                <img
                  src='/assets/images/logo.png'
                  alt='Bollo logo'
                  className={`transition-all duration-300 ${
                    navSize === 'compact'
                      ? 'h-8 w-auto'
                      : navSize === 'normal'
                      ? 'h-10 w-auto'
                      : 'h-12 w-auto'
                  }`}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden lg:block'>
              <nav>
                <ul
                  className={`flex items-center gap-6 font-medium transition-all duration-300 ${
                    navSize === 'compact'
                      ? 'text-sm'
                      : navSize === 'normal'
                      ? 'text-base'
                      : 'text-lg'
                  }`}
                >
                  {navItems.map((item) => (
                    <li
                      key={item.name}
                      className={`group relative ${
                        item.name === 'Services'
                          ? 'services-nav'
                          : item.name === 'Workers'
                          ? 'workers-nav'
                          : ''
                      }`}
                    >
                      {item.type === 'link' ? (
                        <Link
                          href={item.to!}
                          className={`block px-2 py-2 text-[#1B3B86] hover:text-[#E31C79] transition-colors ${
                            navSize === 'compact'
                              ? 'py-1'
                              : navSize === 'normal'
                              ? 'py-2'
                              : 'py-3'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <>
                          <div
                            className={`flex items-center gap-1 px-2 text-[#1B3B86] hover:text-[#E31C79] transition-colors cursor-pointer ${
                              navSize === 'compact'
                                ? 'py-1'
                                : navSize === 'normal'
                                ? 'py-2'
                                : 'py-3'
                            }`}
                          >
                            {item.name}
                            <ChevronDown
                              className={`transition-transform group-hover:rotate-180 ${
                                navSize === 'compact'
                                  ? 'h-3 w-3'
                                  : navSize === 'normal'
                                  ? 'h-4 w-4'
                                  : 'h-5 w-5'
                              }`}
                            />
                          </div>
                          <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full w-48 bg-[#1B3B86] rounded-lg py-4 transition-all'>
                            {item.options!.map((option) => (
                              <div key={option.title}>
                                <Link
                                  href={option.url}
                                  className='block px-6 py-2 text-white hover:text-[#E31C79] transition-colors'
                                >
                                  {option.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right Side Elements */}
            <div className='flex items-center gap-6'>
              <div className='hidden sm:flex items-center gap-6'>
                {/* Language Selector with Flag Images */}
                <div className='group relative'>
                  <button
                    className={`flex items-center gap-2 px-2 text-[#1B3B86] hover:text-[#E31C79] transition-colors ${
                      navSize === 'compact'
                        ? 'py-1'
                        : navSize === 'normal'
                        ? 'py-2'
                        : 'py-3'
                    }`}
                  >
                    <img
                      src={getFlagUrl(
                        getCurrentLanguage()?.countryCode || 'GB'
                      )}
                      alt={getCurrentLanguage()?.name || 'English'}
                      className={`inline-block rounded-sm ${
                        navSize === 'compact'
                          ? 'w-4 h-4'
                          : navSize === 'normal'
                          ? 'w-5 h-5'
                          : 'w-6 h-6'
                      }`}
                    />
                    <span>{getCurrentLanguage()?.code.toUpperCase()}</span>
                    <ChevronDown
                      className={`transition-transform group-hover:rotate-180 ${
                        navSize === 'compact'
                          ? 'h-3 w-3'
                          : navSize === 'normal'
                          ? 'h-4 w-4'
                          : 'h-5 w-5'
                      }`}
                    />
                  </button>
                  <ul className='invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full w-48 bg-[#1B3B86] rounded-lg py-4 transition-all'>
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={() => handleLanguageChange(lang.code)}
                          className='w-full text-left px-6 py-2 text-white hover:text-[#E31C79] transition-colors flex items-center gap-2'
                        >
                          <img
                            src={getFlagUrl(lang.countryCode)}
                            alt={lang.name}
                            className='inline-block w-5 h-5 rounded-sm'
                          />
                          <span>{lang.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sign In Link */}
                <Link
                  href='/signin'
                  className={`text-[#1B3B86] hover:text-[#E31C79] transition-colors ${
                    navSize === 'compact'
                      ? 'text-sm'
                      : navSize === 'normal'
                      ? 'text-base'
                      : 'text-lg'
                  }`}
                >
                  Sign in
                </Link>
              </div>

              <div className='flex items-center gap-3'>
                {/* Post Task Button - CLASSE AJOUTÉE POUR LE TOUR */}
                <Link
                  href='/post-task'
                  className={`post-task-button flex items-center justify-center rounded-full bg-[#1B3B86] text-white hover:bg-[#E31C79] transition-colors ${
                    navSize === 'compact'
                      ? 'h-9 text-sm'
                      : navSize === 'normal'
                      ? 'h-11 text-base'
                      : 'h-12 text-lg'
                  }`}
                >
                  <span
                    className={`hidden ${
                      navSize === 'compact'
                        ? 'xxl:block px-6'
                        : navSize === 'normal'
                        ? 'xxl:block px-8'
                        : 'xl:block px-8'
                    }`}
                  >
                    Post a Task
                  </span>
                  <Plus
                    className={`${
                      navSize === 'compact'
                        ? 'xxl:hidden h-4 w-4 mx-3'
                        : navSize === 'normal'
                        ? 'xxl:hidden h-5 w-5 mx-3'
                        : 'xl:hidden h-6 w-6 mx-4'
                    }`}
                  />
                </Link>

                {/* Become Tasker Button - CLASSE AJOUTÉE POUR LE TOUR */}
                <Link
                  href='/become-tasker'
                  className={`become-tasker-button hidden xl:flex items-center border-2 border-[#1B3B86] text-[#1B3B86] hover:bg-[#E31C79] hover:border-[#E31C79] hover:text-white transition-colors rounded-full ${
                    navSize === 'compact'
                      ? 'px-6 py-2 text-sm'
                      : navSize === 'normal'
                      ? 'px-8 py-3 text-base'
                      : 'px-10 py-3 text-lg'
                  }`}
                >
                  Become a Tasker
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 z-40 pt-20 bg-[#1B3B86]/95 backdrop-blur-lg lg:hidden'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='container mx-auto px-4 py-8'>
              <div className='p-6'>
                {/* Language Selector for Mobile with Flag Images */}
                <div className='mb-6'>
                  <div className='text-white/80 mb-2'>Select Language</div>
                  <div className='grid grid-cols-2 gap-2'>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code)
                          toggleMenu()
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          currentLanguage === lang.code
                            ? 'bg-[#E31C79] text-white'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <img
                          src={getFlagUrl(lang.countryCode)}
                          alt={lang.name}
                          className='inline-block w-5 h-5 rounded-sm'
                        />
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <nav>
                  <ul className='space-y-4'>
                    {navItems.map((item) => (
                      <motion.li
                        key={item.name}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.type === 'link' ? (
                          <Link
                            href={item.to!}
                            className='block py-2 text-white hover:text-[#E31C79] transition-colors text-xl'
                            onClick={toggleMenu}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <div>
                            <button
                              className='flex items-center justify-between w-full py-2 text-white hover:text-[#E31C79] transition-colors text-xl'
                              onClick={() => toggleSubmenu(item.name)}
                            >
                              {item.name}
                              <motion.div
                                animate={{
                                  rotate: activeSubmenu === item.name ? 90 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className='h-5 w-5' />
                              </motion.div>
                            </button>
                            <AnimatePresence>
                              {activeSubmenu === item.name && (
                                <motion.ul
                                  className='pl-4 space-y-2 overflow-hidden'
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.options!.map((option) => (
                                    <li key={option.title}>
                                      <Link
                                        href={option.url}
                                        className='block py-2 text-white/80 hover:text-[#E31C79] transition-colors'
                                        onClick={toggleMenu}
                                      >
                                        {option.title}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </motion.li>
                    ))}

                    {/* Sign In for Mobile */}
                    <motion.li
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        href='/signin'
                        className='block py-2 text-white hover:text-[#E31C79] transition-colors text-xl'
                        onClick={toggleMenu}
                      >
                        Sign in
                      </Link>
                    </motion.li>
                  </ul>
                </nav>

                <div className='mt-8'>
                  <Link
                    href='/become-tasker'
                    className='w-full flex items-center justify-center px-6 py-3 rounded-xl text-white bg-[#E31C79] hover:bg-[#E31C79]/80 transition-colors text-lg font-medium'
                  >
                    Become a Tasker
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
