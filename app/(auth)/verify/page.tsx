'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'

const OTPVerification: FC = () => {
  const router = useRouter()

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [timer, setTimer] = useState<number>(120)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const emailParam = params.get('email')
    const storedEmail = localStorage.getItem('userEmail')

    // For demo purposes, set a sample email if none found
    const userEmail = emailParam || storedEmail || 'user@example.com'
    setEmail(userEmail)

    // Store email for future reference
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail)
    }
  }, [])

  // Handle countdown timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)

      return () => clearInterval(countdown)
    }
  }, [timer])

  // Format timer to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  // Mask email for privacy
  const maskEmail = (email: string): string => {
    if (!email) return ''

    const parts = email.split('@')
    if (parts.length !== 2) return email

    const name = parts[0]
    const domain = parts[1]

    const maskedName =
      name.substring(0, 2) +
      '*'.repeat(name.length > 3 ? name.length - 3 : 1) +
      (name.length > 2 ? name.charAt(name.length - 1) : '')

    return `${maskedName}@${domain}`
  }

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').trim()

    // Check if pasted content is numeric and of appropriate length
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, 6).split('')
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    // Focus the appropriate field after paste
    if (digits.length < 6) {
      inputRefs.current[digits.length]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const verifyOTP = async () => {
    const otpValue = otp.join('')

    // Validate OTP
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setIsVerifying(true)
    setError('')

    try {
      // Replace with your actual API call
      // const response = await verifyOTPApi(email, otpValue)

      // Simulate API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to success page or dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid verification code. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const resendOTP = async () => {
    if (timer > 0) return

    try {
      // Replace with your actual resend API call
      // await resendOTPApi(email)

      // Reset timer
      setTimer(120)
      setError('')

      // Show success message
      // You could add a success toast here
    } catch (err) {
      setError('Failed to resend verification code. Please try again.')
    }
  }

  return (
    <section className='relative overflow-hidden bg-[#E31C79]/5 min-h-screen'>
      <div className='flex h-full min-h-screen items-center justify-center'>
        {/* Form Section - Centered */}
        <div className='flex h-full w-full max-w-[530px] flex-col items-center justify-center px-6 pt-40 lg:pt-20'>
          {/* Logo */}
          <div>
            <Link href='/'>
              <img
                src='/assets/images/logo.png'
                alt='Bollo logo'
                className='h-24 w-auto'
              />
            </Link>
          </div>

          {/* Welcome Text */}
          <div className='flex flex-col items-center justify-center pt-8 text-center'>
            <h1 className='heading-5 text-gray-900'>Verify your email</h1>
            <p className='mt-2 text-gray-600'>
              We've sent a verification code to{' '}
              <span className='font-medium'>{maskEmail(email)}</span>
            </p>
            <div className='mt-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800 shadow-sm'>
              Please check your inbox and spam folder for the verification code
            </div>
          </div>

          {/* OTP Input Fields */}
          <div className='mt-8 w-full'>
            <div className='flex justify-center gap-2 sm:gap-4'>
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <input
                    key={index}
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el
                      return undefined
                    }}
                    type='text'
                    inputMode='numeric'
                    autoComplete='one-time-code'
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    maxLength={1}
                    className='h-12 w-12 rounded-lg border border-gray-300 bg-white text-center text-lg font-semibold focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79] sm:h-14 sm:w-14 shadow-sm'
                    required
                  />
                ))}
            </div>

            {/* Error Message */}
            {error && (
              <p className='mt-2 text-center text-sm text-red-500'>{error}</p>
            )}

            {/* Timer and Resend */}
            <div className='mt-6 flex justify-center'>
              <button
                onClick={resendOTP}
                disabled={timer > 0}
                type='button'
                className={`text-sm ${
                  timer > 0
                    ? 'text-gray-400'
                    : 'cursor-pointer text-[#E31C79] hover:underline'
                }`}
              >
                {timer > 0
                  ? `Resend code in ${formatTime(timer)}`
                  : 'Resend verification code'}
              </button>
            </div>

            {/* Verify Button */}
            <div className='mt-8'>
              <button
                onClick={verifyOTP}
                disabled={isVerifying || otp.join('').length !== 6}
                type='button'
                className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#1B3B86] px-4 py-3 font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-xl after:duration-700 hover:after:w-[calc(100%+2px)] sm:px-8 shadow-lg ${
                  isVerifying || otp.join('').length !== 6
                    ? 'cursor-not-allowed opacity-70'
                    : 'after:bg-[#E31C79]'
                }`}
              >
                {isVerifying ? (
                  <span className='flex items-center justify-center'>
                    <svg
                      className='mr-2 h-5 w-5 animate-spin text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014-12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className='relative z-10'>Verify Account</span>
                )}
              </button>
            </div>

            {/* Back to Login */}
            <div className='mt-4 text-center'>
              <Link
                href='/signup'
                className='text-[#1B3B86] hover:text-[#E31C79] transition-colors underline'
              >
                Back to signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OTPVerification
