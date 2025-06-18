const SetYourPriceSection = () => {
  return (
    <section className='stp-30 sbp-30 max-md:mt-6'>
      <div className='container grid grid-cols-12 gap-6'>
        {/* Left Content */}
        <div className='col-span-12 flex flex-col items-start justify-center max-md:order-2 max-md:pt-6 md:col-span-6'>
          <h2 className='heading-2 text-gray-900'>
            Set your <span className='text-[#1B3B86]'>price</span>
          </h2>
          <p className='pt-4 text-base font-medium text-gray-600 sm:text-lg'>
            Found a job you're up for? Set your price and make an offer. You can
            adjust and discuss it later if you need to.
          </p>

          {/* CTA Button */}
          <div className='pt-6 text-white sm:pt-10'>
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

        {/* Right Image and Cards */}
        <div className='relative col-span-12 flex items-center justify-center rounded-xl pb-10 max-md:order-1 md:col-span-5 md:col-start-8'>
          {/* Main Image */}
          <img
            src='/assets/images/set_price_img.png'
            className='rounded-2xl'
            alt='Set your price illustration'
          />

          {/* Top Notification Card */}
          <div className='absolute -top-8 left-0 flex items-center justify-start gap-3 rounded-xl bg-[#1B3B86]/5 px-4 py-4 sm:px-8 lg:-left-8'>
            <div className='overflow-hidden rounded-full bg-white p-1 border border-[#1B3B86]/10'>
              <img
                src='/assets/images/cta_img1.png'
                alt='User avatar'
                className='w-[44px] rounded-full'
              />
            </div>
            <p className='text-gray-900'>Need help assembling furniture</p>
          </div>

          {/* Bottom Price Card */}
          <div className='absolute -bottom-10 right-2 flex flex-col items-center justify-start gap-3 rounded-xl bg-[#1B3B86]/5 px-6 py-6 md:right-0 xl:px-10 xxl:-right-8'>
            <p className='font-medium text-gray-900'>I Want to earn</p>
            <div className='flex items-center justify-between gap-5 text-2xl text-[#1B3B86]'>
              <i className='ph-bold ph-minus-circle cursor-pointer hover:text-[#E31C79] transition-colors'></i>
              <p className='heading-2'>250</p>
              <i className='ph-bold ph-plus-circle cursor-pointer hover:text-[#E31C79] transition-colors'></i>
            </div>
            <button className='rounded-full bg-[#E31C79] px-8 py-3 text-sm text-white transition-colors hover:bg-[#E31C79]/90'>
              Make offer
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SetYourPriceSection
