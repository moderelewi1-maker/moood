export default function Pill({ icon: Icon, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs sm:text-sm font-medium text-ink-muted ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} aria-hidden="true" />}
      {children}
    </span>
  )
}
