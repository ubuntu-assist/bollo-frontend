'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Notification {
  id: string
  type: 'task' | 'message' | 'payment' | 'system' | 'review' | 'booking'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  isImportant: boolean
  avatar?: string
  actionUrl?: string
  metadata?: {
    amount?: number
    taskTitle?: string
    userName?: string
    rating?: number
  }
}

const NotificationsPage = () => {
  // Fixed timestamps to avoid hydration issues
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'task',
      title: 'New Task Application',
      message:
        'Sarah M. has applied for your "Home Cleaning" task with a proposal of $75.',
      timestamp: new Date('2024-03-20T10:30:00Z'),
      isRead: false,
      isImportant: true,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/tasks/123/applications',
      metadata: {
        taskTitle: 'Home Cleaning',
        userName: 'Sarah M.',
        amount: 75,
      },
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'John D. sent you a message about the "Website Design" project.',
      timestamp: new Date('2024-03-20T08:30:00Z'),
      isRead: false,
      isImportant: false,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/messages/john-d',
      metadata: {
        userName: 'John D.',
        taskTitle: 'Website Design',
      },
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message:
        'You received $150 payment for "Logo Design" task. Funds will be available in 2-3 business days.',
      timestamp: new Date('2024-03-19T14:20:00Z'),
      isRead: true,
      isImportant: true,
      actionUrl: '/payments/history',
      metadata: {
        amount: 150,
        taskTitle: 'Logo Design',
      },
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review Received',
      message:
        'Emma L. left you a 5-star review for the "Garden Maintenance" task.',
      timestamp: new Date('2024-03-18T16:45:00Z'),
      isRead: true,
      isImportant: false,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/profile/reviews',
      metadata: {
        userName: 'Emma L.',
        rating: 5,
        taskTitle: 'Garden Maintenance',
      },
    },
    {
      id: '5',
      type: 'booking',
      title: 'Task Booking Confirmed',
      message:
        'Your booking for "House Painting" task has been confirmed for March 15, 2024.',
      timestamp: new Date('2024-03-17T09:15:00Z'),
      isRead: true,
      isImportant: false,
      actionUrl: '/bookings/456',
      metadata: {
        taskTitle: 'House Painting',
      },
    },
    {
      id: '6',
      type: 'system',
      title: 'Profile Verification Complete',
      message:
        'Congratulations! Your identity verification has been approved. You can now access all features.',
      timestamp: new Date('2024-03-15T11:30:00Z'),
      isRead: true,
      isImportant: false,
      actionUrl: '/profile/verification',
    },
    {
      id: '7',
      type: 'task',
      title: 'Task Completed',
      message:
        'Mark your "Furniture Assembly" task as completed and leave a review for Alex R.',
      timestamp: new Date('2024-03-13T13:20:00Z'),
      isRead: false,
      isImportant: false,
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/tasks/789/complete',
      metadata: {
        taskTitle: 'Furniture Assembly',
        userName: 'Alex R.',
      },
    },
    {
      id: '8',
      type: 'message',
      title: 'Project Update',
      message:
        'Client has requested changes to the mobile app wireframes. Please review the updated requirements.',
      timestamp: new Date('2024-03-12T15:30:00Z'),
      isRead: true,
      isImportant: false,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/projects/mobile-app',
      metadata: {
        userName: 'Michael T.',
        taskTitle: 'Mobile App Design',
      },
    },
    {
      id: '9',
      type: 'payment',
      title: 'Payment Processing',
      message:
        'Your payment of $95 for "Website Maintenance" is being processed and will be available soon.',
      timestamp: new Date('2024-03-11T10:45:00Z'),
      isRead: true,
      isImportant: false,
      actionUrl: '/payments/history',
      metadata: {
        amount: 95,
        taskTitle: 'Website Maintenance',
      },
    },
    {
      id: '10',
      type: 'review',
      title: 'Review Reminder',
      message:
        'Don\'t forget to leave a review for your completed "Graphic Design" task with Jessica K.',
      timestamp: new Date('2024-03-10T14:15:00Z'),
      isRead: false,
      isImportant: false,
      avatar:
        'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/tasks/graphic-design/review',
      metadata: {
        userName: 'Jessica K.',
        taskTitle: 'Graphic Design',
      },
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<
    'all' | 'unread' | 'important' | Notification['type']
  >('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  )

  // Filtered and searched notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications

    if (filterType !== 'all') {
      if (filterType === 'unread') {
        filtered = filtered.filter((n) => !n.isRead)
      } else if (filterType === 'important') {
        filtered = filtered.filter((n) => n.isImportant)
      } else {
        filtered = filtered.filter((n) => n.type === filterType)
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query) ||
          n.metadata?.userName?.toLowerCase().includes(query) ||
          n.metadata?.taskTitle?.toLowerCase().includes(query)
      )
    }

    return filtered.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    )
  }, [notifications, filterType, searchQuery])

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setSelectedNotifications((prev) => prev.filter((nId) => nId !== id))
  }

  // Toggle selection
  const toggleSelection = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    )
  }

  // Select all filtered notifications
  const selectAllFiltered = () => {
    const filteredIds = filteredNotifications.map((n) => n.id)
    setSelectedNotifications((prev) => {
      const newSelected = [...new Set([...prev, ...filteredIds])]
      return newSelected
    })
  }

  // Clear all selections
  const clearSelection = () => {
    setSelectedNotifications([])
  }

  // Get notification icon and color
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'task':
        return { icon: 'ph-briefcase', color: 'text-b300' }
      case 'message':
        return { icon: 'ph-chat-circle', color: 'text-g300' }
      case 'payment':
        return { icon: 'ph-currency-dollar', color: 'text-g300' }
      case 'review':
        return { icon: 'ph-star', color: 'text-y300' }
      case 'booking':
        return { icon: 'ph-calendar-check', color: 'text-p300' }
      case 'system':
        return { icon: 'ph-gear', color: 'text-n300' }
      default:
        return { icon: 'ph-bell', color: 'text-n300' }
    }
  }

  // Format relative time with stable base date to avoid hydration issues
  const formatRelativeTime = (date: Date) => {
    // Use a fixed "now" date for consistent server/client rendering
    const baseDate = new Date('2024-03-20T12:00:00Z') // Fixed reference point
    const diffInMs = baseDate.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year:
        date.getFullYear() !== baseDate.getFullYear() ? 'numeric' : undefined,
    })
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const importantCount = notifications.filter((n) => n.isImportant).length
  const selectedCount = selectedNotifications.length

  return (
    <section className='pt-6'>
      <div className='4xl:large-container grid grid-cols-12 gap-6 max-4xl:px-4'>
        {/* Main Content */}
        <div className='col-span-12 flex flex-col gap-6 xl:col-span-8 3xl:col-span-9'>
          {/* Header */}
          <div className='flex items-center justify-between rounded-2xl bg-white p-6 max-md:flex-col max-md:gap-4'>
            <div className='flex items-center gap-4 max-md:w-full'>
              <button
                onClick={() => window.history.back()}
                className='flex size-12 cursor-pointer items-center justify-center rounded-full bg-n50 text-2xl !leading-none text-n300 duration-300 hover:bg-b300 hover:text-white'
              >
                <i className='ph ph-arrow-left'></i>
              </button>
              <div>
                <h1 className='heading-4'>All Notifications</h1>
                <p className='font-medium text-n300 mt-2'>
                  {unreadCount > 0
                    ? `${unreadCount} unread notifications`
                    : 'All caught up!'}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 max-md:w-full max-md:justify-center'>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className='flex items-center gap-2 rounded-lg bg-b50 px-6 py-3 font-medium text-b300 duration-300 hover:bg-b300 hover:text-white max-md:flex-1 max-md:justify-center'
                >
                  <i className='ph ph-checks'></i>
                  Mark all as read
                </button>
              )}

              {selectedCount > 0 && (
                <button
                  onClick={clearSelection}
                  className='flex items-center gap-2 rounded-lg bg-n50 px-4 py-3 font-medium text-n600 duration-300 hover:bg-n200'
                >
                  <i className='ph ph-x'></i>
                  Clear ({selectedCount})
                </button>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className='rounded-2xl bg-white p-6'>
            <div className='flex items-center gap-4 max-md:flex-col'>
              {/* Search */}
              <div className='flex-1 relative max-md:w-full'>
                <i className='ph ph-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-n300'></i>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search notifications...'
                  className='w-full pl-12 pr-4 py-3 border border-n100 rounded-lg focus:outline-none focus:ring-2 focus:ring-b300 focus:border-transparent'
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-n400 hover:text-n600'
                  >
                    <i className='ph ph-x text-lg'></i>
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium duration-300 max-md:w-full max-md:justify-center ${
                  showFilters
                    ? 'bg-b300 text-white'
                    : 'bg-n50 text-n300 hover:bg-b50 hover:text-b300'
                }`}
              >
                <i className='ph ph-funnel text-xl'></i>
                Filter
                {(filterType !== 'all' || searchQuery) && (
                  <span className='size-2 bg-r300 rounded-full'></span>
                )}
              </button>

              {/* Bulk Actions */}
              {selectedCount > 0 && (
                <div className='flex items-center gap-2 max-md:w-full'>
                  <button
                    onClick={() => {
                      selectedNotifications.forEach((id) =>
                        deleteNotification(id)
                      )
                      setSelectedNotifications([])
                    }}
                    className='flex items-center gap-2 px-4 py-3 rounded-lg bg-r50 font-medium text-r300 duration-300 hover:bg-r300 hover:text-white max-md:flex-1 max-md:justify-center'
                  >
                    <i className='ph ph-trash text-lg'></i>
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      selectedNotifications.forEach((id) => markAsRead(id))
                      setSelectedNotifications([])
                    }}
                    className='flex items-center gap-2 px-4 py-3 rounded-lg bg-g50 font-medium text-g300 duration-300 hover:bg-g300 hover:text-white max-md:flex-1 max-md:justify-center'
                  >
                    <i className='ph ph-check text-lg'></i>
                    Read
                  </button>
                </div>
              )}
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className='mt-6 pt-6 border-t border-n100'
                >
                  <div className='flex flex-wrap gap-3'>
                    {[
                      { value: 'all', label: 'All', icon: 'ph-stack' },
                      { value: 'unread', label: 'Unread', icon: 'ph-envelope' },
                      {
                        value: 'important',
                        label: 'Important',
                        icon: 'ph-star',
                      },
                      { value: 'task', label: 'Tasks', icon: 'ph-briefcase' },
                      {
                        value: 'message',
                        label: 'Messages',
                        icon: 'ph-chat-circle',
                      },
                      {
                        value: 'payment',
                        label: 'Payments',
                        icon: 'ph-currency-dollar',
                      },
                      { value: 'review', label: 'Reviews', icon: 'ph-star' },
                      {
                        value: 'booking',
                        label: 'Bookings',
                        icon: 'ph-calendar-check',
                      },
                      { value: 'system', label: 'System', icon: 'ph-gear' },
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setFilterType(filter.value as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium duration-300 ${
                          filterType === filter.value
                            ? 'bg-b300 text-white'
                            : 'bg-n50 text-n300 hover:bg-b50 hover:text-b300'
                        }`}
                      >
                        <i className={`${filter.icon} text-lg`}></i>
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className='flex items-center justify-between mt-4 pt-4 border-t border-n100'>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={selectAllFiltered}
                        className='text-sm font-medium text-b300 hover:text-b400'
                      >
                        Select All ({filteredNotifications.length})
                      </button>
                      {selectedCount > 0 && (
                        <button
                          onClick={clearSelection}
                          className='text-sm font-medium text-r300 hover:text-r400'
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>

                    <div className='text-sm font-medium text-n500'>
                      {filteredNotifications.length} of {notifications.length}{' '}
                      notifications
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications List */}
          <div className='flex flex-col gap-4'>
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex items-start gap-6 rounded-2xl bg-white p-6 cursor-pointer duration-300 hover:shadow-lg max-md:gap-4 max-md:p-4 ${
                    !notification.isRead ? 'border-l-4 border-l-b300' : ''
                  } ${
                    selectedNotifications.includes(notification.id)
                      ? 'ring-2 ring-b300'
                      : ''
                  }`}
                  onClick={() => {
                    if (!notification.isRead) markAsRead(notification.id)
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl
                    }
                  }}
                >
                  {/* Selection Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSelection(notification.id)
                    }}
                    className={`flex size-6 items-center justify-center rounded border-2 duration-300 ${
                      selectedNotifications.includes(notification.id)
                        ? 'bg-b300 border-b300 text-white'
                        : 'border-n200 hover:border-b300'
                    }`}
                  >
                    {selectedNotifications.includes(notification.id) && (
                      <i className='ph ph-check text-sm'></i>
                    )}
                  </button>

                  {/* Avatar or Icon */}
                  <div className='flex-shrink-0'>
                    {notification.avatar ? (
                      <Image
                        src={notification.avatar}
                        alt='User avatar'
                        width={48} // Based on size-12 class (~48px)
                        height={48}
                        className='size-12 rounded-full object-cover'
                      />
                    ) : (
                      <div className='flex size-12 items-center justify-center rounded-full bg-n50'>
                        <i
                          className={`${
                            getNotificationIcon(notification.type).icon
                          } text-xl ${
                            getNotificationIcon(notification.type).color
                          }`}
                        ></i>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between max-md:flex-col max-md:gap-3'>
                      <div className='flex-1 max-md:w-full'>
                        <div className='flex items-center gap-3 mb-2 max-md:flex-wrap'>
                          <h3
                            className={`font-semibold ${
                              !notification.isRead ? 'text-n900' : 'text-n600'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {notification.isImportant && (
                            <i className='ph-fill ph-star text-lg text-y300'></i>
                          )}
                          {!notification.isRead && (
                            <div className='size-2 bg-b300 rounded-full'></div>
                          )}
                        </div>
                        <p
                          className={`font-medium mb-4 ${
                            !notification.isRead ? 'text-n700' : 'text-n500'
                          }`}
                        >
                          {notification.message}
                        </p>

                        {/* Metadata */}
                        {notification.metadata && (
                          <div className='flex items-center gap-4 text-sm font-medium text-n400 max-md:flex-wrap'>
                            {notification.metadata.amount && (
                              <span className='flex items-center gap-1 bg-g50 text-g300 px-3 py-1 rounded-lg'>
                                <i className='ph ph-currency-dollar'></i>$
                                {notification.metadata.amount}
                              </span>
                            )}
                            {notification.metadata.rating && (
                              <span className='flex items-center gap-1 bg-y50 text-y300 px-3 py-1 rounded-lg'>
                                <i className='ph-fill ph-star'></i>
                                {notification.metadata.rating} stars
                              </span>
                            )}
                            {notification.metadata.taskTitle && (
                              <span className='bg-n50 text-n600 px-3 py-1 rounded-lg'>
                                {notification.metadata.taskTitle}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className='flex items-center gap-4 ml-6 max-md:ml-0 max-md:w-full max-md:justify-between'>
                        <span className='text-sm font-medium text-n400 whitespace-nowrap'>
                          {formatRelativeTime(notification.timestamp)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className='flex size-8 items-center justify-center rounded-full bg-r50 text-r300 duration-300 hover:bg-r300 hover:text-white'
                        >
                          <i className='ph ph-x text-lg'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredNotifications.length === 0 && (
              <div className='flex flex-col items-center justify-center py-16 rounded-2xl bg-white'>
                <div className='flex size-20 items-center justify-center rounded-full bg-n50 mb-6'>
                  <i className='ph ph-bell text-4xl text-n300'></i>
                </div>
                <h3 className='heading-4 mb-2'>No notifications found</h3>
                <p className='font-medium text-n500 text-center max-w-md mb-6'>
                  {searchQuery || filterType !== 'all'
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "You're all caught up! New notifications will appear here when they arrive."}
                </p>

                {(searchQuery || filterType !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setFilterType('all')
                      setShowFilters(false)
                    }}
                    className='flex items-center gap-2 px-6 py-3 rounded-lg bg-b50 font-medium text-b300 duration-300 hover:bg-b300 hover:text-white'
                  >
                    <i className='ph ph-arrow-counter-clockwise'></i>
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredNotifications.length >= 8 &&
            filteredNotifications.length < notifications.length && (
              <div className='flex justify-center'>
                <button className='flex items-center gap-3 px-8 py-4 rounded-lg bg-white border border-n200 font-medium text-n600 duration-300 hover:bg-n50 hover:border-n300'>
                  <i className='ph ph-arrow-clockwise text-xl'></i>
                  Load More Notifications
                </button>
              </div>
            )}
        </div>

        {/* Sidebar - Quick Stats */}
        <div className='col-span-12 md:col-span-6 xl:col-span-4 3xl:col-span-3'>
          <motion.div
            className='rounded-2xl bg-white p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className='heading-5 mb-6'>Notification Stats</h3>

            {/* Stats Grid */}
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-center gap-3 rounded-lg bg-b50 p-4'>
                <div className='flex items-center justify-center rounded-full bg-b300 p-3 !leading-none text-white'>
                  <i className='ph ph-bell'></i>
                </div>
                <div>
                  <p className='text-xl font-semibold'>
                    {notifications.length}
                  </p>
                  <p className='font-medium text-n600'>Total</p>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3 rounded-lg bg-y50 p-4'>
                <div className='flex items-center justify-center rounded-full bg-y300 p-3 !leading-none text-white'>
                  <i className='ph ph-envelope'></i>
                </div>
                <div>
                  <p className='text-xl font-semibold'>{unreadCount}</p>
                  <p className='font-medium text-n600'>Unread</p>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3 rounded-lg bg-g50 p-4'>
                <div className='flex items-center justify-center rounded-full bg-g300 p-3 !leading-none text-white'>
                  <i className='ph ph-star'></i>
                </div>
                <div>
                  <p className='text-xl font-semibold'>{importantCount}</p>
                  <p className='font-medium text-n600'>Important</p>
                </div>
              </div>

              {selectedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='flex items-center justify-center gap-3 rounded-lg bg-p50 p-4 border-2 border-p300'
                >
                  <div className='flex items-center justify-center rounded-full bg-p300 p-3 !leading-none text-white'>
                    <i className='ph ph-check-square'></i>
                  </div>
                  <div>
                    <p className='text-xl font-semibold'>{selectedCount}</p>
                    <p className='font-medium text-n600'>Selected</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            <div className='mt-6 pt-6 border-t border-n100'>
              <h4 className='font-semibold text-n700 mb-4'>Quick Actions</h4>
              <div className='flex flex-col gap-3'>
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className='flex items-center gap-3 p-3 rounded-lg bg-b50 font-medium text-b300 duration-300 hover:bg-b300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <i className='ph ph-checks'></i>
                  Mark All Read
                </button>

                <button
                  onClick={() => {
                    setFilterType('unread')
                    setShowFilters(false)
                  }}
                  disabled={unreadCount === 0}
                  className='flex items-center gap-3 p-3 rounded-lg bg-y50 font-medium text-y300 duration-300 hover:bg-y300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <i className='ph ph-envelope'></i>
                  Show Unread Only
                </button>

                <button
                  onClick={() => {
                    setFilterType('important')
                    setShowFilters(false)
                  }}
                  disabled={importantCount === 0}
                  className='flex items-center gap-3 p-3 rounded-lg bg-g50 font-medium text-g300 duration-300 hover:bg-g300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <i className='ph ph-star'></i>
                  Show Important
                </button>

                <Link
                  href='/settings/notifications'
                  className='flex items-center gap-3 p-3 rounded-lg bg-n50 font-medium text-n600 duration-300 hover:bg-n200 hover:text-n700'
                >
                  <i className='ph ph-gear'></i>
                  Notification Settings
                </Link>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className='mt-6 pt-6 border-t border-n100'>
              <h4 className='font-semibold text-n700 mb-4'>By Category</h4>
              <div className='space-y-3'>
                {[
                  {
                    type: 'task',
                    label: 'Tasks',
                    icon: 'ph-briefcase',
                    color: 'text-b300',
                  },
                  {
                    type: 'message',
                    label: 'Messages',
                    icon: 'ph-chat-circle',
                    color: 'text-g300',
                  },
                  {
                    type: 'payment',
                    label: 'Payments',
                    icon: 'ph-currency-dollar',
                    color: 'text-g300',
                  },
                  {
                    type: 'review',
                    label: 'Reviews',
                    icon: 'ph-star',
                    color: 'text-y300',
                  },
                ].map((category) => {
                  const count = notifications.filter(
                    (n) => n.type === category.type
                  ).length
                  return (
                    <button
                      key={category.type}
                      onClick={() => {
                        setFilterType(category.type as any)
                        setShowFilters(false)
                      }}
                      className='flex items-center justify-between w-full p-2 rounded-lg hover:bg-n50 duration-300'
                    >
                      <div className='flex items-center gap-2'>
                        <i className={`${category.icon} ${category.color}`}></i>
                        <span className='text-sm font-medium text-n700'>
                          {category.label}
                        </span>
                      </div>
                      <span className='text-sm font-semibold text-n500'>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NotificationsPage
