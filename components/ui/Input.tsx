import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full bg-[#1A1A20] border-2 rounded-lg px-4 py-2.5 text-white',
            'placeholder:text-gray-500',
            'focus:outline-none focus:border-purple focus:ring-4 focus:ring-purple/10',
            'transition-all duration-200',
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-[#2A2A30]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }