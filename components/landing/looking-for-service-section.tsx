import Link from 'next/link'

const LookingForServiceSection = () => {
  return (
    <section className='stp-30 sbp-30 bg-gray-50'>
      <div className='container grid grid-cols-12 max-lg:gap-6'>
        {/* Image Section */}
        <div className='relative col-span-12 lg:col-span-6'>
          <div className='overflow-hidden pb-6 pl-6'>
            <img
              src='/assets/images/home_contact_img.webp'
              alt='Service contact'
              className='relative z-10 overflow-hidden rounded-2xl'
            />
          </div>
          <div className='absolute bottom-0 left-0 h-[250px] w-[200px] rounded-2xl bg-[#1B3B86] sm:h-[300px] lg:w-[300px] xl:h-[600px]'></div>
        </div>

        {/* Content Section */}
        <div className='col-span-12 flex flex-col items-start justify-center lg:col-span-5 lg:col-start-8'>
          <h5 className='heading-5 pb-4 text-[#E31C79] font-semibold'>
            Fixed Price Service
          </h5>

          {/* Feature List */}
          <ul className='flex flex-wrap items-center justify-start gap-3 text-[#1B3B86]'>
            <li className='flex items-center justify-start gap-2'>
              <i className='ph ph-currency-circle-dollar text-xl !leading-none'></i>
              See your price.
            </li>
            <li className='flex items-center justify-start gap-2'>
              <i className='ph ph-calendar-check text-xl !leading-none'></i>
              Book a time.
            </li>
            <li className='flex items-center justify-start gap-2'>
              <i className='ph ph-credit-card text-xl !leading-none'></i>
              Pay online.
            </li>
          </ul>

          {/* Main Content */}
          <h2 className='heading-2 max-w-[400px] pt-6 font-bold text-gray-900 sm:pt-8'>
            Looking to book a fixed price service?
          </h2>
          <p className='pt-4 font-medium text-gray-500'>
            Interested in scheduling a service at a set rate? Browse our
            selection of fixed-price offerings and book with confidence today
          </p>
          <p className='pb-6 pt-4 font-medium text-[#1B3B86] sm:pb-10 sm:pt-8'>
            Plumbing, Handyman, House Cleaning, and more...
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href='/contact'
              className='group relative flex items-center justify-start pr-12 font-semibold'
            >
              <span className='rounded-full bg-[#E31C79] text-white px-6 py-3 duration-500 group-hover:translate-x-12'>
                Contact Now
              </span>
              <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-[#E31C79] text-white p-[14px] text-xl !leading-none duration-500 group-hover:right-[154px] group-hover:rotate-45'></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LookingForServiceSection
