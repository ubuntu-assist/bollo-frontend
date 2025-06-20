import Link from 'next/link'

const BreadcrumbSection = () => {
  return (
    <section className='sbp-30 mt-[100px] bg-gray-50 pt-6'>
      <div className='container'>
        {/* Breadcrumb Navigation */}
        <ul className='flex flex-wrap items-center justify-start gap-2 pt-3 font-medium'>
          <li>
            <Link
              href='/'
              className='text-gray-600 hover:text-[#1B3B86] transition-colors'
            >
              Home
            </Link>
          </li>
          <li className='text-[#E31C79]'>
            <i className='ph ph-caret-double-right'></i>
          </li>
          <li className='text-[#E31C79]'>Services</li>
        </ul>

        {/* Main Content */}
        <div className='flex items-center justify-between pt-10 max-md:gap-6 max-sm:flex-col'>
          {/* Left Content */}
          <div className='flex flex-col items-start justify-start'>
            <h3 className='heading-3 text-gray-900'>
              Turn this search into a job post
            </h3>
            <p className='max-w-[500px] pt-3 text-lg font-medium text-gray-600'>
              Post a job for free and we&lsquo;ll match you with experts perfect
              for your needs.
            </p>
            <div className='pt-8'>
              <a
                href='./working-processed-step-01'
                className='relative flex items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-4 py-2 text-lg font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
              >
                <span className='relative z-10'>Post a job for free</span>
              </a>
            </div>
          </div>

          {/* Job Match Card */}
          <div className='rounded-xl border border-[#1B3B86]/10 bg-white p-6 shadow-sm'>
            <div className='flex items-center justify-between gap-10 pb-6'>
              <p className='heading-5 text-[#1B3B86]'>Your job</p>
              <p className='rounded-lg bg-[#1B3B86]/5 px-3 py-2 font-medium text-[#1B3B86]'>
                MATCHED
              </p>
            </div>
            <div className='flex items-center justify-start'>
              {[
                '/assets/images/expert_img_1.png',
                '/assets/images/expert_img_2.png',
                '/assets/images/expert_img_3.png',
              ].map((img, index) => (
                <div
                  key={index}
                  className={`${
                    index !== 0 ? '-ml-4' : ''
                  } rounded-full bg-white p-1 border border-[#1B3B86]/10`}
                >
                  <img
                    src={img}
                    alt={`Expert ${index + 1}`}
                    className='size-12 rounded-full'
                  />
                </div>
              ))}
              <div className='pl-8 text-2xl text-[#1B3B86] hover:text-[#E31C79] transition-colors'>
                <i className='ph-bold ph-arrow-right'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BreadcrumbSection
