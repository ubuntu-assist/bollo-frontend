'use client'

import React, { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

// Dynamically import react-cropper with SSR disabled
const Cropper = dynamic(() => import('react-cropper'), { ssr: false })

// Import react-cropper CSS
import 'cropperjs/dist/cropper.css'

interface ImageEditorModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onSave: (croppedImage: string) => void
}

const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onSave,
}) => {
  const [cropper, setCropper] = useState<Cropper | null>(null)
  const [zoom, setZoom] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleZoomIn = () => {
    if (cropper && zoom < 3) {
      const newZoom = zoom + 0.1
      cropper.zoomTo(newZoom)
      setZoom(newZoom)
    }
  }

  const handleZoomOut = () => {
    if (cropper && zoom > -3) {
      const newZoom = zoom - 0.1
      cropper.zoomTo(newZoom)
      setZoom(newZoom)
    }
  }

  const handleRotate = () => {
    if (cropper) {
      const newRotation = rotation + 90
      cropper.rotateTo(newRotation)
      setRotation(newRotation)
    }
  }

  const handleSave = useCallback(() => {
    if (cropper && isImageLoaded) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 400,
        height: 400,
      })
      if (croppedCanvas) {
        const croppedImage = croppedCanvas.toDataURL('image/png')
        onSave(croppedImage)
        onClose()
      } else {
        setError(
          'Failed to crop image. Please adjust the crop area and try again.'
        )
      }
    } else {
      setError('Image is not loaded or cropper is not initialized.')
    }
  }, [cropper, isImageLoaded, onSave, onClose])

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true)
    setError(null)
  }, [])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-full max-w-2xl rounded-lg bg-white p-6'>
        {/* Header */}
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-lg font-semibold'>Edit profile picture</h3>
          <button
            onClick={onClose}
            className='rounded-full p-1 hover:bg-gray-100'
            aria-label='Close'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Cropper */}
        <div className='relative h-96 overflow-hidden rounded-lg'>
          {imageUrl ? (
            <Cropper
              src={imageUrl}
              style={{ height: '100%', width: '100%' }}
              aspectRatio={1}
              guides={true}
              viewMode={1}
              dragMode='move'
              scalable={false}
              cropBoxResizable={true}
              minCropBoxWidth={50}
              minCropBoxHeight={50}
              ready={handleImageLoad}
              onInitialized={(instance) => setCropper(instance)}
            />
          ) : (
            <div className='flex h-full items-center justify-center text-red-500'>
              No image provided
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <div className='mt-2 text-sm text-red-500'>{error}</div>}

        {/* Controls */}
        <div className='mt-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button
              onClick={handleZoomOut}
              className='rounded-full p-2 hover:bg-gray-100 disabled:opacity-50'
              title='Zoom out'
              aria-label='Zoom out'
              disabled={!isImageLoaded}
            >
              <ZoomOut className='h-5 w-5' />
            </button>
            <button
              onClick={handleZoomIn}
              className='rounded-full p-2 hover:bg-gray-100 disabled:opacity-50'
              title='Zoom in'
              aria-label='Zoom in'
              disabled={!isImageLoaded}
            >
              <ZoomIn className='h-5 w-5' />
            </button>
            <button
              onClick={handleRotate}
              className='rounded-full p-2 hover:bg-gray-100 disabled:opacity-50'
              title='Rotate'
              aria-label='Rotate'
              disabled={!isImageLoaded}
            >
              <RotateCcw className='h-5 w-5' />
            </button>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className='rounded-lg bg-[#1B3B86] px-4 py-2 text-sm font-medium text-white hover:bg-[#E31C79] disabled:opacity-50'
              disabled={!isImageLoaded}
            >
              Set new profile picture
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageEditorModal
