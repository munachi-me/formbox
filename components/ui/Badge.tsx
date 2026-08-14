import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'draft' | 'published' | 'closed' | 'success' | 'warning'
}

const Badge = ({ className, variant = 'draft', ...props }: BadgeProps) => {
  const variants = {
    draft: 'bg-[#2A2A30] text-gray-400',
    published: 'bg-[#DCFCE7] text-[#16A34A]',
    closed: 'bg-red-500/10 text-red-500',
    success: 'bg-green/10 text-green',
    warning: 'bg-yellow-500/10 text-yellow-500',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }