import { cn } from '../../lib/utils.js'

const BASE =
  'group/btn relative inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] px-6 text-sm font-medium transition-colors duration-300 ease-out select-none'

const VARIANTS = {
  // Ivory fill: the single strongest element on a dark page.
  primary: 'bg-ink text-ground hover:bg-accent-soft',
  outline: 'border border-line-strong text-ink hover:border-accent hover:text-accent-soft',
  ghost: 'text-ink-muted hover:text-ink',
}

const SIZES = {
  md: '',
  sm: 'min-h-11 px-5 text-[0.8125rem]',
}

/**
 * The one button of the system. Renders a <button>, or an <a> when `href` is
 * given. `icon` is a lucide component shown after the label; it nudges along
 * the reading direction on hover and is mirrored in RTL when `flipIcon`.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  flipIcon = true,
  className,
  children,
  ...rest
}) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      type={href ? undefined : 'button'}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-500 ease-expo group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1',
            flipIcon && 'rtl:-scale-x-100',
          )}
        />
      )}
    </Tag>
  )
}
