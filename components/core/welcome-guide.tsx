'use client'

import { useState, useEffect } from 'react'
import Joyride, {
  Step,
  CallBackProps,
  STATUS,
  EVENTS,
  ACTIONS,
  LIFECYCLE,
} from 'react-joyride'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  X,
  CheckCircle,
  Play,
  SkipForward,
} from 'lucide-react'

interface WelcomeGuideProps {
  isNewUser?: boolean
  onComplete?: () => void
}

// Custom Tooltip Component pour matcher votre design
const CustomTooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
  isLastStep,
}: any) => {
  return (
    <motion.div
      {...tooltipProps}
      className='bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm'
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-[#1B3B86] rounded-full flex items-center justify-center'>
            <Sparkles className='w-4 h-4 text-white' />
          </div>
          <div>
            <h3 className='font-semibold text-gray-900'>{step.title}</h3>
            <p className='text-xs text-gray-500'>
              Step {index + 1} of {step.data?.totalSteps}
            </p>
          </div>
        </div>
        <button
          {...closeProps}
          className='text-gray-400 hover:text-gray-600 transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>

      {/* Content */}
      <div className='mb-6'>
        <p className='text-gray-700 leading-relaxed'>{step.content}</p>

        {step.data?.tip && (
          <div className='mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-[#1B3B86]'>
            <p className='text-sm text-blue-800'>
              💡 <strong>Pro tip:</strong> {step.data.tip}
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className='mb-4'>
        <div className='flex justify-between text-xs text-gray-500 mb-1'>
          <span>Progress</span>
          <span>
            {Math.round(((index + 1) / step.data?.totalSteps) * 100)}%
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <motion.div
            className='bg-[#1B3B86] h-2 rounded-full'
            initial={{ width: 0 }}
            animate={{
              width: `${((index + 1) / step.data?.totalSteps) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between'>
        <div className='flex space-x-2'>
          {index > 0 && (
            <button
              {...backProps}
              className='px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors'
            >
              Back
            </button>
          )}
          <button
            {...skipProps}
            className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-1'
          >
            <SkipForward className='w-3 h-3' />
            <span>Skip Tour</span>
          </button>
        </div>

        <button
          {...primaryProps}
          className='px-4 py-2 bg-[#1B3B86] text-white rounded-lg hover:bg-[#E31C79] transition-colors flex items-center space-x-2 text-sm font-medium'
        >
          {isLastStep ? (
            <>
              <CheckCircle className='w-4 h-4' />
              <span>Get Started!</span>
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight className='w-4 h-4' />
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}

// Welcome Modal avant de commencer le tour
const WelcomeModal = ({
  onStart,
  onSkip,
}: {
  onStart: () => void
  onSkip: () => void
}) => {
  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

      <motion.div
        className='relative bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4'
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className='text-center'>
          {/* Icon */}
          <div className='w-16 h-16 bg-gradient-to-br from-[#1B3B86] to-[#E31C79] rounded-full flex items-center justify-center mx-auto mb-4'>
            <Sparkles className='w-8 h-8 text-white' />
          </div>

          {/* Content */}
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Welcome to Bollo! 🎉
          </h2>
          <p className='text-gray-600 mb-6 leading-relaxed'>
            Let's take a quick tour to help you get started. We'll show you the
            key features and how to make the most of your experience.
          </p>

          {/* Benefits */}
          <div className='text-left space-y-2 mb-6'>
            <div className='flex items-center space-x-2 text-sm'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              <span>Learn to post your first task</span>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              <span>Discover the command palette</span>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              <span>Find skilled workers easily</span>
            </div>
          </div>

          {/* Actions */}
          <div className='flex space-x-3'>
            <button
              onClick={onSkip}
              className='flex-1 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors'
            >
              Skip for now
            </button>
            <button
              onClick={onStart}
              className='flex-1 px-4 py-3 bg-[#1B3B86] text-white rounded-lg hover:bg-[#E31C79] transition-colors flex items-center justify-center space-x-2 font-medium'
            >
              <Play className='w-4 h-4' />
              <span>Start Tour</span>
            </button>
          </div>

          <p className='text-xs text-gray-400 mt-4'>
            Takes about 2 minutes • You can skip anytime
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const WelcomeGuide: React.FC<WelcomeGuideProps> = ({
  isNewUser = false,
  onComplete,
}) => {
  const [showWelcome, setShowWelcome] = useState(false)
  const [runTour, setRunTour] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  // Étapes du tour guidé
  const steps: Step[] = [
    {
      target: '.logo', // Votre logo dans le header
      content:
        'Welcome to Bollo! This is your home base for all task-related activities.',
      title: 'Welcome to Bollo',
      placement: 'bottom',
      disableBeacon: true,
      data: { totalSteps: 5, tip: 'Click the logo anytime to return home' },
    },
    {
      target: '.post-task-button', // Le bouton "Post a Task"
      content:
        'Ready to get something done? Click here to post your first task and connect with skilled workers.',
      title: 'Post Your First Task',
      placement: 'bottom',
      data: {
        totalSteps: 5,
        tip: 'Be specific in your task description for better results',
      },
    },
    {
      target: '.become-tasker-button', // Le bouton "Become a Tasker"
      content:
        'Want to earn money? Become a Tasker and offer your skills to others.',
      title: 'Earn as a Tasker',
      placement: 'bottom',
      data: {
        totalSteps: 5,
        tip: 'Set competitive rates and showcase your expertise',
      },
    },
    {
      target: '.services-nav', // Navigation Services
      content:
        'Browse all available services and see what others are offering.',
      title: 'Explore Services',
      placement: 'bottom',
      data: { totalSteps: 5 },
    },
    {
      target: '.workers-nav', // Navigation Workers
      content:
        'Find skilled workers for your projects. Check their profiles, ratings, and reviews.',
      title: 'Find Workers',
      placement: 'bottom',
      data: {
        totalSteps: 5,
        tip: 'Look for workers with good ratings and relevant experience',
      },
    },
  ]

  // Détection du nouvel utilisateur
  useEffect(() => {
    // Vérifier si c'est un nouvel utilisateur (localStorage, API, etc.)
    const hasSeenTour = localStorage.getItem('bollo-tour-completed')

    if (isNewUser && !hasSeenTour) {
      setShowWelcome(true)
    }
  }, [isNewUser])

  // Gestion des callbacks du tour
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action, lifecycle } = data

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Tour terminé ou skippé
      setRunTour(false)
      localStorage.setItem('bollo-tour-completed', 'true')
      onComplete?.()
    } else if (type === EVENTS.STEP_AFTER) {
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    }
  }

  const startTour = () => {
    setShowWelcome(false)
    setRunTour(true)
    setStepIndex(0)
  }

  const skipTour = () => {
    setShowWelcome(false)
    localStorage.setItem('bollo-tour-completed', 'true')
    onComplete?.()
  }

  // API pour déclencher manuellement le tour
  const restartTour = () => {
    setRunTour(true)
    setStepIndex(0)
  }

  // Exposer la fonction pour un usage externe
  useEffect(() => {
    // @ts-ignore - Ajouter à window pour usage global
    window.startBolloTour = restartTour
  }, [])

  return (
    <>
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && <WelcomeModal onStart={startTour} onSkip={skipTour} />}
      </AnimatePresence>

      {/* Joyride Tour */}
      <Joyride
        steps={steps}
        run={runTour}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous={true}
        showProgress={false}
        showSkipButton={true}
        disableOverlayClose={true}
        disableCloseOnEsc={false}
        tooltipComponent={CustomTooltip}
        styles={{
          options: {
            primaryColor: '#1B3B86',
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            textColor: '#333',
            width: undefined,
            zIndex: 1000,
          },
          overlay: {
            border: '6px solid #1B3B86',
            borderRadius: '12px',
          },
          spotlight: {
            border: '6px solid #1B3B86',
            borderRadius: '12px',
          },
        }}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Get Started!',
          next: 'Next',
          skip: 'Skip Tour',
        }}
      />
    </>
  )
}

export default WelcomeGuide

// Hook pour utiliser le guide
export const useWelcomeGuide = () => {
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    // Logique pour déterminer si c'est un nouvel utilisateur
    const hasSeenTour = localStorage.getItem('bollo-tour-completed')
    const userRegistrationDate = localStorage.getItem('user-registration-date')

    // Exemple de logique
    if (!hasSeenTour) {
      setIsNewUser(true)
    }
  }, [])

  const resetTour = () => {
    localStorage.removeItem('bollo-tour-completed')
    setIsNewUser(true)
  }

  return {
    isNewUser,
    resetTour,
  }
}
