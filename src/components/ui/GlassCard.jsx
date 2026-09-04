import { cn } from '../../lib/utils.js'

export default function GlassCard({ children, className = '', as: Tag = 'div', ref, ...props }) {
  return (
    <Tag
      ref={ref}
      className={cn(
        'surface glow-ember-hover rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
