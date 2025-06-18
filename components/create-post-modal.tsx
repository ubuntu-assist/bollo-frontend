import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

interface Language {
  value: string
  label: string
}

interface Category {
  value: string
  label: string
}

interface FormData {
  title: string
  content: string
  language: string
  category: string
  tags: string
}

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    title: string
    content: string
    language: string
    category: string
    tags: string[]
  }) => void
}

const hoverScale = 'transition-transform duration-300 hover:scale-105'
const fadeIn = 'animate-fadeIn opacity-0'

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    language: '',
    category: '',
    tags: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Mock languages (consistent with CommunityPage, excluding 'all')
  const languages: Language[] = [
    { value: 'duala', label: 'Duala' },
    { value: 'ewondo', label: 'Ewondo' },
    { value: 'fulfulde', label: 'Fulfulde' },
    { value: 'bassa', label: 'Bassa' },
    { value: 'mungaka', label: 'Mungaka' },
  ]

  // Mock categories
  const categories: Category[] = [
    { value: 'grammar', label: 'Grammar' },
    { value: 'resources', label: 'Resources' },
    { value: 'pronunciation', label: 'Pronunciation' },
    { value: 'culture', label: 'Culture' },
    { value: 'vocabulary', label: 'Vocabulary' },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    } else if (formData.content.length > 5000) {
      newErrors.content = 'Content cannot exceed 5000 characters'
    }

    if (!formData.language) {
      newErrors.language = 'Please select a language'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)
    if (tagsArray.length > 5) {
      newErrors.tags = 'Cannot add more than 5 tags'
    } else if (tagsArray.some((tag) => tag.length > 20)) {
      newErrors.tags = 'Each tag cannot exceed 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)
      onSubmit({
        title: formData.title,
        content: formData.content,
        language: formData.language,
        category: formData.category,
        tags: tagsArray,
      })
      setFormData({
        title: '',
        content: '',
        language: '',
        category: '',
        tags: '',
      })
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
      <DialogContent className='sm:max-w-[600px] bg-white shadow-md rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='text-[#333333]'>Create New Post</DialogTitle>
          <DialogDescription className='text-gray-600'>
            Share your thoughts, questions, or resources with the Langua
            community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            {/* Title */}
            <div className={`grid gap-2 ${fadeIn}`}>
              <Label htmlFor='title' className='text-[#333333]'>
                Title
              </Label>
              <Input
                id='title'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Enter post title'
                className='rounded-md border-gray-200 focus:ring-[#00BFA6] focus:border-[#00BFA6] text-[#333333]'
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='h-4 w-4 text-[#FFA726]' />
                  {errors.title}
                </p>
              )}
            </div>
            {/* Content */}
            <div
              className={`grid gap-2 ${fadeIn}`}
              style={{ animationDelay: '0.1s' }}
            >
              <Label htmlFor='content' className='text-[#333333]'>
                Content
              </Label>
              <Textarea
                id='content'
                name='content'
                value={formData.content}
                onChange={handleInputChange}
                placeholder='Write your post content...'
                rows={6}
                className='rounded-md border-gray-200 focus:ring-[#00BFA6] focus:border-[#00BFA6] text-[#333333]'
                aria-invalid={!!errors.content}
              />
              {errors.content && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='h-4 w-4 text-[#FFA726]' />
                  {errors.content}
                </p>
              )}
            </div>
            {/* Language */}
            <div
              className={`grid gap-2 ${fadeIn}`}
              style={{ animationDelay: '0.2s' }}
            >
              <Label htmlFor='language' className='text-[#333333]'>
                Language
              </Label>
              <Select
                name='language'
                value={formData.language}
                onValueChange={handleSelectChange('language')}
              >
                <SelectTrigger
                  className='rounded-md border-gray-200 focus:ring-[#00BFA6] focus:border-[#00BFA6] text-[#333333]'
                  aria-invalid={!!errors.language}
                >
                  <SelectValue placeholder='Select language' />
                </SelectTrigger>
                <SelectContent className='bg-white shadow-md rounded-md'>
                  {languages.map((language) => (
                    <SelectItem
                      key={language.value}
                      value={language.value}
                      className='text-[#333333] hover:bg-[#F5F5F5]'
                    >
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.language && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='h-4 w-4 text-[#FFA726]' />
                  {errors.language}
                </p>
              )}
            </div>
            {/* Category */}
            <div
              className={`grid gap-2 ${fadeIn}`}
              style={{ animationDelay: '0.3s' }}
            >
              <Label htmlFor='category' className='text-[#333333]'>
                Category
              </Label>
              <Select
                name='category'
                value={formData.category}
                onValueChange={handleSelectChange('category')}
              >
                <SelectTrigger
                  className='rounded-md border-gray-200 focus:ring-[#00BFA6] focus:border-[#00BFA6] text-[#333333]'
                  aria-invalid={!!errors.category}
                >
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent className='bg-white shadow-md rounded-md'>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className='text-[#333333] hover:bg-[#F5F5F5]'
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='h-4 w-4 text-[#FFA726]' />
                  {errors.category}
                </p>
              )}
            </div>
            {/* Tags */}
            <div
              className={`grid gap-2 ${fadeIn}`}
              style={{ animationDelay: '0.4s' }}
            >
              <Label htmlFor='tags' className='text-[#333333]'>
                Tags
              </Label>
              <Input
                id='tags'
                name='tags'
                value={formData.tags}
                onChange={handleInputChange}
                placeholder='Enter tags (comma-separated, e.g., greetings, culture)'
                className='rounded-md border-gray-200 focus:ring-[#00BFA6] focus:border-[#00BFA6] text-[#333333]'
                aria-invalid={!!errors.tags}
              />
              <p className='text-sm text-gray-600'>
                Add up to 5 tags to help others find your post.
              </p>
              {errors.tags && (
                <p className='text-sm text-red-500 flex items-center gap-1'>
                  <AlertCircle className='h-4 w-4 text-[#FFA726]' />
                  {errors.tags}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className={`border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6]/10 rounded-full ${hoverScale} cursor-pointer`}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className={`bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white rounded-full ${hoverScale} cursor-pointer`}
            >
              Create Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePostModal
