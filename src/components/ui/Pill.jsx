export default function Pill({ icon: Icon, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/10 px-4 py-2 text-xs font-medium text-ink backdrop-blur-sm sm:text-sm ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-crimson-soft" strokeWidth={2} aria-hidden="true" />}
      {children}
    </span>
  )
}
