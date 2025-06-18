'use client'

import React, { useState } from 'react'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { PhoneInput } from '../ui/phone-input'
import ImageEditorModal from './image-editor-modal'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type UserType = 'customer' | 'serviceProvider'

interface BaseFormData {
  email: string
  password: string
  location: string
  phoneNumber: string
  profilePhoto: File | null
  photoPreview: string | null
  userType: UserType
}

interface CustomerFormData extends BaseFormData {
  firstName: string
  lastName: string
}

interface ServiceProviderFormData extends BaseFormData {
  name: string
  companyName: string
  isIndividual: boolean
  professionalTitle: string
}

type FormData = CustomerFormData | ServiceProviderFormData

interface FormErrors {
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  password?: string
  phoneNumber?: string
  companyName?: string
  professionalTitle?: string
  location?: string
  userType?: string
}

const initialCustomerData: CustomerFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  location: '',
  profilePhoto: null,
  photoPreview: null,
  userType: 'customer',
}

const initialServiceProviderData: ServiceProviderFormData = {
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
  companyName: '',
  isIndividual: false,
  professionalTitle: '',
  location: '',
  profilePhoto: null,
  photoPreview: null,
  userType: 'serviceProvider',
}

const validatePhoneNumber = (phoneNumber: string): boolean => {
  try {
    return phoneNumber ? isValidPhoneNumber(phoneNumber) : false
  } catch (error) {
    return false
  }
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

const validateStep = (step: number, formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  switch (step) {
    case 1:
      if (!formData.userType) {
        errors.userType = 'Please select user type'
      }
      if (formData.userType === 'customer') {
        const customerData = formData as CustomerFormData
        if (!customerData.firstName.trim()) {
          errors.firstName = 'First name is required'
        }
        if (!customerData.lastName.trim()) {
          errors.lastName = 'Last name is required'
        }
      } else {
        const providerData = formData as ServiceProviderFormData
        if (!providerData.name.trim()) {
          errors.name = 'Name is required'
        }
      }
      if (!formData.email.trim()) {
        errors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        errors.email = 'Invalid email format'
      }
      if (!formData.password) {
        errors.password = 'Password is required'
      } else if (!validatePassword(formData.password)) {
        errors.password = 'Password must be at least 8 characters'
      }
      if (!formData.phoneNumber) {
        errors.phoneNumber = 'Phone number is required'
      } else if (!validatePhoneNumber(formData.phoneNumber)) {
        errors.phoneNumber = 'Please enter a valid phone number'
      }

      break

    case 2:
      if (formData.userType === 'serviceProvider') {
        const providerData = formData as ServiceProviderFormData
        if (!providerData.isIndividual && !providerData.companyName.trim()) {
          errors.companyName = 'Company name is required'
        }
        if (!providerData.professionalTitle.trim()) {
          errors.professionalTitle = 'Professional title is required'
        }
      }
      if (!formData.location.trim()) {
        errors.location = 'Location is required'
      }
      break
  }

  return errors
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>(initialCustomerData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const router = useRouter()

  const handleUserTypeChange = (type: UserType) => {
    setFormData(
      type === 'customer' ? initialCustomerData : initialServiceProviderData
    )
    setErrors({})
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handlePhoneChange = (value: string | undefined): void => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value || '',
    }))

    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: undefined }))
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempImageUrl(reader.result as string)
        setIsEditorOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCroppedImage = (croppedImage: string) => {
    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'profile-picture.png', {
          type: 'image/png',
        })
        setFormData((prev) => ({
          ...prev,
          profilePhoto: file,
          photoPreview: croppedImage,
        }))
      })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    const stepErrors = validateStep(step, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    if (
      (formData.userType === 'customer' && step < 2) ||
      (formData.userType === 'serviceProvider' && step < 2)
    ) {
      setStep((prev) => prev + 1)
      setErrors({})
    } else {
      try {
        console.log('Form submitted:', formData)
        router.push('/verify')
      } catch (error) {
        console.error('Submission error:', error)
      }
    }
  }

  const handlePrevious = (): void => {
    if (step > 1) {
      setStep((prev) => prev - 1)
      setErrors({})
    }
  }

  const renderUserTypeSelection = () => (
    <div className='flex gap-4 mb-6'>
      <button
        type='button'
        onClick={() => handleUserTypeChange('customer')}
        className={`flex-1 py-3 px-4 rounded-xl font-semibold ${
          formData.userType === 'customer'
            ? 'bg-[#1B3B86] text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        Customer
      </button>
      <button
        type='button'
        onClick={() => handleUserTypeChange('serviceProvider')}
        className={`flex-1 py-3 px-4 rounded-xl font-semibold ${
          formData.userType === 'serviceProvider'
            ? 'bg-[#1B3B86] text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        Service Provider
      </button>
    </div>
  )

  const renderStep1 = () => (
    <div className='flex flex-col gap-6'>
      {formData.userType === 'customer' ? (
        <>
          <div className='flex flex-col gap-2'>
            <div
              className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
                errors.firstName ? 'border-red-500' : 'border-[#1B3B86]/10'
              } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
            >
              <i className='ph ph-user text-2xl !leading-none text-[#1B3B86]'></i>
              <input
                type='text'
                name='firstName'
                value={(formData as CustomerFormData).firstName}
                onChange={handleInputChange}
                placeholder='First Name'
                className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
              />
            </div>
            {errors.firstName && (
              <span className='text-xs text-red-500'>{errors.firstName}</span>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <div
              className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
                errors.lastName ? 'border-red-500' : 'border-[#1B3B86]/10'
              } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
            >
              <i className='ph ph-user text-2xl !leading-none text-[#1B3B86]'></i>
              <input
                type='text'
                name='lastName'
                value={(formData as CustomerFormData).lastName}
                onChange={handleInputChange}
                placeholder='Last Name'
                className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
              />
            </div>
            {errors.lastName && (
              <span className='text-xs text-red-500'>{errors.lastName}</span>
            )}
          </div>
        </>
      ) : (
        <div className='flex flex-col gap-2'>
          <div
            className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
              errors.name ? 'border-red-500' : 'border-[#1B3B86]/10'
            } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
          >
            <i className='ph ph-user text-2xl !leading-none text-[#1B3B86]'></i>
            <input
              type='text'
              name='name'
              value={(formData as ServiceProviderFormData).name}
              onChange={handleInputChange}
              placeholder='Full Name'
              className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
            />
          </div>
          {errors.name && (
            <span className='text-xs text-red-500'>{errors.name}</span>
          )}
        </div>
      )}

      <div className='flex flex-col gap-2'>
        <div
          className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
            errors.email ? 'border-red-500' : 'border-[#1B3B86]/10'
          } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
        >
          <i className='ph ph-envelope-simple text-2xl !leading-none text-[#1B3B86]'></i>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Enter Your Email'
            className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
          />
        </div>
        {errors.email && (
          <span className='text-xs text-red-500'>{errors.email}</span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div
          className={`phone-input-wrapper rounded-2xl border ${
            errors.phoneNumber ? 'border-red-500' : 'border-[#1B3B86]/10'
          }  transition-colors`}
        >
          <div className='flex items-center gap-3'>
            <div className='flex-1'>
              <PhoneInput
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder='Enter your phone number'
                className='phone-input-custom'
              />
            </div>
          </div>
        </div>
        {errors.phoneNumber && (
          <span className='text-xs text-red-500'>{errors.phoneNumber}</span>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div
          className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
            errors.password ? 'border-red-500' : 'border-[#1B3B86]/10'
          } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
        >
          <i className='ph ph-lock text-2xl !leading-none text-[#1B3B86]'></i>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Enter Your Password'
            className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
          />
        </div>
        {errors.password && (
          <span className='text-xs text-red-500'>{errors.password}</span>
        )}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className='flex flex-col gap-6'>
      {formData.userType === 'serviceProvider' && (
        <>
          <div className='flex flex-col gap-2'>
            <div
              className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
                errors.companyName ? 'border-red-500' : 'border-[#1B3B86]/10'
              } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
            >
              <i className='ph ph-buildings text-2xl !leading-none text-[#1B3B86]'></i>
              <input
                type='text'
                name='companyName'
                value={(formData as ServiceProviderFormData).companyName}
                onChange={handleInputChange}
                placeholder='Enter Company Name'
                className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
                disabled={(formData as ServiceProviderFormData).isIndividual}
              />
            </div>
            {errors.companyName && (
              <span className='text-xs text-red-500'>{errors.companyName}</span>
            )}
          </div>

          <div className='flex items-center justify-start gap-3'>
            <input
              type='checkbox'
              name='isIndividual'
              checked={(formData as ServiceProviderFormData).isIndividual}
              onChange={handleInputChange}
              className='h-4 w-4'
            />
            <p className='text-sm text-gray-600'>
              I'm providing services as an individual
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <div
              className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
                errors.professionalTitle
                  ? 'border-red-500'
                  : 'border-[#1B3B86]/10'
              } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
            >
              <i className='ph ph-briefcase text-2xl !leading-none text-[#1B3B86]'></i>
              <input
                type='text'
                name='professionalTitle'
                value={(formData as ServiceProviderFormData).professionalTitle}
                onChange={handleInputChange}
                placeholder='Professional Title'
                className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
              />
            </div>
            {errors.professionalTitle && (
              <span className='text-xs text-red-500'>
                {errors.professionalTitle}
              </span>
            )}
          </div>
        </>
      )}

      <div className='flex flex-col gap-2'>
        <div
          className={`flex w-full items-center justify-start gap-3 rounded-2xl border ${
            errors.location ? 'border-red-500' : 'border-[#1B3B86]/10'
          } bg-[#1B3B86]/5 px-4 py-3 focus-within:border-[#E31C79] transition-colors`}
        >
          <i className='ph ph-map-pin text-2xl !leading-none text-[#1B3B86]'></i>
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleInputChange}
            placeholder='Location'
            className='w-full text-sm text-gray-600 outline-none bg-transparent placeholder:text-gray-500'
          />
        </div>
        {errors.location && (
          <span className='text-xs text-red-500'>{errors.location}</span>
        )}
      </div>

      <div className=''>
        <p className='pb-3 text-sm text-gray-600'>
          Add a photo to help build connection and trust.
        </p>
        <label className='flex flex-col items-center justify-center rounded-3xl border border-[#1B3B86]/10 bg-[#1B3B86]/5 px-3 py-10 cursor-pointer relative'>
          <input
            type='file'
            accept='image/*'
            onChange={handlePhotoUpload}
            className='hidden'
          />
          {formData.photoPreview ? (
            <div className='w-32 h-32 rounded-full overflow-hidden mb-3'>
              <img
                src={formData.photoPreview}
                alt='Profile preview'
                className='w-full h-full object-cover'
              />
            </div>
          ) : (
            <i className='ph ph-image text-6xl !leading-none text-[#1B3B86]'></i>
          )}
          <p className='pt-3 text-sm font-medium'>
            {formData.profilePhoto ? 'Change photo' : 'Upload profile photo'}
          </p>
        </label>
      </div>

      {tempImageUrl && (
        <ImageEditorModal
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false)
            setTempImageUrl(null)
          }}
          imageUrl={tempImageUrl}
          onSave={handleCroppedImage}
        />
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-col pt-6'>
      {renderUserTypeSelection()}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}

      <div className='w-full mt-6'>
        {/* Navigation Buttons */}
        <div className='flex gap-4'>
          {step > 1 && (
            <button
              type='button'
              onClick={handlePrevious}
              className='flex-1 relative flex items-center justify-center overflow-hidden rounded-xl bg-gray-200 px-4 py-3 font-semibold text-gray-700 duration-700 hover:bg-gray-300 transition-colors sm:px-8'
            >
              <span className='relative z-10'>Previous</span>
            </button>
          )}
          <button
            type='submit'
            className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-[#1B3B86] px-4 py-3 font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-xl after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] sm:px-8 ${
              step > 1 ? 'flex-1' : 'w-full'
            }`}
          >
            <span className='relative z-10'>
              {step === 2 ? 'Complete Signup' : 'Continue'}
            </span>
          </button>
        </div>

        <div className='flex items-center justify-center gap-2 py-3 text-sm font-medium'>
          <p className='text-gray-600'>Already have an account?</p>
          <Link
            href='/signin'
            className='text-[#1B3B86] hover:text-[#E31C79] transition-colors underline'
          >
            Sign in here
          </Link>
        </div>

        {step === 1 && (
          <div className='flex flex-col gap-3 mt-6'>
            <button
              type='button'
              className='flex w-full items-center justify-center gap-2 rounded-2xl border border-[#1B3B86]/10 bg-white py-3 hover:bg-[#1B3B86]/5 transition-colors'
            >
              <img
                src='/assets/images/google_icon.png'
                alt='Sign in with Google'
              />
              <span className='text-sm text-gray-900'>
                Continue with Google
              </span>
            </button>

            <button
              type='button'
              className='flex w-full items-center justify-center gap-2 rounded-2xl border border-[#1B3B86]/10 bg-white py-3 hover:bg-[#1B3B86]/5 transition-colors'
            >
              <img
                src='/assets/images/facebook_icon.png'
                alt='Sign in with Facebook'
              />
              <span className='text-sm text-gray-900'>
                Continue with Facebook
              </span>
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default MultiStepForm
