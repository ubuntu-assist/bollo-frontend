const SecureGuardSection = () => {
  return (
    <section className='stp-30 sbp-30'>
      <div className='container grid grid-cols-12 max-lg:gap-6'>
        {/* Left Content */}
        <div className='col-span-12 lg:col-span-6'>
          <h5
            className='heading-5 text-[#E31C79]'
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            Secure Guard
          </h5>
          <h2
            className='heading-2 max-w-[550px] pt-4 text-gray-900'
            data-aos='fade-down'
            data-aos-duration='1000'
            data-aos-delay='0'
          >
            Trust and safety features for your protection
          </h2>

          {/* Features List */}
          <ul className='flex flex-col gap-8 pt-6 lg:pt-10'>
            {/* Secure Payments */}
            <li className='relative flex items-start justify-start gap-4'>
              <div className='flex items-center justify-center rounded-full bg-[#1B3B86] p-3 text-2xl !leading-none text-white'>
                <i className='ph ph-currency-dollar-simple'></i>
                <div className='absolute bottom-3 left-6 h-[50px] w-[2px] bg-gradient-to-b from-[#1B3B86] to-transparent'></div>
              </div>
              <div>
                <h5 className='heading-5 text-gray-900'>Secure payments</h5>
                <p className='max-w-[500px] py-3 text-gray-500'>
                  Only release payment when the task is completed to your
                  satisfaction
                </p>
                <a
                  href=''
                  className='font-bold text-[#1B3B86] hover:text-[#E31C79] transition-colors'
                >
                  Read More
                </a>
              </div>
            </li>

            {/* Trusted Ratings */}
            <li className='relative flex items-start justify-start gap-4'>
              <div className='flex items-center justify-center rounded-full bg-[#1B3B86] p-3 text-2xl !leading-none text-white'>
                <i className='ph ph-star'></i>
                <div className='absolute bottom-3 left-6 h-[50px] w-[2px] bg-gradient-to-b from-[#1B3B86] to-transparent'></div>
              </div>
              <div>
                <h5 className='heading-5 text-gray-900'>
                  Trusted ratings and reviews
                </h5>
                <p className='max-w-[500px] py-3 text-gray-500'>
                  Pick the right person for the task based on real ratings and
                  reviews from other users
                </p>
                <a
                  href=''
                  className='font-bold text-[#1B3B86] hover:text-[#E31C79] transition-colors'
                >
                  Read More
                </a>
              </div>
            </li>

            {/* Insurance */}
            <li className='relative flex items-start justify-start gap-4'>
              <div className='flex items-center justify-center rounded-full bg-[#1B3B86] p-3 text-2xl !leading-none text-white'>
                <i className='ph ph-shield-check'></i>
                <div className='absolute bottom-3 left-6 h-[50px] w-[2px] bg-gradient-to-b from-[#1B3B86] to-transparent'></div>
              </div>
              <div>
                <h5 className='heading-5 text-gray-900'>
                  Insurance for peace of mind
                </h5>
                <p className='max-w-[500px] py-3 text-gray-500'>
                  Only release payment when the task is completed to your
                  satisfaction
                </p>
                <a
                  href=''
                  className='font-bold text-[#1B3B86] hover:text-[#E31C79] transition-colors'
                >
                  Read More
                </a>
              </div>
            </li>
          </ul>

          {/* CTA Button */}
          <div className='flex justify-start pt-10'>
            <a
              href='./working-processed-step-01'
              className='group relative flex items-center justify-start pr-12 font-semibold'
            >
              <span className='rounded-full bg-[#E31C79] text-white px-6 py-3 duration-500 group-hover:translate-x-12'>
                Post your task for free
              </span>
              <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-[#E31C79] text-white p-[14px] text-xl !leading-none duration-500 group-hover:right-[230px] group-hover:rotate-45'></i>
            </a>
          </div>
        </div>

        {/* Right Content */}
        <div className='relative col-span-12 items-end justify-center lg:col-span-5 lg:col-start-8 lg:flex'>
          {/* Main Image */}
          <div className='overflow-hidden pb-4 pr-4'>
            <img
              src='/assets/images/safe_guard_section_img.png'
              alt='Safe guard illustration'
              className='relative z-10 h-full w-full overflow-hidden rounded-2xl'
            />
          </div>
          <div className='absolute bottom-0 right-0 h-[250px] w-[200px] rounded-2xl bg-[#1B3B86] sm:h-[300px] lg:w-[300px] xl:h-[500px]'></div>

          {/* Rating Card */}
          <div className='box-shadow-2 absolute right-0 top-4 z-10 flex items-center justify-start gap-2 rounded-xl border border-[#1B3B86]/10 bg-white px-3 py-2 sm:top-12 sm:gap-3 sm:px-8 sm:py-6 3xl:-right-32'>
            <div className='rounded-full bg-[#1B3B86]/10 p-0.5'>
              <img
                src='/assets/images/safe_guard_review_img.png'
                alt='Review'
                className='rounded-full'
              />
            </div>
            <div>
              <div className='flex items-center justify-start gap-3'>
                <span className='heading-3 text-[#1B3B86]'>4.5</span>
                <i className='ph-fill ph-star text-xl !leading-none text-[#E31C79]'></i>
              </div>
              <p className='font-medium text-gray-500'>Over all Rating</p>
            </div>
          </div>

          {/* Status Cards */}
          <div className='box-shadow-2 absolute -left-2 bottom-20 z-10 flex items-center justify-start gap-2 rounded-xl border border-[#1B3B86]/10 bg-white px-3 py-2 font-medium sm:bottom-40 sm:gap-3 sm:px-8 sm:py-6 lg:-left-20'>
            <i className='ph ph-thumbs-up text-xl !leading-none text-[#1B3B86]'></i>
            <p className='text-gray-900'>Job Completed</p>
            <span className='text-gray-400'>2m ago</span>
          </div>
          <div className='box-shadow-2 absolute -left-2 bottom-8 z-10 flex items-center justify-start gap-2 rounded-xl border border-[#1B3B86]/10 bg-white px-3 py-2 font-medium sm:bottom-16 sm:gap-3 sm:px-8 sm:py-6 lg:-left-20'>
            <i className='ph ph-check-circle text-xl !leading-none text-[#1B3B86]'></i>
            <p className='text-gray-900'>Payment released</p>
            <span className='text-gray-400'>2m ago</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecureGuardSection
