const FixedPriceServiceSection = () => {
  return (
    <section className='stp-30 sbp-30 bg-gray-50'>
      <div className='container grid grid-cols-12 max-lg:gap-8 max-sm:gap-6'>
        {/* Left Content */}
        <div className='col-span-12 flex flex-col items-start justify-center lg:col-span-5'>
          <h5 className='pb-4 font-bold text-[#E31C79]'>Fixed Price Service</h5>
          <h2 className='heading-2 font-bold text-gray-900'>
            Be your own <span className='text-[#1B3B86] underline'>boss</span>
          </h2>
          <p className='pb-6 pt-3 sm:pb-8 text-gray-600'>
            Whether you&apos;re a genius spreadsheet guru or a diligent
            carpenter, find your next job on Bollo.
          </p>

          <ul className='flex flex-col gap-4'>
            {[
              'Free access to thousands of job opportunities',
              'Grow your business and client base',
              'Earn extra income on a flexible schedule',
              'No subscription or credit fees',
            ].map((item) => (
              <li key={item} className='flex items-center justify-start gap-2'>
                <i className='ph ph-check-circle text-2xl text-[#1B3B86]'></i>
                <span className='text-gray-700'>{item}</span>
              </li>
            ))}
          </ul>

          <div className='pt-6 lg:pt-10'>
            <a
              href='./sign-up-step-1'
              className='group relative flex items-center justify-start pr-12 font-semibold'
            >
              <span className='rounded-full bg-[#E31C79] text-white px-6 py-3 duration-500 group-hover:translate-x-12'>
                Earn money
              </span>
              <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-[#E31C79] text-white p-[14px] text-xl !leading-none duration-500 group-hover:right-[148px] group-hover:rotate-45'></i>
            </a>
          </div>
        </div>

        {/* Right Content */}
        <div className='relative col-span-12 flex items-center justify-center sm:py-12 lg:col-span-7'>
          <div className='overflow-hidden rounded-xl'>
            <img
              src='/assets/images/total_earnings_line.webp'
              alt='Fixed price service illustration'
            />
          </div>

          {/* Payment Notification */}
          <div className='box-shadow-1 3xl:-right-14 absolute right-0 top-0 overflow-hidden rounded-2xl border border-[#1B3B86]/10 bg-white pb-5 max-sm:hidden'>
            <p className='bg-gray-50 px-6 py-3 font-semibold'>
              Payment received!
            </p>
            <div className='flex items-center justify-between gap-6 px-6 pt-5 sm:gap-28'>
              <div>
                <p className='font-medium'>Cleaning services</p>
                <p className='text-sm text-gray-500'>2h Ago</p>
              </div>
              <p className='heading-4 pb-1 font-bold text-[#1B3B86]'>145 XAF</p>
            </div>
          </div>

          {/* Job Alert */}
          <div className='3xl:-right-14 absolute right-0 top-36 max-sm:hidden'>
            <p className='box-shadow-2 flex items-center justify-center gap-2 rounded-full bg-[#E31C79]/10 px-8 py-3 font-medium text-[#E31C79]'>
              <i className='ph-bold ph-bell-simple-ringing text-xl'></i> New job
              alert!
            </p>
          </div>

          {/* Earnings Card */}
          <div className='box-shadow-1 absolute bottom-0 left-0 overflow-hidden rounded-2xl border border-[#1B3B86]/10 bg-white pb-5 max-sm:hidden'>
            <p className='bg-gray-50 px-6 py-3 font-semibold'>Total earnings</p>
            <div className='px-6'>
              <div className='py-5'>
                <img
                  src='/assets/images/total_earnings_line.png'
                  alt='Earnings graph'
                  className='w-full max-sm:max-h-[50px]'
                />
              </div>
              <p className='heading-4 pb-1 font-bold text-[#1B3B86]'>
                14,500 XAF
              </p>
              <p>
                <i className='ph ph-arrow-up text-xl text-[#1B3B86]'></i>
                <span className='text-gray-600'>20% vs last month</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FixedPriceServiceSection
