/**
 * Credential chip. Square-cornered and hairline-bordered rather than a
 * filled capsule — at this weight a pill reads as a tag, a rectangle reads
 * as a specification.
 */
export default function Pill({ icon: Icon, children, className = '' }) {
  return (
    <span
      className={`surface inline-flex items-center gap-2 rounded-sm px-3.5 py-2 text-xs font-medium text-ink-muted sm:text-[13px] ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} aria-hidden="true" />}
      {children}
    </span>
  )
}
