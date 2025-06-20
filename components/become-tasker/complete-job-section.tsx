const CompleteJobSection = () => {
  return (
    <section className='stp-30 sbp-30 bg-gray-50'>
      <div className='container grid grid-cols-12 gap-6'>
        {/* Left Card Section */}
        <div className='relative col-span-12 flex items-center justify-center rounded-2xl bg-[#1B3B86] p-6 md:col-span-5'>
          {/* Notification Card */}
          <div className='absolute -top-10 left-[5%] flex items-center justify-between gap-2 rounded-2xl bg-white shadow-lg px-3 py-2 md:left-1 lg:left-8 lg:py-4 xl:left-16 xl:px-5 xxl:left-24'>
            <div>
              <img src='./assets/images/fav.png' alt='Favorite icon' />
            </div>
            <div>
              <div className='flex items-center justify-between gap-2 lg:gap-5'>
                <p className='font-medium text-[#1B3B86]'>
                  Hurray! it&apos;s payday
                </p>
                <p className='text-sm text-gray-500'>1m ago</p>
              </div>
            </div>
          </div>

          {/* Completion Card */}
          <div className='mt-16 flex flex-col items-center justify-center rounded-2xl bg-white px-15 py-10 lg:mt-32'>
            <img
              src='/assets/images/complete_job_icon.png'
              alt='Job completion icon'
              className='transition-transform duration-500 hover:scale-105'
            />
            <p className='pt-5 font-semibold text-[#1B3B86]'>
              Way to go joshua!
            </p>
            <div className='flex items-center justify-center gap-2 pt-3 text-xl text-[#E31C79]'>
              {[...Array(5)].map((_, index) => (
                <i key={index} className='ph-fill ph-star'></i>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className='col-span-12 flex flex-col items-start justify-center md:col-span-7 lg:col-span-6 lg:col-start-7'>
          <h2 className='heading-2 text-gray-900'>
            Complete the job. Get paid. Easy.
          </h2>
          <p className='pt-4 text-base font-medium text-gray-600 sm:text-lg'>
            When you mark a task as complete, a Request for Payment is sent
            directly to the job poster so they can release payment instantly.
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

export default CompleteJobSection
