import Link from 'next/link'

const TopExpertsSection = () => {
  return (
    <section className='stp-30 sbp-30'>
      <div className='container'>
        {/* Header */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex max-w-[300px] flex-col'>
            <h2 className='heading-2 font-bold text-gray-900'>
              Top <span className='text-[#1B3B86] underline'>Experts</span>
            </h2>
            <p className='pt-4 font-medium text-gray-500'>
              Our skilled and reliable experts, your most trusted partners.
            </p>
          </div>
          <div>
            <a
              href='./find-workers'
              className='flex items-center justify-start gap-3 font-bold text-[#1B3B86] hover:text-[#E31C79] duration-300'
            >
              All Experts
              <i className='ph-bold ph-arrow-right text-2xl !leading-none'></i>
            </a>
          </div>
        </div>

        {/* Expert Cards Grid */}
        <div className='stp-15 grid grid-cols-12 gap-6'>
          {/* Expert Card */}
          {Array(6)
            .fill(0)
            .map((_, index: number) => (
              <div
                key={index}
                className='col-span-12 flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 md:col-span-6 xl:col-span-4'
              >
                <div className='flex items-center gap-3'>
                  {/* Hexagon Profile Container */}
                  <div className='relative'>
                    <div className='hexagon-styles my-[calc(100px*0.5/2)] h-[calc(100px*0.57736720554273)] w-[100px] rounded-[calc(100px/36.75)] bg-[#1B3B86]/10 before:rounded-[calc(100px/18.75)] after:rounded-[calc(100px/18.75)]'>
                      <div className='absolute -top-[20px] left-[5px]'>
                        <div className='hexagon-styles z-10 my-[calc(90px*0.5/2)] h-[calc(90px*0.57736720554273)] w-[90px] rounded-[calc(90px/50)] bg-[#1B3B86] before:rounded-[calc(90px/50)] after:rounded-[calc(90px/50)]'>
                          <div className='absolute -top-[19px] left-[4px] z-20'>
                            <div className='hexagon-styles z-10 my-[calc(82px*0.5/2)] h-[calc(82px*0.57736720554273)] w-[82px] rounded-[calc(82px/50)] bg-[#1B3B86]/10 before:rounded-[calc(82px/50)] after:rounded-[calc(82px/50)]'>
                              <div className='r-hex3 absolute -left-0.5 -top-[19px] z-30 inline-block w-[86px] overflow-hidden'>
                                <div className='r-hex-inner3'>
                                  <div className='expertImg1 r-hex-inner-3 before:h-[86px] before:bg-cover'></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Verification Badge */}
                    <div className='absolute bottom-3 right-1 z-30'>
                      <img
                        src='/assets/images/verify-badge.png'
                        alt='Verified'
                      />
                    </div>
                  </div>

                  {/* Expert Info */}
                  <div>
                    <div className='flex items-center gap-3'>
                      <h5 className='heading-5 text-[#1B3B86]'>Duclair Fopa</h5>
                      <span className='rounded-full bg-[#E31C79] px-2 py-1 text-xs font-medium text-white'>
                        PRO
                      </span>
                    </div>
                    <p className='pt-2 text-gray-500'>Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                {/* Tags */}
                <div className='flex flex-wrap gap-2 text-[13px]'>
                  <span className='rounded-full bg-[#E31C79]/10 px-2 py-1 font-medium text-[#E31C79]'>
                    75 - 100 XAF/hr
                  </span>
                  <span className='rounded-full bg-[#1B3B86]/10 px-2 py-1 font-medium text-[#1B3B86]'>
                    TOP INDEPENDENT
                  </span>
                  <span className='rounded-full bg-green-100 px-2 py-1 font-medium text-green-600'>
                    AVAILABLE
                  </span>
                </div>

                {/* Skills */}
                <div className='flex flex-wrap gap-2 text-gray-600'>
                  <span className='flex items-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium'>
                    <img src='./assets/images/settings_icon.png' alt='' />
                    Handyman
                  </span>
                  <span className='flex items-center gap-2 rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium'>
                    <img src='./assets/images/tap_icon.png' alt='' />
                    Plumber
                  </span>
                  <span className='rounded-xl bg-[#1B3B86]/5 px-3 py-2 font-medium'>
                    +3
                  </span>
                </div>

                {/* Image Slider */}
                <div className='swiper expert-slider-carousel group relative'>
                  <div className='swiper-wrapper'>
                    {[
                      '/assets/images/expert_slider_img_1.png',
                      '/assets/images/expert_slider_img_2.png',
                      '/assets/images/expert_slider_img_3.png',
                    ].map((img, index) => (
                      <div key={index} className='swiper-slide'>
                        <img src={img} alt='' className='w-full' />
                      </div>
                    ))}
                  </div>

                  {/* Slider Navigation */}
                  <div className='absolute left-2 right-2 top-28 z-10'>
                    <div className='flex w-full items-center justify-between'>
                      <button className='ara-prev flex -translate-x-12 items-center justify-center rounded-full border-2 border-[#E31C79] p-2 text-lg !leading-none text-[#E31C79] opacity-0 duration-500 hover:bg-[#E31C79] hover:text-white group-hover:translate-x-0 group-hover:opacity-100'>
                        <i className='ph-bold ph-caret-left'></i>
                      </button>
                      <button className='ara-next flex translate-x-12 items-center justify-center rounded-full border-2 border-[#E31C79] p-2 text-lg !leading-none text-[#E31C79] opacity-0 duration-500 hover:bg-[#E31C79] hover:text-white group-hover:translate-x-0 group-hover:opacity-100'>
                        <i className='ph-bold ph-caret-right'></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex items-center justify-start gap-2'>
                  <Link
                    href='/worker-profile'
                    className='relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1B3B86] px-6 py-3 text-sm font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)]'
                  >
                    <i className='ph ph-paper-plane-tilt text-xl !leading-none relative z-10'></i>
                    <span className='relative z-10'>Get in touch</span>
                  </Link>
                  <button className='relative flex items-center justify-center rounded-full border border-[#1B3B86] p-3 text-xl !leading-none text-[#1B3B86] duration-500 hover:bg-[#E31C79] hover:border-[#E31C79] hover:text-white'>
                    <i className='ph ph-heart'></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default TopExpertsSection
