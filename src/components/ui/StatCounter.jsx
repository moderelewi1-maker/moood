import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import GlassCard from './GlassCard.jsx'

gsap.registerPlugin(ScrollTrigger)

/** Number that counts up from 0 once it scrolls into view, via GSAP ScrollTrigger. */
export default function StatCounter({ value, prefix = '', suffix = '', label, note, index = 0 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? value : 0
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const proxy = { val: 0 }
    const tween = gsap.to(proxy, {
      val: value,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => setDisplay(Math.round(proxy.val)),
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value])

  return (
    <GlassCard
      as="div"
      ref={ref}
      className="flex flex-col gap-2 p-6 sm:p-7"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="font-display text-3xl font-bold text-ink sm:text-4xl">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="text-sm text-ink-muted leading-snug">{label}</span>
      {note && <span className="text-[10px] uppercase tracking-wider text-ink-faint">{note}</span>}
    </GlassCard>
  )
}
