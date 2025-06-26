'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night'
type ServiceType =
  | 'plumbing'
  | 'electrical'
  | 'carpentry'
  | 'cleaning'
  | 'painting'
  | 'general'
type RequirementType = 'equipment' | 'materials' | 'access' | 'permits'

// Zod Schema for form validation
const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .min(10, 'Task title must be at least 10 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(20, 'Description must be at least 20 characters'),
  serviceType: z.enum([
    'plumbing',
    'electrical',
    'carpentry',
    'cleaning',
    'painting',
    'general',
  ]),

  date: z
    .object({
      type: z.enum(['on', 'before', 'flexible']),
      onDate: z.string().optional(),
      beforeDate: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.type === 'on' && !data.onDate) {
          return false
        }
        if (data.type === 'before' && !data.beforeDate) {
          return false
        }
        return true
      },
      {
        message: 'Please select a date',
        path: ['onDate'],
      }
    ),

  timePreference: z
    .object({
      specific: z.boolean(),
      period: z.enum(['morning', 'afternoon', 'evening', 'night']).optional(),
    })
    .refine(
      (data) => {
        if (data.specific && !data.period) {
          return false
        }
        return true
      },
      {
        message: 'Please select a time period',
        path: ['period'],
      }
    ),

  location: z
    .object({
      isOnSite: z.boolean(),
      address: z.string().optional(),
      suburb: z.string().optional(),
      postcode: z.string().optional(),
      accessInstructions: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.isOnSite) {
          if (!data.address || !data.suburb || !data.postcode) {
            return false
          }
        }
        return true
      },
      {
        message: 'Please fill in all required address fields',
        path: ['address'],
      }
    ),

  details: z.object({
    requirements: z.array(
      z.object({
        type: z.enum(['equipment', 'materials', 'access', 'permits']),
        description: z.string().min(1, 'Requirement description is required'),
        providedBy: z.enum(['customer', 'service_provider']),
      })
    ),
    specifications: z.record(z.unknown()),
    additionalNotes: z.string().optional(),
  }),

  budget: z
    .string()
    .min(1, 'Budget is required')
    .refine(
      (val) => {
        const num = parseFloat(val.replace(/[^0-9.]/g, ''))
        return !isNaN(num) && num > 0
      },
      {
        message: 'Please enter a valid budget amount',
      }
    ),

  region: z.string().min(1, 'Please select a region'),

  account: z.object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    suburb: z.string().min(1, 'Suburb is required'),
    goal: z.enum(['post', 'earn']),
    marketingConsent: z.boolean(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  }),
})

type TaskFormData = z.infer<typeof taskFormSchema>

const regions = [
  { name: 'Nigeria', image: '/assets/images/nigeria-flag.png' },
  { name: 'Kenya', image: '/assets/images/kenya-flag.png' },
  { name: 'Ethiopia', image: '/assets/images/ethiopia-flag.png' },
  { name: 'Cameroon', image: '/assets/images/cameroon-flag.png' },
  { name: 'Ghana', image: '/assets/images/ghana-flag.png' },
]

const serviceTypes: { type: ServiceType; label: string; icon: string }[] = [
  { type: 'plumbing', label: 'Plumbing', icon: 'ph-drop' },
  { type: 'electrical', label: 'Electrical', icon: 'ph-lightning' },
  { type: 'carpentry', label: 'Carpentry', icon: 'ph-hammer' },
  { type: 'cleaning', label: 'Cleaning', icon: 'ph-broom' },
  { type: 'painting', label: 'Painting', icon: 'ph-paint-brush' },
  { type: 'general', label: 'General', icon: 'ph-tools' },
]

