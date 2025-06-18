const HowItWorksSection = () => {
  return (
    <section className='container mb-12 stp-30 sbp-30'>
      <div className='flex w-full flex-col items-center justify-center text-center'>
        <h5 className='pb-4 font-bold text-[#E31C79]'>Working Process</h5>
        <h2 className='heading-2 font-bold text-gray-900'>
          How it <span className='text-[#1B3B86] underline'>Works</span>
        </h2>
      </div>

      <div className='stp-15 grid grid-cols-12 gap-4 sm:gap-6'>
        {/* First Card */}
        <div
          className='relative col-span-12 sm:col-span-6 md:col-span-4'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <div className='relative z-10 flex flex-col items-start justify-start gap-8 rounded-xl border border-[#E31C79]/20 bg-[#E31C79]/5 px-4 py-8 lg:gap-14 lg:px-12 lg:py-16'>
            <p className='heading-4 flex size-[72px] items-center justify-center rounded-full bg-[#E31C79] text-white p-6 !leading-none'>
              01
            </p>
            <h3 className='heading-3 font-bold text-[#1B3B86]'>
              Tasker Evaluation
            </h3>
            <p className='font-medium text-gray-700'>
              Choose a Tasker by price, skills, and reviews.
            </p>
          </div>
          <div className='absolute -bottom-6 left-4 right-4 -z-10 h-[82px] rounded-xl border border-[#E31C79]/10 bg-[#E31C79]/5'></div>
        </div>

        {/* Second Card */}
        <div
          className='relative col-span-12 -mb-8 mt-8 sm:col-span-6 md:col-span-4'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='1000'
        >
          <div className='flex h-full flex-col items-start justify-start gap-8 rounded-xl border border-[#1B3B86]/20 bg-[#1B3B86]/5 px-4 py-8 lg:gap-14 lg:px-12 lg:py-16'>
            <p className='heading-4 flex size-[72px] items-center justify-center rounded-full bg-[#1B3B86] text-white !leading-none'>
              02
            </p>
            <h3 className='heading-3 font-bold text-[#1B3B86]'>Book Now</h3>
            <p className='font-medium text-gray-700'>
              Schedule a Tasker as early as today
            </p>
          </div>
          <div className='absolute -bottom-6 left-4 right-4 -z-10 h-[82px] rounded-xl border border-[#1B3B86]/10 bg-[#1B3B86]/5'></div>
        </div>

        {/* Third Card */}
        <div
          className='relative col-span-12 sm:col-span-6 md:col-span-4'
          data-aos='fade-up'
          data-aos-delay='400'
          data-aos-duration='1000'
        >
          <div className='flex flex-col items-start justify-start gap-8 rounded-xl border border-[#E31C79]/20 bg-[#E31C79]/5 px-4 py-8 max-md:mt-6 max-sm:mt-16 lg:gap-14 lg:px-12 lg:py-16'>
            <p className='heading-4 flex size-[72px] items-center justify-center rounded-full bg-[#E31C79] text-white p-6 !leading-none'>
              03
            </p>
            <h3 className='heading-3 font-bold text-[#1B3B86]'>
              Get Extra Tip Hub
            </h3>
            <p className='font-medium text-gray-700'>
              Chat, pay, tip, and review all in one place easily.
            </p>
          </div>
          <div className='absolute -bottom-6 left-4 right-4 -z-10 h-[82px] rounded-xl border border-[#E31C79]/10 bg-[#E31C79]/5'></div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
