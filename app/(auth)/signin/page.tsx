'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Define Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

type SignInFormData = z.infer<typeof signInSchema>

const SignIn = () => {
  const router = useRouter()

  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'duclair.fopa@hotmail.com',
      password: 'myaccount',
    },
  })

  // Form submission handler
  const onSubmit = (data: SignInFormData) => {
    // Here you can handle the form submission (e.g., API call)
    console.log('Form submitted:', data)
    router.push('/dashboard')
  }

  return (
    <section className='relative overflow-hidden bg-[#E31C79]/5 min-h-screen'>
      <div className='flex h-full items-center justify-center'>
        {/* Form Section - Centered */}
        <div className='flex h-full w-full max-w-[530px] flex-col items-center justify-center px-6 pt-40 lg:pt-20'>
          {/* Logo */}
          <div>
            <Link href='/'>
              <Image
                src='/assets/images/logo.png'
                alt='Bollo logo'
                width={96} // Adjust width based on your design needs (h-24 implies ~96px at default density)
                height={96}
                className='h-24 w-auto'
                priority // Optional: prioritize loading for logo
              />
            </Link>
          </div>

          {/* Welcome Text */}
          <div className='flex items-center justify-center pt-8'>
            <p className='heading-5 text-gray-900'>Welcome to Bollo</p>
            <Image
              src='/assets/images/victor_icon.png'
              alt='Victor icon'
              width={24} // Adjust based on your design
              height={24}
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-full flex-col pt-6'
          >
            <div className='flex flex-col gap-6'>
              {/* Email Input */}
              <div className='flex flex-col'>
                <div className='flex w-full items-center justify-start gap-3 rounded-2xl border border-[#1B3B86]/10 bg-white px-4 py-3 focus-within:border-[#E31C79] transition-colors shadow-sm'>
                  <i className='ph ph-envelope-simple text-2xl !leading-none text-[#1B3B86]'></i>
                  <input
                    type='email'
                    placeholder='Enter Your Email'
                    {...register('email')}
                    className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className='flex flex-col'>
                <div className='flex w-full items-center justify-start gap-3 rounded-2xl border border-[#1B3B86]/10 bg-white px-4 py-3 focus-within:border-[#E31C79] transition-colors shadow-sm'>
                  <i className='ph ph-lock text-2xl !leading-none text-[#1B3B86]'></i>
                  <input
                    type='password'
                    placeholder='*******'
                    {...register('password')}
                    className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
                  />
                </div>
                {errors.password && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className='w-full'>
              {/* Forgot Password Link */}
              <a
                href='./contact'
                className='block py-3 text-end text-sm font-medium text-[#1B3B86] hover:text-[#E31C79] transition-colors'
              >
                Forgot Password?
              </a>

              {/* Sign In Button */}
              <button
                type='submit'
                className='relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#1B3B86] px-4 py-3 font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-xl after:bg-[#E31C79] after:duration-700 hover:after:w-[calc(100%+2px)] sm:px-8 shadow-lg'
              >
                <span className='relative z-10'>Sign In</span>
              </button>

              {/* Sign Up Link */}
              <div className='flex items-center justify-center gap-2 py-3 text-sm font-medium'>
                <p className='text-gray-600'>Don&apos;t have an account?</p>
                <Link
                  href='/signup'
                  className='text-[#1B3B86] hover:text-[#E31C79] transition-colors underline'
                >
                  Sign Up with Email
                </Link>
              </div>

              {/* Social Buttons */}
              <button
                type='button'
                className='mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#1B3B86]/10 bg-white py-3 hover:bg-[#1B3B86]/5 transition-colors shadow-sm'
              >
                <Image
                  src='/assets/images/google_icon.png'
                  alt='Sign in with Google'
                  width={24} // Adjust based on your design
                  height={24}
                />
                <span className='text-sm text-gray-900'>Google</span>
              </button>

              <button
                type='button'
                className='mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#1B3B86]/10 bg-white py-3 hover:bg-[#1B3B86]/5 transition-colors shadow-sm'
              >
                <Image
                  src='/assets/images/facebook_icon.png'
                  alt='Sign in with Facebook'
                  width={24} // Adjust based on your design
                  height={24}
                />
                <span className='text-sm text-gray-900'>Facebook</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignIn
