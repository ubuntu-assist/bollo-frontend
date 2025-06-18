const BecomeYourBossSection = () => {
  return (
    <section className='sbp-30 mt-[150px] lg:mt-[200px]'>
      <div className='container rounded-3xl bg-[#1B3B86]'>
        <div className='flex items-center justify-between gap-6 p-6 max-sm:flex-col md:p-15 lg:p-30'>
          {/* Content */}
          <div className='flex flex-col items-start justify-center text-white'>
            <h2 className='heading-2'>Be your own boss</h2>
            <p className='pt-3 text-lg font-medium text-white/90 sm:text-xl md:text-2xl'>
              Earn up to 10,750 XAF a month on Bollo*
            </p>

            {/* CTA Button */}
            <div className='pb-6 pt-6 lg:pt-10'>
              <a
                href='./sign-up-step-1'
                className='group relative flex items-center justify-start pr-12 font-semibold'
              >
                <span className='rounded-full bg-[#E31C79] px-6 py-3 text-white duration-500 group-hover:translate-x-12'>
                  Join Bollo
                </span>
                <i className='ph-bold ph-arrow-up-right absolute right-0 top-0 translate-x-0 rounded-full bg-[#E31C79] p-[14px] text-xl text-white !leading-none duration-500 group-hover:right-[148px] group-hover:rotate-45'></i>
              </a>
            </div>

            {/* Disclaimer */}
            <p className='text-base font-medium text-white/80 md:text-xl'>
              *Based on the average monthly earnings of the top 1%
            </p>
          </div>

          {/* Image */}
          <div className='overflow-hidden rounded-3xl'>
            <img
              src='/assets/images/boss_img.png'
              alt='Be your own boss with Bollo'
              className='transition-transform duration-500 hover:scale-105'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BecomeYourBossSection
