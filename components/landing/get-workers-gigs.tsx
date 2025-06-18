const GetWorkersGigs = () => {
  return (
    <section className='stp-30 sbp-30 relative'>
      {/* Background Sections */}
      <div className='absolute left-0 top-0 w-full bg-[#1B3B86] max-sm:h-1/2 sm:bottom-0 sm:w-1/2'></div>
      <div className='absolute bottom-0 right-0 w-full bg-[#E31C79] max-sm:h-1/2 sm:top-0 sm:w-1/2'></div>

      {/* Content Container */}
      <div className='container relative z-10 grid grid-cols-12 text-white max-xxl:overflow-hidden max-sm:gap-6'>
        {/* Get Workers Section */}
        <div className='col-span-12 flex flex-col items-start sm:col-span-5'>
          <h3
            className='heading-3'
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            GET WORKERS
          </h3>
          <p
            className='pb-6 pt-4 sm:pb-10 sm:pt-6 text-white/90'
            data-aos='fade-right'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            GigSmart Get Workers provides a fast, simple, and reliable way to
            hire Workers on the fly at low costs with little to no lead times.
          </p>
          <div
            className='text-gray-900'
            data-aos='fade-down'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            <a
              href='./find-workers'
              className='group relative flex items-center justify-start pr-12 font-semibold'
            >
              <span className='rounded-full bg-white px-6 py-3 duration-500 group-hover:translate-x-12 hover:text-[#1B3B86]'>
                Explore Now
              </span>
              <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-white p-[14px] text-xl !leading-none duration-500 group-hover:right-[152px] group-hover:rotate-45 hover:text-[#1B3B86]'></i>
            </a>
          </div>
        </div>

        {/* Get Gigs Section */}
        <div className='col-span-12 flex flex-col items-start max-sm:pt-6 sm:col-span-5 sm:col-start-8'>
          <h3
            className='heading-3'
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            GET GIGS
          </h3>
          <p
            className='pb-6 pt-4 sm:pb-10 sm:pt-6 text-white/90'
            data-aos='fade-left'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            Work on your terms. GigSmart gives you the freedom and control to
            find the work opportunities best suited to you.
          </p>
          <div
            className='text-gray-900'
            data-aos='fade-down'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            <a
              href='./sign-up-step-1'
              className='group relative flex items-center justify-start pr-12 font-semibold'
            >
              <span className='rounded-full bg-white px-6 py-3 duration-500 group-hover:translate-x-12 hover:text-[#E31C79]'>
                Find Work
              </span>
              <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-white p-[14px] text-xl !leading-none duration-500 group-hover:right-[133px] group-hover:rotate-45 hover:text-[#E31C79]'></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetWorkersGigs
