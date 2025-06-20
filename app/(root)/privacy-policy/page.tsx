import Link from 'next/link'

const PrivacyPolicy = () => {
  return (
    <>
      <section className='py-16 sm:py-20 xl:py-24 mx-4 mt-[100px] rounded-3xl bg-[#1B3B86] pb-52 md:pb-60 lg:rounded-[60px] lg:pb-72'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-3 text-white'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
            Privacy Policy
          </h2>

          <ul className='flex items-center justify-start gap-2 pt-3 font-medium'>
            <li>
              <Link href='/' className='hover:text-[#E31C79] transition-colors'>
                Home
              </Link>
            </li>
            <li className='text-[#E31C79]'>
              <i className='ph ph-caret-double-right'></i>
            </li>
            <li className='text-[#E31C79]'>Privacy Policy</li>
          </ul>
        </div>
      </section>

      <section className='py-16 sm:py-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 -mt-40 rounded-xl border border-gray-200 bg-white p-4 sm:p-4 md:rounded-3xl xl:rounded-[60px] xl:p-16'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900'>
            Privacy Policy
          </h2>

          <div className='mt-12 flex flex-col gap-8'>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Information We Collect
              </h4>
              <p className='text-gray-600'>
                We may collect personal information that you provide to us when
                you use our Services, such as your name, email address, phone
                number, and payment information. We also collect information
                automatically when you access and use our platform, including
                your IP address, device information, and usage data.
              </p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                How We Use Your Information
              </h4>
              <p className='text-gray-600'>
                We use the information we collect to provide, maintain, and
                improve our Services, including processing payments,
                communicating with you, and personalizing your experience. We
                may also use your information to analyze trends, monitor the
                effectiveness of our marketing efforts, and comply with legal
                obligations.
              </p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Sharing of Information
              </h4>
              <p className='text-gray-600'>
                We may share your information with third-party service providers
                who help us operate our platform and provide our Services. We
                may also share your information in response to legal requests or
                to protect our rights, property, or safety. Additionally, we may
                share aggregated or anonymized information that does not
                personally identify you.
              </p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Your Choices
              </h4>
              <p className='text-gray-600'>
                You may choose to limit the collection and use of certain
                information by adjusting your device settings or opting out of
                certain data collection practices. However, please note that
                some features of our Services may not function properly if you
                disable cookies or other tracking mechanisms.
              </p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Security
              </h4>
              <p className='text-gray-600'>
                We take reasonable measures to protect the information we
                collect from loss, misuse, and unauthorized access, disclosure,
                alteration, and destruction. However, no security measures are
                100% effective, so we cannot guarantee the security of your
                information.
              </p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Updates to This Policy
              </h4>
              <p className='text-gray-600'>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of any material changes by posting the updated policy on our
                platform and updating the &quot;Last Updated&quot; date at the
                top of the policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy
