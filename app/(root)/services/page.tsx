import BreadcrumbSection from '@/components/common/bread-crumb-section'
import SearchBoxSection from '@/components/common/search-box-section'
import Link from 'next/link'
import Image from 'next/image' // Import Image from next/image

const Services = () => {
  return (
    <>
      <BreadcrumbSection />
      <SearchBoxSection />
      <section className='sbp-30'>
        <div className='container grid grid-cols-12 gap-6'>
          <div className='col-span-12 flex flex-col items-start justify-center lg:col-span-4'>
            <div className='rounded-xl border border-[#1B3B86]/10 px-6 py-8'>
              <h5 className='heading-5 text-gray-900'>Filter by</h5>
              <div className='flex flex-col gap-6 pt-8'>
                <div className='rounded-xl bg-[#1B3B86]/5 p-6'>
                  <p className='pb-3 text-lg font-semibold'>Keyword</p>
                  <input
                    type='text'
                    className='w-full rounded-xl border border-[#1B3B86]/10 bg-transparent px-4 py-3 outline-none focus:border-[#E31C79] transition-colors'
                    placeholder='What are you looking for?'
                  />
                </div>
                <div className='rounded-xl bg-[#1B3B86]/5 p-6'>
                  <p className='pb-3 text-lg font-semibold'>Location</p>
                  <input
                    type='text'
                    className='w-full rounded-xl border border-[#1B3B86]/10 bg-transparent px-4 py-3 outline-none focus:border-[#E31C79] transition-colors'
                    placeholder='Location'
                  />
                </div>
                <div className='rounded-xl bg-[#1B3B86]/5 p-6'>
                  <p className='pb-3 text-lg font-semibold'>Categories</p>
                  <input
                    type='text'
                    className='w-full rounded-xl border border-[#1B3B86]/10 bg-transparent px-4 py-3 outline-none focus:border-[#E31C79] transition-colors'
                    placeholder='Categories'
                  />
                </div>
                <button className='relative flex items-center justify-center overflow-hidden rounded-xl bg-[#1B3B86] px-4 py-2 font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-xl after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'>
                  <span className='relative z-10'>Search</span>
                </button>
              </div>
            </div>
          </div>

          <div className='col-span-12 rounded-xl border border-[#1B3B86]/10 p-4 sm:p-8 lg:col-span-8'>
            <div className='flex flex-col gap-4'>
              {/* Service Card 1 */}
              <div className='flex items-center justify-between gap-3 rounded-2xl border border-[#1B3B86]/10 p-3 max-md:flex-col'>
                <div className='flex items-center justify-start max-xxl:gap-2 max-sm:flex-col'>
                  <div className='flex items-center justify-center self-stretch sm:w-[80%]'>
                    <Image
                      src='/assets/images/workers_profile_service_img1.png'
                      alt='Sparkle Ease Cleaning Solutions image'
                      width={300} // Adjust based on design
                      height={200} // Adjust based on design
                      className='rounded-2xl object-cover'
                    />
                  </div>
                  <div>
                    <h5 className='heading-5 text-gray-900'>
                      Sparkle Ease Cleaning Solutions
                    </h5>
                    <div className='flex flex-wrap gap-1 pt-3 text-sm text-gray-600 xxl:pt-6'>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/settings_icon.png'
                          alt='Handyman icon'
                          width={16}
                          height={16}
                        />
                        <span>Handyman</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/tap_icon.png'
                          alt='Cleaning icon'
                          width={16}
                          height={16}
                        />
                        <span>Cleaning</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/tap_icon.png'
                          alt='Plumber icon'
                          width={16}
                          height={16}
                        />
                        <span>Plumber</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2 font-medium'>
                        <span>+4</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex h-full w-full flex-col items-center justify-center rounded-2xl border border-[#1B3B86]/10 px-6 py-8 text-center text-gray-600 md:max-w-[176px]'>
                  <p className='text-sm font-semibold'>STARTING AT</p>
                  <p className='py-1 font-semibold text-[#E31C79]'>
                    75 - 100 XAF/hr
                  </p>
                  <p className='pb-5 text-sm font-semibold'>Fixed Price</p>
                  <Link
                    href='/services/slug'
                    className='relative flex items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-3 py-2 text-sm font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-4 lg:py-3'
                  >
                    <span className='relative z-10'>View Details</span>
                  </Link>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className='flex items-center justify-between gap-3 rounded-2xl border border-[#1B3B86]/10 p-3 max-md:flex-col'>
                <div className='flex items-center justify-start max-xxl:gap-2 max-sm:flex-col'>
                  <div className='flex items-center justify-center self-stretch sm:w-[80%]'>
                    <Image
                      src='/assets/images/workers_profile_service_img2.png'
                      alt='Sparkle Ease Cleaning Solutions image'
                      width={300} // Adjust based on design
                      height={200} // Adjust based on design
                      className='rounded-2xl object-cover'
                    />
                  </div>
                  <div>
                    <h5 className='heading-5 text-gray-900'>
                      Sparkle Ease Cleaning Solutions
                    </h5>
                    <div className='flex flex-wrap gap-1 pt-3 text-sm text-gray-600 xxl:pt-6'>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/settings_icon.png'
                          alt='Handyman icon'
                          width={16}
                          height={16}
                        />
                        <span>Handyman</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/tap_icon.png'
                          alt='Cleaning icon'
                          width={16}
                          height={16}
                        />
                        <span>Cleaning</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/tap_icon.png'
                          alt='Plumber icon'
                          width={16}
                          height={16}
                        />
                        <span>Plumber</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2 font-medium'>
                        <span>+4</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex h-full w-full flex-col items-center justify-center rounded-2xl border border-[#1B3B86]/10 px-6 py-8 text-center text-gray-600 md:max-w-[176px]'>
                  <p className='text-sm font-semibold'>STARTING AT</p>
                  <p className='py-1 font-semibold text-[#E31C79]'>
                    75 - 100 XAF/hr
                  </p>
                  <p className='pb-5 text-sm font-semibold'>Fixed Price</p>
                  <a
                    href='./service-details'
                    className='relative flex items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-3 py-2 text-sm font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-4 lg:py-3'
                  >
                    <span className='relative z-10'>View Details</span>
                  </a>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className='flex items-center justify-between gap-3 rounded-2xl border border-[#1B3B86]/10 p-3 max-md:flex-col'>
                <div className='flex items-center justify-start max-xxl:gap-2 max-sm:flex-col'>
                  <div className='flex items-center justify-center self-stretch sm:w-[80%]'>
                    <Image
                      src='/assets/images/workers_profile_service_img3.png'
                      alt='Sparkle Ease Cleaning Solutions image'
                      width={300} // Adjust based on design
                      height={200} // Adjust based on design
                      className='rounded-2xl object-cover'
                    />
                  </div>
                  <div>
                    <h5 className='heading-5 text-gray-900'>
                      Sparkle Ease Cleaning Solutions
                    </h5>
                    <div className='flex flex-wrap gap-1 pt-3 text-sm text-gray-600 xxl:pt-6'>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/settings_icon.png'
                          alt='Handyman icon'
                          width={16}
                          height={16}
                        />
                        <span>Handyman</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/tap_icon.png'
                          alt='Cleaning icon'
                          width={16}
                          height={16}
                        />
                        <span>Cleaning</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium hover:bg-[#1B3B86]/10 transition-colors'>
                        <Image
                          src='/assets/images/tap_icon.png'
                          alt='Plumber icon'
                          width={16}
                          height={16}
                        />
                        <span>Plumber</span>
                      </p>
                      <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2 font-medium'>
                        <span>+4</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex h-full w-full flex-col items-center justify-center rounded-2xl border border-[#1B3B86]/10 px-6 py-8 text-center text-gray-600 md:max-w-[176px]'>
                  <p className='text-sm font-semibold'>STARTING AT</p>
                  <p className='py-1 font-semibold text-[#E31C79]'>
                    75 - 100 XAF/hr
                  </p>
                  <p className='pb-5 text-sm font-semibold'>Fixed Price</p>
                  <a
                    href='./service-details'
                    className='relative flex items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-3 py-2 text-sm font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-4 lg:py-3'
                  >
                    <span className='relative z-10'>View Details</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className='container pt-8'>
              <ul className='flex items-center justify-center gap-2 font-medium text-white sm:gap-3'>
                <li className='flex cursor-pointer items-center justify-center rounded-full bg-[#1B3B86] p-[14px] text-xl duration-500 hover:bg-[#E31C79]'>
                  <i className='ph ph-caret-left'></i>
                </li>
                <li className='flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#1B3B86] duration-500 hover:bg-[#E31C79]'>
                  1
                </li>
                <li className='flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#E31C79]'>
                  2
                </li>
                <li className='flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#1B3B86] duration-500 hover:bg-[#E31C79]'>
                  3
                </li>
                <li className='flex cursor-pointer items-center justify-center rounded-full bg-[#1B3B86] p-[14px] text-xl duration-500 hover:bg-[#E31C79]'>
                  <i className='ph ph-caret-right'></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
