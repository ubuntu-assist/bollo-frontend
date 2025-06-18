'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DeleteConfirmation from '@/components/common/delete-confirmation'

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  hasBookings?: boolean
  bookingCount?: number
  bookings?: ServiceBooking[]
}

interface ServiceBooking {
  id: string
  date: string
  time: string
  service: string
  customer: string
  status: 'confirmed' | 'pending' | 'completed'
  price: number
}

const Services = () => {
  const [serviceStates, setServiceStates] = useState([true, true, true, true])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<number | null>(null)

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [showBookings, setShowBookings] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const [stableBookingsList, setStableBookingsList] = useState<
    ServiceBooking[]
  >([])

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleToggleChange = (index: number) => {
    setServiceStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    )
  }

  const handleDeleteRequest = (serviceIndex: number) => {
    setDeleteDialogOpen(serviceIndex)
  }

  const handleConfirmDelete = (serviceIndex: number) => {
    console.log(`Deleting service ${serviceIndex + 1}`)
    setTimeout(() => {
      setDeleteDialogOpen(null)
    }, 500)
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(null)
  }

  // Calendar functions
  const generateCalendarDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const today = new Date()

    // First day of the month and last day
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Start from Sunday of the first week
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: CalendarDay[] = []
    const currentDate = new Date(startDate)

    // Mock booking data
    const mockBookings: ServiceBooking[] = [
      {
        id: '1',
        date: 'Mon, 15 Jan',
        time: '10:00 AM - 11:00 AM',
        service: 'Home Cleaning Service',
        customer: 'Sarah Johnson',
        status: 'confirmed',
        price: 120,
      },
      {
        id: '2',
        date: 'Mon, 15 Jan',
        time: '2:00 PM - 3:30 PM',
        service: 'Plumbing Repair',
        customer: 'Mike Chen',
        status: 'pending',
        price: 85,
      },
      {
        id: '3',
        date: 'Wed, 17 Jan',
        time: '9:00 AM - 10:00 AM',
        service: 'Garden Maintenance',
        customer: 'Emma Wilson',
        status: 'confirmed',
        price: 75,
      },
      {
        id: '4',
        date: 'Wed, 17 Jan',
        time: '3:00 PM - 5:00 PM',
        service: 'House Painting',
        customer: 'David Brown',
        status: 'completed',
        price: 250,
      },
      {
        id: '5',
        date: 'Fri, 19 Jan',
        time: '11:00 AM - 12:00 PM',
        service: 'Electrical Repair',
        customer: 'Lisa Martinez',
        status: 'confirmed',
        price: 95,
      },
      {
        id: '6',
        date: 'Sat, 20 Jan',
        time: '8:00 AM - 12:00 PM',
        service: 'Deep Cleaning Service',
        customer: 'James Taylor',
        status: 'pending',
        price: 180,
      },
    ]

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = currentDate.getMonth() === month
      const isToday =
        currentDate.getDate() === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()

      // Check if this day has bookings (mock logic)
      const dayBookings =
        isCurrentMonth && [15, 17, 19, 20].includes(currentDate.getDate())
          ? mockBookings.filter((booking) => {
              const bookingDay = parseInt(booking.date.split(' ')[1])
              return bookingDay === currentDate.getDate()
            })
          : []

      const hasBookings = dayBookings.length > 0
      const bookingCount = dayBookings.length

      days.push({
        date: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected: false,
        hasBookings,
        bookingCount,
        bookings: dayBookings,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const handleDayClick = (dayIndex: number) => {
    const day = calendarDays[dayIndex]
    if (!day.isCurrentMonth) return

    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day.date
    )

    // If clicking the same date, deselect it
    if (selectedDate && selectedDate.getDate() === day.date) {
      setSelectedDate(null)
      setCalendarDays((prev) => prev.map((d) => ({ ...d, isSelected: false })))
      return
    }

    // Select new date
    setSelectedDate(clickedDate)
    setCalendarDays((prev) =>
      prev.map((d, i) => ({
        ...d,
        isSelected: i === dayIndex && d.isCurrentMonth,
      }))
    )
  }

  useEffect(() => {
    const newDays = generateCalendarDays(currentDate)
    setCalendarDays(newDays)

    // Create stable bookings list for scrolling
    const allBookings = newDays
      .filter((day) => day.hasBookings && day.isCurrentMonth)
      .flatMap((day) => day.bookings || [])
      .sort((a, b) => {
        // Sort by date first, then by time
        const dateA = parseInt(a.date.split(' ')[1])
        const dateB = parseInt(b.date.split(' ')[1])
        if (dateA !== dateB) return dateA - dateB

        // If same date, sort by time
        const timeA = a.time.split(' ')[0]
        const timeB = b.time.split(' ')[0]
        return timeA.localeCompare(timeB)
      })

    setStableBookingsList(allBookings)
  }, [currentDate])

  // Comprehensive filtering system
  const filteredBookings = React.useMemo(() => {
    let filtered = stableBookingsList

    // Date filter
    if (selectedDate) {
      const selectedDay = selectedDate.getDate()
      filtered = filtered.filter((booking) => {
        const bookingDay = parseInt(booking.date.split(' ')[1])
        return bookingDay === selectedDay
      })
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((booking) => booking.status === statusFilter)
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter((booking) =>
        booking.service.toLowerCase().includes(serviceFilter.toLowerCase())
      )
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (booking) =>
          booking.customer.toLowerCase().includes(query) ||
          booking.service.toLowerCase().includes(query) ||
          booking.date.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [
    stableBookingsList,
    selectedDate,
    statusFilter,
    serviceFilter,
    searchQuery,
  ])

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedDate(null)
    setStatusFilter('all')
    setServiceFilter('all')
    setSearchQuery('')
    setCalendarDays((prev) =>
      prev.map((day) => ({ ...day, isSelected: false }))
    )
  }

  // Get unique service types for filter
  const uniqueServices = React.useMemo(() => {
    const services = [
      ...new Set(stableBookingsList.map((booking) => booking.service)),
    ]
    return services
  }, [stableBookingsList])

  const services = [
    {
      image: '/assets/images/dashboard-services-img4.png',
      editLink: '/services/slug/edit',
    },
    {
      image: '/assets/images/dashboard-services-img1.png',
      editLink: '/edit-services',
    },
    {
      image: '/assets/images/dashboard-services-img2.png',
      editLink: '/edit-services',
    },
    {
      image: '/assets/images/dashboard-services-img3.png',
      editLink: '/edit-services',
    },
  ]

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <section>
      <div className='4xl:large-container grid grid-cols-12 gap-6 max-4xl:px-4'>
        <div className='col-span-12 flex flex-col gap-6 xl:col-span-8 3xl:col-span-9'>
          {services.map((service, index) => (
            <div
              key={index}
              className='flex w-full items-center justify-between gap-6 rounded-2xl bg-white p-3 max-lg:flex-col'
            >
              <div className='flex items-center justify-start gap-6 max-md:flex-col xl:max-3xl:flex-col'>
                <div className=''>
                  <img src={service.image} className='rounded-xl' alt='' />
                </div>
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center justify-start gap-8'>
                    <div className='flex items-center justify-start gap-2'>
                      <i className='ph-fill ph-star text-2xl text-y300'></i>
                      <p className='font-medium text-n300'>4.7 (475)</p>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                      <i className='ph-fill ph-eye text-2xl text-b300'></i>
                      <p className='font-medium text-n300'>75030</p>
                    </div>
                  </div>
                  <h4 className='heading-4'>
                    On-Demand Services for Busy Lifestyles
                  </h4>
                  <div className='flex items-center justify-start gap-4 max-sm:flex-wrap'>
                    <div className='flex items-center justify-center gap-3 rounded-lg bg-b50 px-3 py-3 xl:px-6'>
                      <div className='flex items-center justify-center rounded-full bg-b300 p-3 !leading-none text-white'>
                        <i className='ph ph-arrows-counter-clockwise'></i>
                      </div>
                      <div className=''>
                        <p className='text-xl font-semibold'>17</p>
                        <p className='font-medium'>Queue</p>
                      </div>
                    </div>
                    <div className='flex items-center justify-center gap-3 rounded-lg bg-y50 px-3 py-3 xl:px-6'>
                      <div className='flex items-center justify-center rounded-full bg-y300 p-3 !leading-none text-white'>
                        <i className='ph ph-check'></i>
                      </div>
                      <div className=''>
                        <p className='text-xl font-semibold'>1,554</p>
                        <p className='font-medium'>Completed</p>
                      </div>
                    </div>
                    <div className='flex items-center justify-center gap-3 rounded-lg bg-r50 px-3 py-3 xl:px-6'>
                      <div className='flex items-center justify-center rounded-full bg-r300 p-3 !leading-none text-white'>
                        <i className='ph ph-x'></i>
                      </div>
                      <div className=''>
                        <p className='text-xl font-semibold'>105</p>
                        <p className='font-medium'>Cancelled</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between gap-6 max-md:flex-wrap 3xl:gap-16'>
                <div className='flex items-center text-center max-lg:gap-4 max-sm:flex-wrap lg:flex-col'>
                  <p className='text-lg font-semibold'>Starting From:</p>
                  <p className='text-2xl font-bold text-r300 lg:pb-5 lg:pt-3'>
                    $70.00
                  </p>
                  <p className='text-lg font-semibold lg:pb-3'>
                    On/Off Service:{' '}
                  </p>

                  <label className='flex cursor-pointer items-center justify-center'>
                    <input
                      type='checkbox'
                      value=''
                      className='peer sr-only'
                      checked={serviceStates[index]}
                      onChange={() => handleToggleChange(index)}
                    />
                    <span className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></span>
                  </label>
                </div>
                <div className='flex gap-4 lg:flex-col lg:gap-8'>
                  <Link href={service.editLink}>
                    <i className='ph ph-pencil-simple rounded-full bg-b50 p-3 text-2xl !leading-none text-b300'></i>
                  </Link>
                  <button onClick={() => handleDeleteRequest(index)}>
                    <i className='ph ph-trash rounded-full bg-r50 p-3 text-2xl !leading-none text-r300'></i>
                  </button>
                  <button>
                    <i className='ph ph-note-pencil rounded-full bg-y50 p-3 text-2xl !leading-none text-y300'></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Functional Calendar Section */}
        <div className='col-span-12 md:col-span-6 xl:col-span-4 3xl:col-span-3'>
          <motion.div
            className='rounded-xl bg-white shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <header className='flex items-center justify-between px-4 py-6 border-b border-gray-100'>
              <motion.h3
                className='text-lg font-semibold text-gray-800'
                key={`${currentDate.getMonth()}-${currentDate.getFullYear()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </motion.h3>
              <div className='flex gap-2'>
                <motion.button
                  onClick={() => navigateMonth('prev')}
                  className='flex size-9 cursor-pointer items-center justify-center rounded-full text-2xl !leading-none text-n300 duration-300 hover:bg-r300 hover:text-white'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className='ph ph-caret-left'></i>
                </motion.button>
                <motion.button
                  onClick={() => navigateMonth('next')}
                  className='flex size-9 cursor-pointer items-center justify-center rounded-full text-2xl !leading-none text-n300 duration-300 hover:bg-r300 hover:text-white'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className='ph ph-caret-right'></i>
                </motion.button>
              </div>
            </header>

            <div className='calendar p-4'>
              {/* Day Headers */}
              <div className='grid grid-cols-7 gap-1 mb-2'>
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className='px-2 py-2 text-center text-xs font-medium text-gray-500'
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <motion.div
                className='grid grid-cols-7 gap-1'
                key={`${currentDate.getMonth()}-${currentDate.getFullYear()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {calendarDays.map((day, index) => (
                    <motion.div
                      key={`${day.date}-${index}`}
                      className={`
                        relative h-10 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-all duration-200
                        ${
                          day.isCurrentMonth
                            ? 'text-gray-900 hover:bg-blue-50'
                            : 'text-gray-300'
                        }
                        ${
                          day.isToday
                            ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600'
                            : ''
                        }
                        ${
                          day.isSelected
                            ? 'bg-blue-100 text-blue-600 font-semibold'
                            : ''
                        }
                        ${
                          hoveredDay === day.date.toString() && day.hasBookings
                            ? 'bg-yellow-100 border-2 border-yellow-300'
                            : ''
                        }
                      `}
                      onClick={() => handleDayClick(index)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.01,
                      }}
                      whileHover={{
                        scale: day.isCurrentMonth ? 1.05 : 1,
                        transition: { duration: 0.1 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => {
                        if (day.isCurrentMonth && day.hasBookings) {
                          setHoveredDay(day.date.toString())
                        }
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      <span>{day.date}</span>

                      {/* Booking indicator */}
                      {day.hasBookings && day.isCurrentMonth && (
                        <motion.div
                          className={`
                            absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white rounded-full
                            ${day.isToday ? 'bg-yellow-400' : 'bg-red-400'}
                          `}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.01 + 0.2 }}
                          layoutId={`booking-${index}`}
                        >
                          {day.bookingCount}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Selected Date Info */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    className='mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm font-medium text-blue-800'>
                          {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className='text-xs text-blue-600 mt-1'>
                          Click the same date again to deselect
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedDate(null)
                          setCalendarDays((prev) =>
                            prev.map((day) => ({ ...day, isSelected: false }))
                          )
                        }}
                        className='text-xs text-blue-600 hover:text-blue-800 font-medium'
                      >
                        Clear
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bookings Toggle */}
              <div className='mt-4 flex items-center justify-between'>
                <h4 className='text-sm font-semibold text-gray-700'>
                  Service Bookings
                </h4>
                <motion.button
                  onClick={() => setShowBookings(!showBookings)}
                  className='flex items-center gap-2 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{showBookings ? 'Hide' : 'Show'}</span>
                  <motion.i
                    className={`ph ph-caret-down text-sm transition-transform duration-200 ${
                      showBookings ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Bookings List */}
            <AnimatePresence>
              {showBookings && (
                <motion.div
                  className='border-t border-gray-100'
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='p-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex flex-col'>
                        <h4 className='text-sm font-semibold text-gray-800'>
                          Service Bookings
                        </h4>
                        <p className='text-xs text-gray-500'>
                          {filteredBookings.length} of{' '}
                          {stableBookingsList.length} bookings
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        {(selectedDate ||
                          statusFilter !== 'all' ||
                          serviceFilter !== 'all' ||
                          searchQuery) && (
                          <button
                            onClick={clearAllFilters}
                            className='text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 hover:bg-red-50 rounded'
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Filter Controls */}
                    <div className='space-y-3 mb-4 p-3 bg-gray-50 rounded-lg border'>
                      {/* Search Bar */}
                      <div className='relative'>
                        <i className='ph ph-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm'></i>
                        <input
                          type='text'
                          placeholder='Search customers, services, or dates...'
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className='w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                          >
                            <i className='ph ph-x text-sm'></i>
                          </button>
                        )}
                      </div>

                      <div className='flex gap-2'>
                        {/* Status Filter */}
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className='flex-1 text-xs border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                        >
                          <option value='all'>All Status</option>
                          <option value='confirmed'>Confirmed</option>
                          <option value='pending'>Pending</option>
                          <option value='completed'>Completed</option>
                        </select>

                        {/* Service Type Filter */}
                        <select
                          value={serviceFilter}
                          onChange={(e) => setServiceFilter(e.target.value)}
                          className='flex-1 text-xs border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                        >
                          <option value='all'>All Services</option>
                          {uniqueServices.map((service) => (
                            <option key={service} value={service}>
                              {service.length > 20
                                ? service.substring(0, 20) + '...'
                                : service}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Active Filters Display */}
                      {(selectedDate ||
                        statusFilter !== 'all' ||
                        serviceFilter !== 'all' ||
                        searchQuery) && (
                        <div className='flex flex-wrap gap-1 pt-2 border-t border-gray-200'>
                          {selectedDate && (
                            <span className='inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full'>
                              Date: {selectedDate.getDate()}
                              <button
                                onClick={() => {
                                  setSelectedDate(null)
                                  setCalendarDays((prev) =>
                                    prev.map((day) => ({
                                      ...day,
                                      isSelected: false,
                                    }))
                                  )
                                }}
                              >
                                <i className='ph ph-x text-xs'></i>
                              </button>
                            </span>
                          )}
                          {statusFilter !== 'all' && (
                            <span className='inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full'>
                              Status: {statusFilter}
                              <button onClick={() => setStatusFilter('all')}>
                                <i className='ph ph-x text-xs'></i>
                              </button>
                            </span>
                          )}
                          {serviceFilter !== 'all' && (
                            <span className='inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full'>
                              Service:{' '}
                              {serviceFilter.length > 15
                                ? serviceFilter.substring(0, 15) + '...'
                                : serviceFilter}
                              <button onClick={() => setServiceFilter('all')}>
                                <i className='ph ph-x text-xs'></i>
                              </button>
                            </span>
                          )}
                          {searchQuery && (
                            <span className='inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full'>
                              Search: "
                              {searchQuery.length > 10
                                ? searchQuery.substring(0, 10) + '...'
                                : searchQuery}
                              "
                              <button onClick={() => setSearchQuery('')}>
                                <i className='ph ph-x text-xs'></i>
                              </button>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className='h-80 overflow-y-scroll border border-gray-200 rounded-lg bg-gray-50/50'>
                      <div className='p-2 space-y-2'>
                        {filteredBookings.map((booking, index) => {
                          const bookingDay = parseInt(
                            booking.date.split(' ')[1]
                          )
                          const isHighlighted =
                            hoveredDay === bookingDay.toString()

                          return (
                            <motion.div
                              key={`${booking.id}-stable`}
                              className={`
                                rounded-lg p-3 border transition-all duration-200 cursor-pointer
                                ${
                                  isHighlighted
                                    ? 'bg-yellow-50 border-yellow-200 shadow-md transform scale-[1.02]'
                                    : 'bg-white border-gray-100 hover:bg-gray-50 hover:shadow-sm'
                                }
                              `}
                              initial={false}
                              animate={{
                                backgroundColor: isHighlighted
                                  ? '#fefce8'
                                  : '#ffffff',
                                borderColor: isHighlighted
                                  ? '#fde047'
                                  : '#f3f4f6',
                                scale: isHighlighted ? 1.02 : 1,
                              }}
                              transition={{ duration: 0.2 }}
                              onMouseEnter={() =>
                                setHoveredDay(bookingDay.toString())
                              }
                              onMouseLeave={() => setHoveredDay(null)}
                            >
                              <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                  <span className='text-xs font-medium text-gray-600'>
                                    {booking.date}
                                  </span>
                                  <motion.div
                                    className='w-2 h-2 rounded-full'
                                    animate={{
                                      scale: isHighlighted ? 1.2 : 1,
                                      backgroundColor: isHighlighted
                                        ? '#fbbf24'
                                        : '#d1d5db',
                                    }}
                                    transition={{ duration: 0.2 }}
                                  />
                                </div>
                                <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded'>
                                  {booking.time}
                                </span>
                              </div>

                              <h5 className='text-sm font-semibold text-gray-800 mb-1'>
                                {booking.service}
                              </h5>

                              <p className='text-xs text-gray-600 mb-2 flex items-center gap-1'>
                                <i className='ph ph-user text-gray-400'></i>
                                {booking.customer}
                              </p>

                              <div className='flex items-center justify-between'>
                                <span
                                  className={`
                                    text-xs px-2 py-1 rounded-full font-medium
                                    ${
                                      booking.status === 'confirmed'
                                        ? 'bg-green-100 text-green-700'
                                        : ''
                                    }
                                    ${
                                      booking.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : ''
                                    }
                                    ${
                                      booking.status === 'completed'
                                        ? 'bg-blue-100 text-blue-700'
                                        : ''
                                    }
                                  `}
                                >
                                  {booking.status}
                                </span>
                                <div className='flex items-center gap-1'>
                                  <i className='ph ph-currency-dollar text-green-600 text-sm'></i>
                                  <span className='text-sm font-bold text-green-600'>
                                    {booking.price}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}

                        {/* Enhanced Empty State */}
                        {filteredBookings.length === 0 && (
                          <div className='flex flex-col items-center justify-center py-8 text-gray-400'>
                            {stableBookingsList.length === 0 ? (
                              <>
                                <i className='ph ph-calendar-x text-3xl mb-2'></i>
                                <p className='text-sm'>
                                  No bookings this month
                                </p>
                              </>
                            ) : (
                              <>
                                <i className='ph ph-funnel text-3xl mb-2'></i>
                                <p className='text-sm font-medium mb-1'>
                                  No bookings match your filters
                                </p>
                                <p className='text-xs text-gray-500 mb-3'>
                                  Try adjusting your search criteria or clearing
                                  some filters
                                </p>
                                <button
                                  onClick={clearAllFilters}
                                  className='text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded transition-colors'
                                >
                                  Clear all filters
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Dialogs */}
      {services.map((_, index) => (
        <DeleteConfirmation
          key={`delete-${index}`}
          isOpen={deleteDialogOpen === index}
          onConfirm={() => handleConfirmDelete(index)}
          onCancel={handleCancelDelete}
          onClose={handleCancelDelete}
        />
      ))}
    </section>
  )
}

export default Services
