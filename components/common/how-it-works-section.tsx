'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface JourneyStep {
  number: string
  title: string
  goal: string
  description: string
  icon: string
  bgColor: string
  borderColor: string
}

interface Journey {
  title: string
  subtitle: string
  color: string
  steps: JourneyStep[]
}

const AnimatedHowItWorksSection = () => {
  const [activeJourney, setActiveJourney] = useState<'client' | 'provider'>(
    'client'
  )
  const [currentStep, setCurrentStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Client Journey Data
  const clientJourney: Journey = {
    title: 'Client Journey',
    subtitle: 'How clients find and book services',
    color: '#E31C79',
    steps: [
      {
        number: '01',
        title: 'Provider Search',
        goal: 'Find qualified providers',
        description:
          'Search by service, review credentials, and compare ratings to find the perfect match.',
        icon: 'ph-magnifying-glass',
        bgColor: 'bg-[#E31C79]/5',
        borderColor: 'border-[#E31C79]/20',
      },
      {
        number: '02',
        title: 'Agreement Setup',
        goal: 'Define service terms',
        description:
          'Review contract details, approve terms, and secure payment in escrow for protection.',
        icon: 'ph-file-text',
        bgColor: 'bg-[#1B3B86]/5',
        borderColor: 'border-[#1B3B86]/20',
      },
      {
        number: '03',
        title: 'Service Monitoring',
        goal: 'Track progress',
        description:
          'Coordinate access, monitor updates, and communicate throughout the service delivery.',
        icon: 'ph-chart-line',
        bgColor: 'bg-[#E31C79]/5',
        borderColor: 'border-[#E31C79]/20',
      },
      {
        number: '04',
        title: 'Verification & Review',
        goal: 'Confirm quality completion',
        description:
          'Verify work completion, release payment, and provide feedback for future clients.',
        icon: 'ph-check-circle',
        bgColor: 'bg-[#1B3B86]/5',
        borderColor: 'border-[#1B3B86]/20',
      },
    ],
  }

  // Provider Journey Data
  const providerJourney: Journey = {
    title: 'Provider Journey',
    subtitle: 'How providers offer and deliver services',
    color: '#1B3B86',
    steps: [
      {
        number: '01',
        title: 'Profile Creation',
        goal: 'Create profile and verify credentials',
        description:
          'Register your account, upload certifications, and set competitive pricing.',
        icon: 'ph-user-circle',
        bgColor: 'bg-[#1B3B86]/5',
        borderColor: 'border-[#1B3B86]/20',
      },
      {
        number: '02',
        title: 'Contract Creation',
        goal: 'Secure job with clear terms',
        description:
          'Define deliverables, set timeline, and create smart contract for transparency.',
        icon: 'ph-contract',
        bgColor: 'bg-[#E31C79]/5',
        borderColor: 'border-[#E31C79]/20',
      },
      {
        number: '03',
        title: 'Service Delivery',
        goal: 'Complete work and document',
        description:
          'Perform service professionally, document completion, and request verification.',
        icon: 'ph-wrench',
        bgColor: 'bg-[#1B3B86]/5',
        borderColor: 'border-[#1B3B86]/20',
      },
      {
        number: '04',
        title: 'Payment & Review',
        goal: 'Receive payment and build reputation',
        description:
          'Receive automatic payment, request client review, and build your reputation.',
        icon: 'ph-currency-dollar',
        bgColor: 'bg-[#E31C79]/5',
        borderColor: 'border-[#E31C79]/20',
      },
    ],
  }

  const currentJourney =
    activeJourney === 'client' ? clientJourney : providerJourney

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= currentJourney.steps.length - 1) {
          // Switch journey and reset step
          setActiveJourney((current) =>
            current === 'client' ? 'provider' : 'client'
          )
          return 0
        }
        return prev + 1
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentJourney.steps.length])

  // Reset step when journey changes
  useEffect(() => {
    setCurrentStep(0)
  }, [activeJourney])

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setIsAutoPlaying(false)
  }

  const handleJourneySwitch = (journey: 'client' | 'provider') => {
    setActiveJourney(journey)
    setIsAutoPlaying(false)
  }

  return (
    <section className='container mb-12 stp-30 sbp-30'>
      {/* Header */}
      <div className='flex w-full flex-col items-center justify-center text-center mb-12'>
        <motion.h5
          className='pb-4 font-bold text-[#E31C79]'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Working Process
        </motion.h5>
        <motion.h2
          className='heading-2 font-bold text-gray-900 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          How it <span className='text-[#1B3B86] underline'>Works</span>
        </motion.h2>

        {/* Journey Toggle */}
        <motion.div
          className='flex items-center justify-center mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className='relative bg-gray-100 rounded-full p-1'>
            <motion.div
              className='absolute top-1 bottom-1 bg-white rounded-full shadow-md'
              animate={{
                left: activeJourney === 'client' ? '4px' : 'calc(50% - 4px)',
                width: 'calc(50% - 4px)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <div className='relative flex'>
              <button
                onClick={() => handleJourneySwitch('client')}
                className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 ${
                  activeJourney === 'client'
                    ? 'text-[#E31C79]'
                    : 'text-gray-600'
                }`}
              >
                <i className='ph ph-user text-lg'></i>
                Client Journey
              </button>
              <button
                onClick={() => handleJourneySwitch('provider')}
                className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 ${
                  activeJourney === 'provider'
                    ? 'text-[#1B3B86]'
                    : 'text-gray-600'
                }`}
              >
                <i className='ph ph-wrench text-lg'></i>
                Provider Journey
              </button>
            </div>
          </div>
        </motion.div>

        {/* Auto-play controls */}
        <motion.div
          className='flex items-center gap-4 mb-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isAutoPlaying
                ? 'bg-[#E31C79] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <i
              className={`ph ${isAutoPlaying ? 'ph-pause' : 'ph-play'} text-lg`}
            ></i>
            {isAutoPlaying ? 'Pause' : 'Play'} Animation
          </button>
          <div className='text-sm text-gray-600'>
            Step {currentStep + 1} of {currentJourney.steps.length}
          </div>
        </motion.div>
      </div>

      {/* Journey Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeJourney}
          initial={{ opacity: 0, x: activeJourney === 'client' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeJourney === 'client' ? 50 : -50 }}
          transition={{ duration: 0.5 }}
        >
          {/* Journey Header */}
          <div className='text-center mb-12'>
            <h3
              className='text-2xl font-bold mb-2'
              style={{ color: currentJourney.color }}
            >
              {currentJourney.title}
            </h3>
            <p className='text-gray-600 font-medium'>
              {currentJourney.subtitle}
            </p>
          </div>

          {/* Steps Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
            {currentJourney.steps.map((step, index) => (
              <motion.div
                key={`${activeJourney}-${index}`}
                className={`relative cursor-pointer transition-all duration-300 ${
                  currentStep === index ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => handleStepClick(index)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Connecting Line */}
                {index < currentJourney.steps.length - 1 && (
                  <motion.div
                    className='hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-gray-300 z-0'
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: currentStep > index ? 1 : 0,
                      backgroundColor:
                        currentStep > index ? currentJourney.color : '#d1d5db',
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                )}

                <div
                  className={`relative z-10 ${step.bgColor} ${step.borderColor} border rounded-xl p-6 h-full`}
                >
                  {/* Step Number & Icon */}
                  <div className='flex items-center justify-between mb-4'>
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        currentStep === index ? 'scale-110' : ''
                      }`}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? '#E31C79' : '#1B3B86',
                      }}
                      animate={{
                        scale: currentStep === index ? 1.1 : 1,
                        boxShadow:
                          currentStep === index
                            ? '0 0 20px rgba(227, 28, 121, 0.3)'
                            : '0 0 0px rgba(227, 28, 121, 0)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.number}
                    </motion.div>
                    <div className='text-2xl text-gray-600'>
                      <i className={`ph ${step.icon} text-2xl`}></i>
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className='text-lg font-bold text-[#1B3B86] mb-2'>
                    {step.title}
                  </h4>
                  <p className='text-sm text-gray-600 font-medium mb-3'>
                    Goal: {step.goal}
                  </p>
                  <p className='text-gray-700'>{step.description}</p>

                  {/* Active Step Indicator */}
                  {currentStep === index && (
                    <motion.div
                      className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-[#E31C79] to-[#1B3B86] flex items-center justify-center'
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <div className='w-2 h-2 rounded-full bg-white animate-pulse'></div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className='flex justify-center'>
            <div className='flex items-center space-x-3'>
              {currentJourney.steps.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentStep === index ? 'scale-125' : 'hover:scale-110'
                  }`}
                  style={{
                    backgroundColor:
                      currentStep >= index ? currentJourney.color : '#d1d5db',
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Current Step Detail */}
          <motion.div
            key={`detail-${currentStep}`}
            className='mt-12 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='max-w-2xl mx-auto'>
              <div className='flex items-center justify-center mb-4'>
                <div className='text-4xl mr-3 text-gray-600'>
                  <i
                    className={`ph ${currentJourney.steps[currentStep].icon} text-4xl`}
                  ></i>
                </div>
                <h4 className='text-xl font-bold text-[#1B3B86]'>
                  {currentJourney.steps[currentStep].title}
                </h4>
              </div>
              <p className='text-gray-700 text-lg leading-relaxed'>
                {currentJourney.steps[currentStep].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        className='text-center mt-16'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <motion.button
            className='px-8 py-4 bg-[#E31C79] text-white font-semibold rounded-xl hover:bg-[#E31C79]/90 transition-colors shadow-lg flex items-center justify-center gap-2'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className='ph ph-user text-lg'></i>
            Get Started as Client
          </motion.button>
          <motion.button
            className='px-8 py-4 bg-[#1B3B86] text-white font-semibold rounded-xl hover:bg-[#1B3B86]/90 transition-colors shadow-lg flex items-center justify-center gap-2'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className='ph ph-wrench text-lg'></i>
            Join as Provider
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

export default AnimatedHowItWorksSection
