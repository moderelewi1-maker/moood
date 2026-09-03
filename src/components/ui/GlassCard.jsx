import { cn } from '../../lib/utils.js'

export default function GlassCard({ children, className = '', as: Tag = 'div', ref, ...props }) {
  return (
    <Tag
      ref={ref}
      className={cn(
        'glass rounded-2xl transition-all duration-500 hover:border-white/20',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
