const FaqSection = () => {
  const faqItems = [
    {
      question: 'What types of services do you offer?',
      answer:
        'Our cancellation policy varies depending on the service and service provider. Please check the terms before booking.',
      delay: '0',
    },
    {
      question: 'What is your payment methods?',
      answer:
        'Our cancellation policy varies depending on the service and service provider. Please check the terms before booking.',
      delay: '200',
    },
    {
      question: 'How long does it takes?',
      answer:
        'Our cancellation policy varies depending on the service and service provider. Please check the terms before booking.',
      delay: '400',
      isOpen: true,
    },
    {
      question: 'When is your off time?',
      answer:
        'Our cancellation policy varies depending on the service and service provider. Please check the terms before booking.',
      delay: '600',
    },
  ]

  return (
    <section className='stp-30 sbp-30'>
      <div className='container grid grid-cols-12 gap-6 xl:gap-10'>
        {/* Left Column */}
        <div className='col-span-12 rounded-3xl border border-[#1B3B86]/10 p-4 sm:px-10 sm:py-9 lg:col-span-5'>
          <p className='heading-6 text-[#E31C79]'>FAQ</p>
          <h2 className='heading-2 pb-4 pt-3 xl:pb-6 text-gray-900'>
            Your questions <span className='text-[#1B3B86]'>answered.</span>
          </h2>
          <p className='pb-6 font-medium text-gray-600 xl:pb-10'>
            Let&apos;s do our best to answer your most frequently asked
            questions.
          </p>

          {/* Contact Card */}
          <div className='mb-6 rounded-3xl border border-[#1B3B86]/10 p-4 sm:p-6'>
            <div className='flex items-center justify-start gap-3'>
              <div className='flex items-center justify-center rounded-2xl border border-[#1B3B86]/10 p-3 text-[#1B3B86] sm:p-5'>
                <i className='ph-fill ph-question text-4xl'></i>
              </div>
              <div>
                <h5 className='heading-5 text-gray-900'>
                  Still have questions?
                </h5>
                <p className='pt-3 text-gray-600'>
                  Can&apos;t find the answer you&apos;re looking for? Please
                  chat to our friendly team!
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href='./contact'
            className='relative flex items-center justify-center overflow-hidden rounded-xl bg-[#E31C79] px-4 py-3 font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-xl after:bg-[#1B3B86] after:duration-700 hover:after:w-[calc(100%+2px)] sm:px-8'
          >
            <span className='relative z-10'>Get In Touch</span>
          </a>
        </div>

        {/* FAQ Items */}
        <div className='col-span-12 flex flex-col items-start justify-center gap-6 rounded-3xl border border-[#1B3B86]/10 p-4 sm:p-10 lg:col-span-7'>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className='faqItem overflow-hidden rounded-2xl border border-[#1B3B86]/10 px-4 py-3'
              data-aos='fade-up'
              data-aos-delay={item.delay}
              data-aos-duration='800'
            >
              <div className='flex items-center justify-between max-sm:gap-2'>
                <p className='cursor-pointer text-base font-medium text-gray-900 sm:text-lg'>
                  {item.question}
                </p>
                <div
                  className={`faqIcon ${
                    !item.isOpen ? 'faqIconNotRotate' : ''
                  } flex items-center justify-center rounded-full bg-[#1B3B86] p-2 text-xl !leading-none text-white duration-700 hover:bg-[#E31C79] sm:p-3`}
                >
                  <i className='ph ph-caret-right'></i>
                </div>
              </div>
              <div
                className={`faqAnswer ${
                  item.isOpen ? 'faqOpen' : 'faqClose'
                } duration-700`}
              >
                <p className='pr-8 pt-3 text-gray-600'>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
