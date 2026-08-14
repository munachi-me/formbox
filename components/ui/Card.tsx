import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dark' | 'light'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'dark', hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border transition-all duration-300',
          variant === 'dark' 
            ? 'bg-[#1A1A20] border-[#2A2A30]' 
            : 'bg-white border-gray-200',
          hover && 'hover:border-purple hover:shadow-glow hover:-translate-y-1',
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card }