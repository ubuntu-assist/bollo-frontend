import BreadcrumbSection from '@/components/common/bread-crumb-section'
import SearchBoxSection from '@/components/common/search-box-section'
import Image from 'next/image'

const BrowseTasks = () => {
  return (
    <>
      <BreadcrumbSection />
      <SearchBoxSection />
      <section className='sbp-30 overflow-hidden'>
        <div className='4xl:large-container grid grid-cols-12 gap-6 max-4xl:container'>
          <div className='col-span-12 flex flex-col gap-6 lg:col-span-6 4xl:col-span-4'>
            <div className='flex w-full items-center justify-between gap-6 rounded-2xl border border-n30 px-6 py-5 max-sm:flex-col'>
              <div className='sm:max-w-[350px] lg:max-w-[230px] xxl:max-w-[300px]'>
                <p className='heading-5'>New Home Cleaning Solutions</p>
                <div className='flex flex-wrap gap-1 pt-6 text-sm font-medium text-n400'>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/settings_icon.png'
                      alt='Handyman icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Handyman</span>
                  </p>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/cleaning_icon.svg'
                      alt='Cleaning icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Cleaning</span>
                  </p>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/tap_icon.png'
                      alt='Plumber icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Plumber</span>
                  </p>
                  <p className='rounded-xl bg-b50 px-3 py-2'>+3</p>
                </div>
              </div>
              <div className='w-full rounded-2xl border border-n30 px-6 py-8 text-center font-medium text-n500 sm:w-[200px]'>
                <p className='text-sm'>STARTING AT</p>
                <p className='py-1 font-semibold text-r300'>$80 - &100/hr</p>
                <p className='pb-6 text-sm'>Fixed Price</p>
                <a
                  href='/task-details'
                  className='block rounded-full border border-n200 px-5 py-2 text-sm'
                >
                  View Details
                </a>
              </div>
            </div>
            <div className='flex w-full items-center justify-between gap-6 rounded-2xl border border-n30 px-6 py-5 max-sm:flex-col'>
              <div className='sm:max-w-[350px] lg:max-w-[230px] xxl:max-w-[300px]'>
                <p className='heading-5'>Full Garden Cleaning Solutions</p>
                <div className='flex flex-wrap gap-1 pt-6 text-sm font-medium text-n400'>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/settings_icon.png'
                      alt='Handyman icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Handyman</span>
                  </p>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/cleaning_icon.svg'
                      alt='Cleaning icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Cleaning</span>
                  </p>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/tap_icon.png'
                      alt='Plumber icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Plumber</span>
                  </p>
                  <p className='rounded-xl bg-b50 px-3 py-2'>+3</p>
                </div>
              </div>
              <div className='w-full rounded-2xl border border-n30 px-6 py-8 text-center font-medium text-n500 sm:w-[200px]'>
                <p className='text-sm'>STARTING AT</p>
                <p className='py-1 font-semibold text-r300'>$80 - &100/hr</p>
                <p className='pb-6 text-sm'>Fixed Price</p>
                <a
                  href='./service-details.html'
                  className='block rounded-full border border-n200 px-5 py-2 text-sm'
                >
                  View Details
                </a>
              </div>
            </div>
            <div className='flex w-full items-center justify-between gap-6 rounded-2xl border border-n30 px-6 py-5 max-sm:flex-col'>
              <div className='sm:max-w-[350px] lg:max-w-[230px] xxl:max-w-[300px]'>
                <p className='heading-5'>Sparkle Ease Cleaning Solutions</p>
                <div className='flex flex-wrap gap-1 pt-6 text-sm font-medium text-n400'>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/settings_icon.png'
                      alt='Handyman icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Handyman</span>
                  </p>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/cleaning_icon.svg'
                      alt='Cleaning icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Cleaning</span>
                  </p>
                  <p className='flex items-center justify-center gap-2 rounded-xl bg-b50 px-3 py-2'>
                    <Image
                      src='/assets/images/tap_icon.png'
                      alt='Plumber icon'
                      width={16} // Adjust based on design
                      height={16} // Adjust based on design
                    />
                    <span>Plumber</span>
                  </p>
                  <p className='rounded-xl bg-b50 px-3 py-2'>+3</p>
                </div>
              </div>
              <div className='w-full rounded-2xl border border-n30 px-6 py-8 text-center font-medium text-n500 sm:w-[200px]'>
                <p className='text-sm'>STARTING AT</p>
                <p className='py-1 font-semibold text-r300'>$80 - &100/hr</p>
                <p className='pb-6 text-sm'>Fixed Price</p>
                <a
                  href='./service-details.html'
                  className='block rounded-full border border-n200 px-5 py-2 text-sm'
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className='col-span-12 h-full w-full lg:col-span-6 lg:-mr-28 4xl:col-span-8'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99421.90003961018!2d-77.23924581739114!3d38.85685914425235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b82921a2cf17%3A0x482a3f7c10cf8c4!2sUnited%20States%20Capitol!5e0!3m2!1sen!2sbd!4v1709620058739!5m2!1sen!2sbd'
              className='h-full min-h-[200px] w-full'
              style={{ border: 0 }}
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default BrowseTasks
