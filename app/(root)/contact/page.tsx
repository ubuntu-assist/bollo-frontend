const Contact = () => {
  return (
    <>
      <section className='stp-30 4xl:large-container mx-4 mt-[100px] rounded-3xl bg-n900 pb-52 md:pb-60 lg:rounded-[60px] lg:pb-72'>
        <div className='container flex flex-col items-center justify-center gap-3 text-white'>
          <h2 className='heading-2'>Contact Us</h2>

          <ul className='flex items-center justify-start gap-2 pt-3 font-medium'>
            <li>
              <a href='./index.html'>Home</a>
            </li>
            <li className='text-r300'>
              <i className='ph ph-caret-double-right'></i>
            </li>
            <li className='text-r300'>Contact</li>
          </ul>
        </div>
      </section>

      <section className='sbp-15'>
        <div className='container -mt-40 rounded-xl bg-white p-2 sm:p-4 md:rounded-3xl xl:rounded-[60px] xl:p-15'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-12 flex flex-col items-center justify-center rounded-3xl border border-n30 p-6 md:col-span-4 lg:p-10'>
              <div className='flex items-center justify-center rounded-full bg-b300/5 p-5 text-4xl !leading-none text-b300'>
                <i className='ph-fill ph-chats'></i>
              </div>
              <h4 className='heading-4 pt-6'>Chat to support</h4>
              <p className='pb-6 text-sm font-medium text-n300'>
                Speak to our friendly team.
              </p>
              <a href='mailto:duclair.fopa@hotmail.com' className='font-medium'>
                duclair.fopa@hotmail.com
              </a>
            </div>
            <div className='col-span-12 flex flex-col items-center justify-center rounded-3xl border border-n30 p-6 md:col-span-4 lg:p-10'>
              <div className='flex items-center justify-center rounded-full bg-b300/5 p-5 text-4xl !leading-none text-b300'>
                <i className='ph-fill ph-map-pin'></i>
              </div>
              <h4 className='heading-4 pt-6'>Visit us</h4>
              <p className='pb-6 text-sm font-medium text-n300'>
                Visit our office HQ.
              </p>
              <a href='mailto:duclair.fopa@hotmail.com' className='font-medium'>
                View on Google Maps
              </a>
            </div>
            <div className='col-span-12 flex flex-col items-center justify-center rounded-3xl border border-n30 p-6 md:col-span-4 lg:p-10'>
              <div className='flex items-center justify-center rounded-full bg-b300/5 p-5 text-4xl !leading-none text-b300'>
                <i className='ph-fill ph-phone-call'></i>
              </div>
              <h4 className='heading-4 pt-6'>Contact Us</h4>
              <p className='pb-6 text-sm font-medium text-n300'>
                Mon-Fri from 8am to 5pm.
              </p>
              <a href='mailto:duclair.fopa@hotmail.com' className='font-medium'>
                (237) 676 53 55 01
              </a>
            </div>
          </div>

          <div className='stp-15 grid grid-cols-12 gap-6'>
            <div className='col-span-12 flex items-center justify-center self-stretch overflow-hidden rounded-3xl md:col-span-4'>
              <img
                src='/assets/images/contact-img.jpg'
                alt=''
                className='h-full rounded-3xl'
              />
            </div>
            <div className='col-span-12 rounded-3xl border border-n30 p-4 md:col-span-8 lg:p-15'>
              <h3 className='heading-3 sbp-15 text-center'>Get in touch</h3>
              <form
                id='contactForm'
                className='grid grid-cols-12 gap-4 font-medium sm:gap-6'
              >
                <div className='col-span-12 rounded-xl border border-n30 p-3 lg:col-span-6'>
                  <input
                    type='text'
                    className='outline-none placeholder:text-n100'
                    placeholder='Name'
                    id='from_name'
                    required
                  />
                </div>
                <div className='col-span-12 rounded-xl border border-n30 p-3 lg:col-span-6'>
                  <input
                    type='text'
                    className='outline-none placeholder:text-n100'
                    placeholder='Email'
                    id='reply_to'
                    required
                  />
                </div>
                <div className='col-span-12 rounded-xl border border-n30 p-3'>
                  <textarea
                    className='min-h-[100px] w-full outline-none placeholder:text-n100'
                    placeholder='Message'
                    id='message'
                    required
                  ></textarea>
                </div>
                <p className='col-span-12 hidden' id='responseMessage'></p>
                <div className='col-span-4'>
                  <button
                    type='submit'
                    className='relative flex items-center justify-center overflow-hidden rounded-xl bg-b300 px-4 py-3 font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-xl after:bg-yellow-400 after:duration-700 hover:text-n900 hover:after:w-[calc(100%+2px)] sm:px-8'
                  >
                    <span className='relative z-10'>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className='sbp-30'>
        <div className='container px-2 sm:px-4 xl:px-15'>
          <div className='container grid grid-cols-12 gap-6 xl:gap-10'>
            <div className='col-span-12 rounded-3xl border border-n40 p-4 sm:px-10 sm:py-9 lg:col-span-5'>
              <p className='heading-6 text-b300'>FAQ</p>
              <h2 className='heading-2 pb-4 pt-3 xl:pb-6'>
                Your questions <span className='text-b300'>answered.</span>
              </h2>
              <p className='pb-6 font-medium text-n400 xl:pb-10'>
                Let’s do our best to answer your most frequently asked
                questions.
              </p>
              <div className='mb-6 rounded-3xl border border-n40 p-4 sm:p-6'>
                <div className='flex items-center justify-start gap-3'>
                  <div className='flex items-center justify-center rounded-2xl border border-n40 p-3 text-b300 sm:p-5'>
                    <i className='ph-fill ph-question text-4xl'></i>
                  </div>
                  <div className=''>
                    <h5 className='heading-5'>Still have questions?</h5>
                    <p className='pt-3'>
                      Can’t find the answer you’re looking for?Please chat to
                      our friendly team!
                    </p>
                  </div>
                </div>
              </div>

              <a
                href='./contact.html'
                className='relative flex items-center justify-center overflow-hidden rounded-xl bg-b300 px-4 py-3 font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-xl after:bg-yellow-400 after:duration-700 hover:text-n900 hover:after:w-[calc(100%+2px)] sm:px-8'
              >
                <span className='relative z-10'>Gen In Touch</span>
              </a>
            </div>

            <div className='col-span-12 flex flex-col items-start justify-center gap-6 rounded-3xl border border-n40 p-4 sm:p-10 lg:col-span-7'>
              <div
                className='faqItem overflow-hidden rounded-2xl border border-n40 px-4 py-3'
                data-aos='fade-up'
                data-aos-delay='0'
                data-aos-duration='800'
              >
                <div className='flex items-center justify-between max-sm:gap-2'>
                  <p className='cursor-pointer text-base font-medium sm:text-lg'>
                    What types of services do you offer?
                  </p>
                  <div className='faqIcon faqIconNotRotate flex items-center justify-center rounded-full bg-b300 p-2 text-xl !leading-none text-white duration-700 sm:p-3'>
                    <i className='ph ph-caret-right'></i>
                  </div>
                </div>
                <div className='faqAnswer faqClose duration-700'>
                  <p className='pr-8 pt-3 text-n400'>
                    Our cancellation policy varies depending on the service and
                    service provider. Please check the terms before booking.
                  </p>
                </div>
              </div>
              <div
                className='faqItem overflow-hidden rounded-2xl border border-n40 px-4 py-3'
                data-aos='fade-up'
                data-aos-delay='200'
                data-aos-duration='800'
              >
                <div className='flex items-center justify-between max-sm:gap-2'>
                  <p className='cursor-pointer text-base font-medium sm:text-lg'>
                    What is your payment methods?
                  </p>
                  <div className='faqIcon faqIconNotRotate flex items-center justify-center rounded-full bg-b300 p-2 text-xl !leading-none text-white duration-700 sm:p-3'>
                    <i className='ph ph-caret-right'></i>
                  </div>
                </div>
                <div className='faqAnswer faqClose duration-700'>
                  <p className='cursor-pointer pr-8 pt-3 text-n400'>
                    Our cancellation policy varies depending on the service and
                    service provider. Please check the terms before booking.
                  </p>
                </div>
              </div>
              <div
                className='faqItem overflow-hidden rounded-2xl border border-n40 px-4 py-3'
                data-aos='fade-up'
                data-aos-delay='400'
                data-aos-duration='800'
              >
                <div className='flex items-center justify-between max-sm:gap-2'>
                  <p className='cursor-pointer text-base font-medium sm:text-lg'>
                    How long does it takes?
                  </p>
                  <div className='faqIcon faqIconNotRotate flex items-center justify-center rounded-full bg-b300 p-2 text-xl !leading-none text-white duration-700 sm:p-3'>
                    <i className='ph ph-caret-right'></i>
                  </div>
                </div>
                <div className='faqAnswer faqOpen duration-700'>
                  <p className='pr-8 pt-3 text-n400'>
                    Our cancellation policy varies depending on the service and
                    service provider. Please check the terms before booking.
                  </p>
                </div>
              </div>
              <div
                className='faqItem overflow-hidden rounded-2xl border border-n40 px-4 py-3'
                data-aos='fade-up'
                data-aos-delay='600'
                data-aos-duration='800'
              >
                <div className='flex items-center justify-between max-sm:gap-2'>
                  <p className='cursor-pointer text-base font-medium sm:text-lg'>
                    When is your off time?
                  </p>
                  <div className='faqIcon faqIconNotRotate flex items-center justify-center rounded-full bg-b300 p-2 text-xl !leading-none text-white duration-700 sm:p-3'>
                    <i className='ph ph-caret-right'></i>
                  </div>
                </div>
                <div className='faqAnswer faqClose duration-700'>
                  <p className='pr-8 pt-3 text-n400'>
                    Our cancellation policy varies depending on the service and
                    service provider. Please check the terms before booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
