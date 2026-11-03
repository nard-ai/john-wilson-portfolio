import { useEffect, useState } from 'react'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => prefersReducedMotion())
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

/** Smooth-scrolls to a section id over a fixed duration (600ms by default). */
export function scrollToId(id: string, duration = 600) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = window.innerWidth >= 1024 ? 88 : 72
  const start = window.scrollY
  const target = id === 'home' ? 0 : Math.max(0, el.getBoundingClientRect().top + start - offset)
  if (prefersReducedMotion()) {
    window.scrollTo(0, target)
    return
  }
  let t0: number | null = null
  const step = (t: number) => {
    if (t0 === null) t0 = t
    const p = Math.min(1, (t - t0) / duration)
    window.scrollTo(0, start + (target - start) * ease(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
