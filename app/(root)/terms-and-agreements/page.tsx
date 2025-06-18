import Link from 'next/link'

const Terms = () => {
  return (
    <>
      <section className='py-16 sm:py-20 xl:py-24 mx-4 mt-[100px] rounded-3xl bg-[#1B3B86] pb-52 md:pb-60 lg:rounded-[60px] lg:pb-72'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-3 text-white'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
            Terms & Condition
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
            <li className='text-[#E31C79]'>Terms & Condition</li>
          </ul>
        </div>
      </section>

      <section className='py-16 sm:py-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 -mt-40 rounded-xl border border-gray-200 bg-white p-4 sm:p-4 md:rounded-3xl xl:rounded-[60px] xl:p-16'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900'>
            Terms & Condition
          </h2>

          <ol className='mt-12 flex list-inside list-decimal flex-col gap-8'>
            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Introduction
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  Welcome to Bollo These terms and conditions govern your use of
                  our website and services. By accessing or using our website
                  and services, you agree to comply with these terms and
                  conditions.
                </li>
              </ul>
            </li>
            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                User Agreement
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  You must be at least 18 years old and legally capable of
                  entering into contracts to use our services. By using our
                  services, you represent that you meet these criteria.
                </li>
                <li className='pt-3'>
                  You must be at least 18 years old and legally capable of
                  entering into contracts to use our services. By using our
                  services, you represent that you meet these criteria.
                </li>
              </ul>
            </li>
            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Service Description
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  Our website provides a platform for users to On Demand
                  Services. We do not provide the services ourselves but
                  facilitate connections between users and service providers.
                </li>
              </ul>
            </li>
            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Payment Terms
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  Payment for services must be made through our platform. We may
                  use third-party payment processors, and you agree to abide by
                  their terms and conditions.
                </li>
                <li className='pt-3'>
                  Fees for services are determined by service providers and may
                  vary. We are not responsible for disputes over payment or
                  service quality.
                </li>
              </ul>
            </li>
            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                User Responsibilities
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  Users are responsible for their interactions with service
                  providers. We do not endorse or guarantee the quality of
                  services provided by service providers.
                </li>
                <li className='pt-3'>
                  Users agree to treat service providers with respect and to use
                  our platform for lawful purposes only.
                </li>
                <li className='pt-3'>
                  Our website and services, including content, logos, and
                  trademarks, are protected by intellectual property laws. Users
                  may not use our intellectual property without permission.
                </li>
              </ul>
            </li>

            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Privacy Policy
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  Our privacy policy governs how we collect, use, and disclose
                  personal information. By using our services, you agree to our
                  privacy policy.
                </li>
              </ul>
            </li>
            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Limitation of Liability
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  We are not liable for any direct, indirect, incidental,
                  special, or consequential damages resulting from your use of
                  our services.
                </li>
                <li className='pt-3'>
                  We do not guarantee the availability, accuracy, or reliability
                  of our services and are not responsible for any harm or loss
                  resulting from your reliance on them.
                </li>
                <li className='pt-3'>
                  You agree to indemnify and hold us harmless from any claims,
                  losses, damages, liabilities, and expenses arising from your
                  use of our services or violation of these terms and
                  conditions.
                </li>
                <li className='pt-3'>
                  These terms and conditions are governed by the laws of [Your
                  Jurisdiction]. Any disputes arising under these terms and
                  conditions shall be resolved in the courts of Services
                </li>
              </ul>
            </li>
            <li className='marker:text-xl marker:font-semibold marker:text-[#1B3B86]'>
              <span className='text-xl sm:text-2xl font-semibold text-[#1B3B86]'>
                Changes to Terms
              </span>
              <ul className='block list-inside list-disc pt-3 text-lg text-gray-600 marker:text-[10px] marker:text-gray-900'>
                <li>
                  We reserve the right to modify these terms and conditions at
                  any time. Changes will be effective upon posting on our
                  website. Continued use of our services constitutes acceptance
                  of the modified terms.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </section>
    </>
  )
}

export default Terms