const TaskPostingForm = () => {
  const [step, setStep] = useState(1)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      serviceType: 'general',
      date: { type: 'flexible' },
      timePreference: { specific: false },
      location: {
        isOnSite: true,
        address: '',
        suburb: '',
        postcode: '',
      },
      details: {
        requirements: [],
        specifications: {},
        additionalNotes: '',
      },
      budget: '',
      region: '',
      account: {
        firstName: '',
        lastName: '',
        suburb: '',
        goal: 'post',
        marketingConsent: false,
        termsAccepted: false,
      },
    },
    mode: 'onChange',
  })

  const watchedValues = watch()

  const handleNext = async () => {
    let fieldsToValidate: (keyof TaskFormData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate = [
          'title',
          'description',
          'serviceType',
          'date',
          'timePreference',
        ]
        break
      case 2:
        fieldsToValidate = ['location']
        break
      case 3:
        fieldsToValidate = ['details']
        break
      case 4:
        fieldsToValidate = ['budget']
        break
      case 5:
        fieldsToValidate = ['region']
        break
      case 6:
        fieldsToValidate = ['account']
        break
    }

    const isValidStep = await trigger(fieldsToValidate)
    if (isValidStep) {
      setStep((prev) => Math.min(prev + 1, 6))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const renderStepIndicator = () => (
    <div className='col-span-12 md:col-span-4 xl:col-span-3 xl:col-start-2'>
      <div className='rounded-3xl border border-gray-200 p-4 sm:p-8'>
        <ul className='flex flex-col gap-8'>
          {[
            { number: 1, title: 'Service & Date' },
            { number: 2, title: 'Location' },
            { number: 3, title: 'Details' },
            { number: 4, title: 'Budget' },
          ].map((item, index) => (
            <li key={item.number} className='relative'>
              <div
                className={`flex w-full items-center justify-start gap-4 rounded-full ${
                  step === item.number ? 'bg-[#1B3B86]/10' : ''
                } p-2`}
              >
                <div
                  className={`flex size-9 items-center justify-center rounded-full 
                  ${
                    step > item.number
                      ? 'bg-[#1B3B86] text-white'
                      : step === item.number
                      ? 'bg-[#1B3B86] text-white'
                      : 'border-2 border-gray-300 text-gray-300'
                  } p-2 !leading-none`}
                >
                  {step > item.number ? (
                    <i className='ph-bold ph-check'></i>
                  ) : (
                    <span className='text-sm'>{item.number}</span>
                  )}
                </div>
                <p
                  className={`text-sm font-medium ${
                    step === item.number ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {item.title}
                </p>
              </div>
              {index < 3 && (
                <img
                  src='/assets/images/steps_icon.png'
                  className='absolute -bottom-8 left-6'
                  alt=''
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className='col-span-12 md:col-span-8 xl:col-span-6 xl:col-start-6'>
      <div className='rounded-3xl border border-gray-200 p-6 sm:p-8'>
        <h4 className='text-xl sm:text-2xl font-semibold text-gray-900'>
          Let&apos;s start with the basics
        </h4>

        {/* Service Type Selection */}
        <div className='pt-6'>
          <p className='pb-4 font-medium text-gray-600'>
            What type of service do you need?*
          </p>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {serviceTypes.map((service) => (
              <button
                key={service.type}
                type='button'
                onClick={() => setValue('serviceType', service.type)}
                className={`rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-colors
                  ${
                    watchedValues.serviceType === service.type
                      ? 'bg-[#1B3B86] text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                <i className={`${service.icon} text-2xl`}></i>
                <span>{service.label}</span>
              </button>
            ))}
          </div>
          {errors.serviceType && (
            <p className='text-red-500 text-sm mt-2'>
              {errors.serviceType.message}
            </p>
          )}
        </div>

        {/* Task Title */}
        <div className='pt-6'>
          <p className='pb-4 text-gray-900'>
            Briefly describe what you need done*
          </p>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                placeholder="e.g., 'Fix leaking bathroom tap' or 'Install new light fixture'"
                className={`w-full rounded-2xl bg-gray-100 p-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                  errors.title ? 'border-red-500' : ''
                }`}
              />
            )}
          />
          {errors.title && (
            <p className='text-red-500 text-sm mt-2'>{errors.title.message}</p>
          )}
        </div>

        {/* Detailed Description */}
        <div className='pt-6'>
          <p className='pb-4 text-gray-900'>
            Provide more details about your task*
          </p>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder='Describe your task in detail...'
                className={`w-full rounded-2xl bg-gray-100 p-3 min-h-[100px] outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                  errors.description ? 'border-red-500' : ''
                }`}
              />
            )}
          />
          {errors.description && (
            <p className='text-red-500 text-sm mt-2'>
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Date Selection */}
        <div className='pt-6'>
          <p className='pb-4 font-medium text-gray-600'>
            When do you need this done?*
          </p>
          <div className='flex flex-wrap items-center justify-start gap-2'>
            <div>
              <p className='pb-3 font-semibold text-gray-900'>On Date</p>
              <Controller
                name='date.onDate'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='date'
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setValue('date.type', 'on')
                    }}
                    className={`rounded-full border border-[#1B3B86] px-4 py-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 ${
                      errors.date?.onDate ? 'border-red-500' : ''
                    }`}
                  />
                )}
              />
            </div>

            <div>
              <p className='pb-3 font-semibold text-gray-900'>Before Date</p>
              <Controller
                name='date.beforeDate'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='date'
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setValue('date.type', 'before')
                    }}
                    className={`rounded-full border border-[#1B3B86] px-4 py-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 ${
                      errors.date?.beforeDate ? 'border-red-500' : ''
                    }`}
                  />
                )}
              />
            </div>

            <div>
              <p className='pb-3 font-semibold text-gray-900'>Anytime</p>
              <button
                type='button'
                onClick={() => setValue('date.type', 'flexible')}
                className={`rounded-full border border-[#1B3B86] px-4 py-3 font-medium transition-colors ${
                  watchedValues.date.type === 'flexible'
                    ? 'bg-[#1B3B86] text-white'
                    : 'text-[#1B3B86] hover:bg-[#1B3B86]/10'
                }`}
              >
                I&apos;m flexible
              </button>
            </div>
          </div>
          {errors.date?.onDate && (
            <p className='text-red-500 text-sm mt-2'>
              {errors.date.onDate.message}
            </p>
          )}
        </div>

        {/* Time Preference */}
        <div className='flex items-center justify-start gap-2 pb-6 pt-6 font-medium lg:pb-10'>
          <Controller
            name='timePreference.specific'
            control={control}
            render={({ field: { value, ...field } }) => (
              <input
                {...field}
                type='checkbox'
                checked={value}
                className='accent-[#1B3B86]'
              />
            )}
          />
          <p className='text-gray-900'>I need a certain time of day</p>
        </div>

        {watchedValues.timePreference.specific && (
          <div className='flex flex-wrap items-center justify-start gap-3'>
            {['Morning', 'Afternoon', 'Evening', 'Night'].map((period) => (
              <div
                key={period}
                onClick={() =>
                  setValue(
                    'timePreference.period',
                    period.toLowerCase() as TimePeriod
                  )
                }
                className={`cursor-pointer rounded-2xl transition-colors ${
                  watchedValues.timePreference.period === period.toLowerCase()
                    ? 'bg-[#1B3B86] text-white'
                    : 'bg-gray-100 hover:bg-[#1B3B86] hover:text-white'
                } px-3 py-3 text-center duration-500 lg:px-5 lg:py-6`}
              >
                <p className='font-semibold'>{period}</p>
                <p className='text-sm font-medium'>
                  Before {period === 'Morning' ? '10am' : '4pm'}
                </p>
              </div>
            ))}
          </div>
        )}
        {errors.timePreference?.period && (
          <p className='text-red-500 text-sm mt-2'>
            {errors.timePreference.period.message}
          </p>
        )}

        <div className='mt-12 flex items-center justify-end'>
          <button
            type='button'
            onClick={handleNext}
            className='relative flex w-1/2 items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-4 py-2 text-lg font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Next</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className='col-span-12 md:col-span-8 xl:col-span-6 xl:col-start-6'>
      <div className='rounded-3xl border border-gray-200 p-6 sm:p-8'>
        <h4 className='text-xl sm:text-2xl font-semibold text-gray-900'>
          Tell us where
        </h4>

        {/* On-site Service */}
        <div className='pt-6 lg:pt-10'>
          <p className='pb-4 font-medium text-gray-600'>
            Does this task require on-site service?*
          </p>
          <div className='flex items-center justify-start font-medium gap-2'>
            <button
              type='button'
              onClick={() => setValue('location.isOnSite', true)}
              className={`rounded-lg transition-colors ${
                watchedValues.location.isOnSite
                  ? 'bg-[#1B3B86] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              } px-10 py-3 lg:px-15`}
            >
              Yes
            </button>
            <button
              type='button'
              onClick={() => setValue('location.isOnSite', false)}
              className={`rounded-lg transition-colors ${
                !watchedValues.location.isOnSite
                  ? 'bg-[#1B3B86] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              } px-10 py-3 lg:px-15`}
            >
              No
            </button>
          </div>
        </div>

        {/* Address Fields */}
        {watchedValues.location.isOnSite && (
          <>
            <div className='mt-6'>
              <p className='pb-4 text-gray-900'>Street Address*</p>
              <Controller
                name='location.address'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className={`w-full rounded-2xl bg-gray-100 p-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                      errors.location?.address ? 'border-red-500' : ''
                    }`}
                    placeholder='Enter street address'
                  />
                )}
              />
              {errors.location?.address && (
                <p className='text-red-500 text-sm mt-2'>
                  {errors.location.address.message}
                </p>
              )}
            </div>

            <div className='mt-6'>
              <p className='pb-4 text-gray-900'>Suburb*</p>
              <Controller
                name='location.suburb'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className={`w-full rounded-2xl bg-gray-100 p-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                      errors.location?.suburb ? 'border-red-500' : ''
                    }`}
                    placeholder='Enter suburb'
                  />
                )}
              />
              {errors.location?.suburb && (
                <p className='text-red-500 text-sm mt-2'>
                  {errors.location.suburb.message}
                </p>
              )}
            </div>

            <div className='mt-6'>
              <p className='pb-4 text-gray-900'>Postcode*</p>
              <Controller
                name='location.postcode'
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    className={`w-full rounded-2xl bg-gray-100 p-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                      errors.location?.postcode ? 'border-red-500' : ''
                    }`}
                    placeholder='Enter postcode'
                  />
                )}
              />
              {errors.location?.postcode && (
                <p className='text-red-500 text-sm mt-2'>
                  {errors.location.postcode.message}
                </p>
              )}
            </div>

            <div className='mt-6'>
              <p className='pb-4 text-gray-900'>Access Instructions</p>
              <Controller
                name='location.accessInstructions'
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className='w-full rounded-2xl bg-gray-100 p-3 min-h-[100px] outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86]'
                    placeholder='Any specific instructions for accessing the location?'
                  />
                )}
              />
            </div>
          </>
        )}

        <div className='mt-12 flex items-center justify-between gap-6'>
          <button
            type='button'
            onClick={handleBack}
            className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gray-100 px-4 py-2 text-lg font-medium duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Back</span>
          </button>
          <button
            type='button'
            onClick={handleNext}
            className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-4 py-2 text-lg font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Next</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className='col-span-12 md:col-span-8 xl:col-span-6 xl:col-start-6'>
      <div className='rounded-3xl border border-gray-200 p-6 sm:p-8'>
        <h4 className='text-xl sm:text-2xl font-semibold text-gray-900'>
          Service Requirements
        </h4>

        {/* Requirements Section */}
        <div className='pt-6 lg:pt-10'>
          <p className='pb-4 font-medium text-gray-600'>Requirements*</p>
          <Controller
            name='details.requirements'
            control={control}
            render={({ field }) => (
              <>
                {field.value.map((req, index) => (
                  <div key={index} className='mb-4 p-4 bg-gray-100 rounded-xl'>
                    <div className='flex justify-between items-center'>
                      <select
                        value={req.type}
                        onChange={(e) => {
                          const newReqs = [...field.value]
                          newReqs[index].type = e.target
                            .value as RequirementType
                          field.onChange(newReqs)
                        }}
                        className='bg-transparent outline-none text-gray-900'
                      >
                        <option value='equipment'>Equipment</option>
                        <option value='materials'>Materials</option>
                        <option value='access'>Access</option>
                        <option value='permits'>Permits</option>
                      </select>
                      <button
                        type='button'
                        onClick={() => {
                          const newReqs = field.value.filter(
                            (_, i) => i !== index
                          )
                          field.onChange(newReqs)
                        }}
                        className='text-[#E31C79] hover:text-red-600'
                      >
                        <i className='ph-bold ph-x'></i>
                      </button>
                    </div>
                    <input
                      type='text'
                      value={req.description}
                      onChange={(e) => {
                        const newReqs = [...field.value]
                        newReqs[index].description = e.target.value
                        field.onChange(newReqs)
                      }}
                      placeholder='Describe the requirement'
                      className='w-full mt-2 bg-transparent outline-none text-gray-900'
                    />
                    <select
                      value={req.providedBy}
                      onChange={(e) => {
                        const newReqs = [...field.value]
                        newReqs[index].providedBy = e.target.value as
                          | 'customer'
                          | 'service_provider'
                        field.onChange(newReqs)
                      }}
                      className='mt-2 bg-transparent outline-none text-gray-900'
                    >
                      <option value='customer'>I will provide</option>
                      <option value='service_provider'>
                        Service provider should provide
                      </option>
                    </select>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => {
                    field.onChange([
                      ...field.value,
                      {
                        type: 'equipment' as RequirementType,
                        description: '',
                        providedBy: 'customer' as const,
                      },
                    ])
                  }}
                  className='text-[#1B3B86] flex items-center gap-2 hover:text-[#E31C79] transition-colors'
                >
                  <i className='ph-bold ph-plus'></i>
                  Add Requirement
                </button>
              </>
            )}
          />
          {errors.details?.requirements && (
            <p className='text-red-500 text-sm mt-2'>
              {errors.details.requirements.message}
            </p>
          )}
        </div>

        {/* Additional Notes */}
        <div className='pt-6'>
          <p className='pb-4 font-medium text-gray-600'>Additional Notes</p>
          <Controller
            name='details.additionalNotes'
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder='Any other details the service provider should know?'
                className='w-full rounded-2xl bg-gray-100 p-3 min-h-[150px] outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86]'
              />
            )}
          />
        </div>

        <div className='mt-12 flex items-center justify-between gap-6'>
          <button
            type='button'
            onClick={handleBack}
            className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gray-100 px-4 py-2 text-lg font-medium duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Back</span>
          </button>
          <button
            type='button'
            onClick={handleNext}
            className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-4 py-2 text-lg font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Next</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className='col-span-12 md:col-span-8 xl:col-span-6 xl:col-start-6'>
      <div className='rounded-3xl border border-gray-200 p-6 sm:p-8'>
        <h4 className='text-xl sm:text-2xl font-semibold text-gray-900'>
          Budget
        </h4>

        <p className='pt-10 font-medium text-gray-600'>What is your budget?*</p>
        <p className='pt-1 text-gray-600'>
          You can always negotiate the final price with the service provider.
        </p>

        <div className='mt-4 flex items-center justify-start gap-3 rounded-2xl bg-gray-100 p-3 focus-within:ring-2 focus-within:ring-[#1B3B86]/20 focus-within:bg-white focus-within:border-[#1B3B86] border border-transparent'>
          <i className='ph-bold ph-currency-dollar-simple text-[#1B3B86]'></i>
          <Controller
            name='budget'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                className='w-full bg-transparent outline-none placeholder:font-medium placeholder:text-gray-500'
                placeholder='Enter budget'
              />
            )}
          />
        </div>
        {errors.budget && (
          <p className='text-red-500 text-sm mt-2'>{errors.budget.message}</p>
        )}

        <div className='mt-12 flex items-center justify-between gap-6'>
          <button
            type='button'
            onClick={handleBack}
            className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gray-100 px-4 py-2 text-lg font-medium duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Back</span>
          </button>
          <button
            type='button'
            onClick={handleNext}
            className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-4 py-2 text-lg font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Next</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <>
      <div className='container grid grid-cols-12 pt-20'>
        <div className='col-span-12 sm:col-span-6 sm:col-start-4 lg:col-span-4 lg:col-start-5'>
          <h4 className='text-xl sm:text-2xl font-semibold text-gray-900'>
            Select your region
          </h4>
          <div className='flex flex-col gap-10 pt-10'>
            {regions.map((region) => (
              <button
                key={region.name}
                type='button'
                onClick={() => {
                  setValue('region', region.name)
                }}
                className='flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors'
              >
                <div className='flex items-center justify-start gap-6'>
                  <img
                    src={region.image}
                    alt={region.name}
                    width={70}
                    height={50}
                  />
                  <p className='text-lg font-medium text-gray-900'>
                    {region.name}
                  </p>
                </div>
                <div className='text-xl text-[#1B3B86]'>
                  <i className='ph-bold ph-caret-right'></i>
                </div>
              </button>
            ))}
          </div>
          {errors.region && (
            <p className='text-red-500 text-sm mt-2'>{errors.region.message}</p>
          )}
          <div className='mt-10 flex items-center justify-between gap-6'>
            <button
              type='button'
              onClick={handleBack}
              className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-gray-100 px-4 py-2 text-lg font-medium duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
            >
              <span className='relative z-10'>Back</span>
            </button>
            <button
              type='button'
              onClick={handleNext}
              className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-4 py-2 text-lg font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
            >
              <span className='relative z-10'>Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )

  const renderStep6 = () => (
    <div className='py-16 container grid grid-cols-12 pt-20'>
      <div className='col-span-12 rounded-2xl border border-gray-200 p-4 sm:p-10 md:col-span-8 md:col-start-3 xxl:col-span-6 xxl:col-start-4'>
        <h4 className='text-xl sm:text-2xl font-semibold text-gray-900 flex items-center justify-center gap-2'>
          <i className='ph-bold ph-caret-left'></i> Set up your account
        </h4>
        <div className='flex flex-col gap-4 pt-6 sm:gap-6 lg:pt-10'>
          <div>
            <p className='pb-4 text-gray-900'>First name *</p>
            <Controller
              name='account.firstName'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  className={`w-full rounded-xl bg-gray-100 p-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                    errors.account?.firstName ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.account?.firstName && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.account.firstName.message}
              </p>
            )}
          </div>
          <div>
            <p className='pb-4 text-gray-900'>Last name *</p>
            <Controller
              name='account.lastName'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  className={`w-full rounded-xl bg-gray-100 p-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                    errors.account?.lastName ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.account?.lastName && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.account.lastName.message}
              </p>
            )}
          </div>
          <div>
            <p className='pb-4 text-gray-900'>Enter your home suburb *</p>
            <Controller
              name='account.suburb'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  className={`w-full rounded-xl bg-gray-100 p-3 outline-none focus:ring-2 focus:ring-[#1B3B86]/20 focus:bg-white border border-transparent focus:border-[#1B3B86] ${
                    errors.account?.suburb ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.account?.suburb && (
              <p className='text-red-500 text-sm mt-2'>
                {errors.account.suburb.message}
              </p>
            )}
          </div>
          <div>
            <p className='pb-4 text-gray-900'>
              What is your main goal on Bollo? *
            </p>
            <div className='flex w-full items-center justify-start font-medium gap-2 max-sm:flex-wrap'>
              <button
                type='button'
                onClick={() => setValue('account.goal', 'post')}
                className={`rounded-lg transition-colors ${
                  watchedValues.account.goal === 'post'
                    ? 'bg-[#1B3B86] text-white'
                    : 'bg-gray-100 hover:bg-[#1B3B86] hover:text-white'
                } px-4 py-3 sm:w-full sm:px-10 lg:px-15`}
              >
                <i className='ph-bold ph-notepad block text-xl leading-none'></i>
                <span className='block pt-2'>Post Jobs</span>
              </button>
              <button
                type='button'
                onClick={() => setValue('account.goal', 'earn')}
                className={`rounded-lg transition-colors ${
                  watchedValues.account.goal === 'earn'
                    ? 'bg-[#1B3B86] text-white'
                    : 'bg-gray-100 hover:bg-[#1B3B86] hover:text-white'
                } px-4 py-3 duration-500 sm:w-full sm:px-10 lg:px-15`}
              >
                <i className='ph-bold ph-money block text-xl leading-none'></i>
                <span className='block pt-2'>Earn Money</span>
              </button>
            </div>
          </div>
          <div className='flex items-center justify-start gap-3'>
            <Controller
              name='account.marketingConsent'
              control={control}
              render={({ field }) => {
                const { value, ...rest } = field
                return (
                  <input
                    {...rest}
                    type='checkbox'
                    checked={value}
                    className='accent-[#1B3B86]'
                  />
                )
              }}
            />
            <p className='text-sm text-gray-600'>
              I agree to receive product updates, marketing materials and
              special offers via email, SMS, and push notifications
            </p>
          </div>
          <div className='flex items-center justify-start gap-3'>
            <Controller
              name='account.termsAccepted'
              control={control}
              render={({ field }) => {
                const { value, ...rest } = field
                return (
                  <input
                    {...rest}
                    type='checkbox'
                    checked={value}
                    className='accent-[#1B3B86]'
                  />
                )
              }}
            />
            <p className='text-sm text-gray-600'>
              I agree to the Bollo
              <Link
                href='/terms-conditions'
                className='text-[#1B3B86] hover:text-[#E31C79] transition-colors'
              >
                {' '}
                Terms & Conditions
              </Link>
              , Community Guidelines, and
              <Link
                href='/privacy-policy'
                className='text-[#1B3B86] hover:text-[#E31C79] transition-colors'
              >
                {' '}
                Privacy Policy
              </Link>
            </p>
          </div>
          {errors.account?.termsAccepted && (
            <p className='text-red-500 text-sm'>
              {errors.account.termsAccepted.message}
            </p>
          )}
        </div>
        <div className='w-full pt-10'>
          <button
            type='button'
            onClick={handleSubmit(onSubmit)}
            className='relative flex w-full items-center justify-center overflow-hidden rounded-full bg-[#1B3B86] px-4 py-2 text-lg font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-[#E31C79] after:duration-700 hover:text-white hover:after:w-[calc(100%+2px)] lg:px-8 lg:py-3'
          >
            <span className='relative z-10'>Create Account</span>
          </button>
        </div>
      </div>
    </div>
  )

  const onSubmit = (data: TaskFormData) => {
    console.log('Final form submission:', data)
    // Handle form submission
  }

  return (
    <section>
      <div className='flex items-center justify-between pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Link href='/'>
          <img
            src='/assets/images/logo.png'
            alt='Bollo logo'
            className='w-auto h-14'
          />
        </Link>
        <Link
          href='/'
          className='flex items-center justify-start gap-2 text-lg font-medium duration-500 hover:text-[#E31C79]'
        >
          Cancel <i className='ph-bold ph-x !leading-none'></i>
        </Link>
      </div>
      {step < 5 ? (
        <div className='py-16 container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-6'>
          {renderStepIndicator()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      ) : (
        <>
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
        </>
      )}
    </section>
  )
}

export default TaskPostingForm
