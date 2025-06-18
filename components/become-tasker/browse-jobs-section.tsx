const BrowseJobsSection = () => {
  return (
    <section className='stp-30 sbp-30 bg-gray-50'>
      <div className='container grid grid-cols-12 gap-6'>
        {/* Image Container */}
        <div className='col-span-12 flex items-center justify-center rounded-2xl bg-[#1B3B86] p-6 md:col-span-5 lg:p-15'>
          <img
            src='/assets/images/browse_jobs_img.png'
            className='w-full rounded-2xl transition-transform duration-500 hover:scale-105'
            alt='Browse jobs on Bollo'
          />
        </div>

        {/* Content Container */}
        <div className='col-span-12 flex flex-col items-start justify-center md:col-span-7 lg:col-span-6 lg:col-start-7'>
          <h2 className='heading-2 text-gray-900'>
            Browse job opportunities{' '}
            <span className='text-[#1B3B86]'>for free</span>
          </h2>

          <p className='pt-4 text-base font-medium text-gray-600 sm:text-lg'>
            Sign up and start browsing instantly. Set up notifications on the
            Bollo App to be alerted in real time about jobs that match your
            skills and interests
          </p>

          {/* CTA Button */}
          <div className='pt-10 text-white'>
            <a
              href='./sign-up-step-1'
              className='group relative flex items-center justify-start pr-12 font-semibold'
            >
              <span className='rounded-full bg-[#E31C79] px-6 py-3 duration-500 group-hover:translate-x-12'>
                Join Bollo
              </span>
              <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-[#E31C79] p-[14px] text-xl !leading-none duration-500 group-hover:right-[148px] group-hover:rotate-45'></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrowseJobsSection
