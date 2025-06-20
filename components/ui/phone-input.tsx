import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { IconAlertCircle, IconCheck, IconPhone } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import 'react-phone-number-input/style.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-[#1B3B86] text-white hover:bg-[#1B3B86]/90',
      outline: 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-600',
    }

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
    }

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B86] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// Popover Components
interface PopoverProps {
  children: React.ReactNode
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  return <div className='relative'>{children}</div>
}

interface PopoverTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  return <>{children}</>
}

interface PopoverContentProps {
  className?: string
  children: React.ReactNode
}

const PopoverContent: React.FC<PopoverContentProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'absolute top-full left-0 z-50 mt-1 min-w-[300px] rounded-md border border-gray-200 bg-white shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

// Command Components
interface CommandProps {
  children: React.ReactNode
}

const Command: React.FC<CommandProps> = ({ children }) => {
  return <div className='flex flex-col'>{children}</div>
}

interface CommandListProps {
  children: React.ReactNode
}

const CommandList: React.FC<CommandListProps> = ({ children }) => {
  return <div>{children}</div>
}

interface CommandInputProps {
  placeholder?: string
  value: string
  onValueChange: (value: string) => void
}

const CommandInput: React.FC<CommandInputProps> = ({
  placeholder,
  value,
  onValueChange,
}) => {
  return (
    <div className='border-b border-gray-200 px-3 py-2'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className='w-full text-sm outline-none placeholder:text-gray-400'
        autoFocus
      />
    </div>
  )
}

const CommandEmpty: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='py-6 text-center text-sm text-gray-500'>{children}</div>
  )
}

interface CommandGroupProps {
  children: React.ReactNode
}

const CommandGroup: React.FC<CommandGroupProps> = ({ children }) => {
  return <div className='p-1'>{children}</div>
}

interface CommandItemProps {
  className?: string
  children: React.ReactNode
  onSelect?: () => void
}

const CommandItem: React.FC<CommandItemProps> = ({
  className,
  children,
  onSelect,
}) => {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  )
}

// Scroll Area Component
interface ScrollAreaProps {
  className?: string
  children: React.ReactNode
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ className, children }) => {
  return <div className={cn('overflow-auto', className)}>{children}</div>
}

// Main Phone Input Types
type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: string | undefined) => void
    value?: string
    error?: string
    label?: string
    required?: boolean
  }

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    (
      { className, onChange, error, label, required, id, value, ...props },
      ref
    ) => {
      const [isValid, setIsValid] = React.useState<boolean | null>(null)

      // Validate phone number
      const validatePhone = React.useCallback(
        (phoneValue: string | undefined) => {
          if (!phoneValue) {
            setIsValid(null)
            return
          }
          try {
            const valid = isValidPhoneNumber(phoneValue)
            setIsValid(valid)
          } catch {
            setIsValid(false)
          }
        },
        []
      )

      React.useEffect(() => {
        validatePhone(value)
      }, [value, validatePhone])

      return (
        <div className='flex flex-col gap-2'>
          {/* Label */}
          {label && (
            <label htmlFor={id} className='text-gray-900 font-medium text-sm'>
              <div className='flex items-center gap-2'>
                <IconPhone size={16} className='text-gray-500' />
                {label}
                {required && <span className='text-[#E31C79]'>*</span>}
              </div>
            </label>
          )}

          {/* Phone Input Container */}
          <div className='relative'>
            <RPNInput.default
              ref={ref}
              className={cn('flex', className)}
              flagComponent={FlagComponent}
              countrySelectComponent={CountrySelect}
              inputComponent={InputComponent}
              defaultCountry='CM'
              value={value as RPNInput.Value}
              onChange={(phoneValue) => {
                validatePhone(phoneValue)
                onChange?.(phoneValue || undefined)
              }}
              {...props}
            />

            {/* Validation Icon */}
            {value && (
              <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                {isValid === true && (
                  <IconCheck size={18} className='text-green-500' />
                )}
                {isValid === false && (
                  <IconAlertCircle size={18} className='text-red-500' />
                )}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p className='text-red-500 text-sm flex items-center gap-1'>
              <IconAlertCircle size={16} />
              {error}
            </p>
          )}

          {/* Validation Help Text */}
          {value && isValid === false && !error && (
            <p className='text-red-500 text-sm flex items-center gap-1'>
              <IconAlertCircle size={16} />
              Please enter a valid phone number
            </p>
          )}
        </div>
      )
    }
  )
PhoneInput.displayName = 'PhoneInput'

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    className={cn(
      'flex h-11 w-full rounded-r-lg border-y border-r border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B86]/20 focus-visible:border-[#1B3B86] disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
))
InputComponent.displayName = 'InputComponent'

type CountrySelectOption = { label: string; value: RPNInput.Country }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: CountrySelectOption[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country)
      setIsOpen(false)
      setSearch('')
    },
    [onChange]
  )

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [options, search])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant={'outline'}
          className={cn(
            'flex gap-1 rounded-r-none rounded-l-lg px-3 h-11 border-r-0 focus-visible:ring-[#1B3B86]/20 focus-visible:border-[#1B3B86]'
          )}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cn(
              '-mr-2 h-4 w-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40'
            onClick={() => {
              setIsOpen(false)
              setSearch('')
            }}
          />

          {/* Dropdown Content */}
          <PopoverContent className='w-[300px] p-0'>
            <Command>
              <CommandList>
                <ScrollArea className='h-72'>
                  <CommandInput
                    placeholder='Search country...'
                    value={search}
                    onValueChange={setSearch}
                  />
                  {filteredOptions.length === 0 && search.trim() ? (
                    <CommandEmpty>No country found.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {filteredOptions
                        .filter((x) => x.value)
                        .map((option) => (
                          <CommandItem
                            className='gap-2'
                            key={option.value}
                            onSelect={() => handleSelect(option.value)}
                          >
                            <FlagComponent
                              country={option.value}
                              countryName={option.label}
                            />
                            <span className='flex-1 text-sm'>
                              {option.label}
                            </span>
                            {option.value && (
                              <span className='text-gray-500 text-sm'>
                                {`+${RPNInput.getCountryCallingCode(
                                  option.value
                                )}`}
                              </span>
                            )}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4 text-[#1B3B86]',
                                option.value === value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )}
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className='bg-gray-100 flex h-4 w-6 overflow-hidden rounded-sm border border-gray-200'>
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
FlagComponent.displayName = 'FlagComponent'

export { PhoneInput }
