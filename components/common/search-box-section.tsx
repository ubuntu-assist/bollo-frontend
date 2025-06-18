'use client'

import React, { useState, useEffect, useRef } from 'react'

interface SearchBoxProps {
  onSearch?: (searchParams: SearchParams) => void
}

export interface SearchParams {
  location: string
  service: string
}

const SearchBoxSection: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>('Select Location')
  const [service, setService] = useState<string>('Select your service')
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false)
  const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false)
  const [locationSearch, setLocationSearch] = useState<string>('')

  const locationDropdownRef = useRef<HTMLDivElement>(null)
  const serviceDropdownRef = useRef<HTMLDivElement>(null)

  // Locations data
  const locations = [
    'Alaska',
    'New York',
    'California',
    'Washington',
    'Chicago',
    'Los Angeles',
    'Houston',
    'Miami',
  ]

  // Services data
  const services = [
    'Handyman',
    'Cleaning',
    'Renovation',
    'Photography',
    'Plumbing',
    'Electrical',
    'Gardening',
    'Painting',
  ]

  // Filter locations based on search
  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  )

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false)
      }
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle location selection
  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation)
    setIsLocationOpen(false)
  }

  // Handle service selection
  const handleServiceSelect = (selectedService: string) => {
    setService(selectedService)
    setIsServiceOpen(false)
  }

  // Handle search button click
  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location: location === 'Select Location' ? '' : location,
        service: service === 'Select your service' ? '' : service,
      })
    }
  }

  return (
    <section className='sbp-30'>
      <div className='container -mt-8 md:-mt-16'>
        <div className='relative z-20 w-full rounded-3xl border border-[#1B3B86]/10 bg-white p-4 sm:p-8 shadow-sm'>
          <div className='flex items-center justify-between text-lg font-medium max-sm:text-sm'>
            <div className='flex items-center justify-start gap-4 sm:gap-10'>
              {/* Location Selector */}
              <div
                className='relative border-r border-[#1B3B86]/10 pr-4 sm:pr-10'
                ref={locationDropdownRef}
              >
                <div
                  className='flex cursor-pointer items-center justify-between gap-2 text-[#1B3B86] hover:text-[#E31C79] transition-colors'
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                >
                  <i className='ph ph-map-pin'></i>
                  <span className='locationText'>
                    {location === 'Select Location' ? (
                      <>
                        <span className='max-[400px]:hidden'>Select</span>{' '}
                        Location
                      </>
                    ) : (
                      location
                    )}
                  </span>
                </div>

                {/* Location Dropdown */}
                {isLocationOpen && (
                  <div className='absolute left-0 top-10 w-[150px] origin-top rounded-3xl border border-[#1B3B86]/10 bg-white py-3 text-base duration-700 max-sm:text-sm sm:-left-8 sm:w-[220px] sm:py-5 shadow-lg'>
                    <input
                      type='text'
                      className='mx-2 w-[90%] rounded-xl border border-[#1B3B86]/10 px-2 py-2 outline-none placeholder:text-gray-600 focus:border-[#E31C79] transition-colors sm:mx-3 sm:px-3'
                      placeholder='Search'
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((loc) => (
                        <p
                          key={loc}
                          className='cursor-pointer px-6 py-2 duration-500 hover:bg-[#1B3B86] hover:text-white'
                          onClick={() => handleLocationSelect(loc)}
                        >
                          {loc}
                        </p>
                      ))
                    ) : (
                      <p className='px-6 py-2 text-gray-500'>
                        No locations found
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Service Selector */}
              <div
                className='relative flex cursor-pointer items-center justify-between gap-2'
                ref={serviceDropdownRef}
                onClick={() => setIsServiceOpen(!isServiceOpen)}
              >
                <span className='serviceText text-[#1B3B86] hover:text-[#E31C79] transition-colors'>
                  {service === 'Select your service' ? (
                    <>
                      <span className='max-[400px]:hidden'>Select your</span>{' '}
                      service
                    </>
                  ) : (
                    service
                  )}
                </span>
                <i className='ph ph-caret-down text-[#1B3B86]'></i>

                {/* Services Dropdown */}
                {isServiceOpen && (
                  <div className='absolute right-0 top-10 w-[150px] origin-top rounded-3xl border border-[#1B3B86]/10 bg-white py-3 text-sm duration-700 shadow-lg sm:-left-8 sm:w-[220px] sm:py-5 sm:text-base'>
                    {services.map((svc) => (
                      <p
                        key={svc}
                        className='cursor-pointer px-3 py-2 duration-500 hover:bg-[#1B3B86] hover:text-white sm:px-6'
                        onClick={() => handleServiceSelect(svc)}
                      >
                        {svc}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button
              className='relative ml-2 flex items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)] max-xxl:!leading-none max-md:size-11 md:px-8 md:py-3'
              onClick={handleSearch}
              type='button'
            >
              <i className='ph ph-magnifying-glass text-base !leading-none relative z-10 sm:text-xl md:hidden'></i>
              <span className='relative z-10 max-md:hidden'>Search</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBoxSection
