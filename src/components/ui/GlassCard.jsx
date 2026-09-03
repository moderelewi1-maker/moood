import { cn } from '../../lib/utils.js'

export default function GlassCard({ children, className = '', as: Tag = 'div', ref, ...props }) {
  return (
    <Tag
      ref={ref}
      className={cn(
        'surface rounded-2xl transition-all duration-500 hover:border-ice/25',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
