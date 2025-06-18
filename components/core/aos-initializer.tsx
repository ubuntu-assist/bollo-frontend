'use client'

import { useEffect } from 'react'
import { initAos } from '@/utils/init-aos'

export default function AosInitializer() {
  useEffect(() => {
    initAos()
  }, [])

  return null
}
