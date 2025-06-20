'use client'

import MultiStepForm from '@/components/auth/multi-step-form'
import Link from 'next/link'
import Image from 'next/image' // Import Image from next/image
import { FC } from 'react'

const SignUp: FC = () => {
  return (
    <section className='relative min-h-screen bg-[#E31C79]/5 overflow-hidden'>
      <div className='flex h-full items-center justify-center'>
        {/* Form Section - Centered */}
        <div className='flex h-full w-full max-w-[530px] flex-col items-center justify-center px-6 pt-40 max-sm:pt-32 lg:pt-20'>
          {/* Logo */}
          <div>
            <Link href='/'>
              <Image
                src='/assets/images/logo.png'
                alt='Bollo logo'
                width={96} // Adjust width based on h-24 (~96px at default density)
                height={96}
                className='h-24 w-auto'
                priority // Prioritize loading for logo
              />
            </Link>
          </div>

          {/* Welcome Text */}
          <div className='flex items-center justify-start pt-8'>
            <p className='heading-5 text-gray-900'>Welcome to Bollo</p>
          </div>

          <MultiStepForm />
        </div>
      </div>
    </section>
  )
}

export default SignUp
