import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Icon } from './Icon'
import { Button, IconButton, cx } from './ui'
import { navItems } from '../data'
import { scrollToId } from '../lib/motion'

type ThemeToggle = (e: MouseEvent<HTMLButtonElement>) => void

export function LoadingScreen({ phase }: { phase: 'on' | 'out' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 800)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-page transition-opacity duration-[400ms] ease-out"
      style={{ opacity: phase === 'out' ? 0 : 1, pointerEvents: phase === 'out' ? 'none' : 'auto' }}
    >
      <span className="text-[13px] text-text-3">Loading</span>
      <span className="h-px w-12 bg-line" />
      <span className="font-mono text-[13px] tabular-nums text-ink">{String(count).padStart(3, '0')}</span>
    </div>
  )
}

export function DesktopNav({
  activeNav,
  dark,
  onTheme,
}: {
  activeNav: string
  dark: boolean
  onTheme: ThemeToggle
}) {
  return (
    <header className="fixed top-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 lg:flex">
      <nav
        aria-label="Sections"
        className="flex items-center gap-1 rounded-full border border-line bg-card p-1 shadow-[var(--shadow-float)]"
      >
        {navItems.map((n) => (
          <IconButton
            key={n.id}
            label={n.label}
            active={activeNav === n.id}
            aria-current={activeNav === n.id ? 'true' : undefined}
            onClick={() => scrollToId(n.id)}
          >
            <Icon name={n.icon} />
          </IconButton>
        ))}
      </nav>
      <div className="rounded-full border border-line bg-card p-1 shadow-[var(--shadow-float)]">
        <IconButton label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={onTheme}>
          <Icon name={dark ? 'moon' : 'sun'} />
        </IconButton>
      </div>
      <Button className="h-11 shadow-[var(--shadow-float)]" onClick={() => scrollToId('contact')}>
        <Icon name="calendar" />
        Book a Call
      </Button>
    </header>
  )
}

export function MobileBar({ dark, onTheme }: { dark: boolean; onTheme: ThemeToggle }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])
  const go = (id: string) => {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }
  return (
    <>
      <header className="fixed inset-x-4 top-3 z-40 flex h-14 items-center justify-between rounded-full border border-line bg-card pr-2 pl-5 shadow-[var(--shadow-float)] lg:hidden">
        <button type="button" onClick={() => go('home')} className="text-[18px] font-semibold tracking-[-0.3px] text-ink">
          Malate
        </button>
        <div className="flex items-center gap-1">
          <IconButton label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={onTheme} size={40}>
            <Icon name={dark ? 'moon' : 'sun'} />
          </IconButton>
          <IconButton label="Open menu" onClick={() => setOpen(true)} size={40} aria-expanded={open}>
            <Icon name="menu" />
          </IconButton>
        </div>
      </header>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="anim-fade-in fixed inset-0 z-[80] flex flex-col bg-page px-4 pt-3 pb-8 lg:hidden">
          <div className="flex h-14 items-center justify-between rounded-full border border-line bg-card pr-2 pl-5">
            <span className="text-[18px] font-semibold tracking-[-0.3px] text-ink">Malate</span>
            <IconButton label="Close menu" onClick={() => setOpen(false)} size={40}>
              <Icon name="close" />
            </IconButton>
          </div>
          <nav className="anim-modal mt-10 flex flex-col px-2">
            {navItems.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                className="flex items-center justify-between border-b border-line py-5 text-left text-[32px] font-semibold tracking-[-0.6px] text-ink active:text-link"
              >
                {n.label}
                <Icon name={n.icon} size={20} className="text-icon" />
              </button>
            ))}
          </nav>
          <Button className="mt-auto h-12 w-full" onClick={() => go('contact')}>
            <Icon name="calendar" />
            Book a Call
          </Button>
        </div>
      )}
    </>
  )
}

const TICKS = 17

export function SideRuler({ activeIndex }: { activeIndex: number }) {
  const activeTick = activeIndex * 2
  return (
    <div aria-hidden="true" className="fixed left-6 z-30 hidden lg:block" style={{ top: 180 }}>
      {Array.from({ length: TICKS }).map((_, i) => (
        <span
          key={i}
          className="absolute left-0 block h-px w-3 transition-colors duration-300"
          style={{ top: i * 28, background: i === activeTick ? 'var(--c-link)' : 'var(--c-line-2)' }}
        />
      ))}
    </div>
  )
}

export function CookieCard() {
  const [state, setState] = useState<'open' | 'closing' | 'gone'>('open')
  if (state === 'gone') return null
  const dismiss = () => {
    setState('closing')
    setTimeout(() => setState('gone'), 200)
  }
  return (
    <div
      role="region"
      aria-label="Cookies"
      className={cx(
        'fixed bottom-4 left-4 z-40 w-[calc(100vw-96px)] max-w-[300px] rounded-[20px] border border-line bg-card p-5 shadow-[var(--shadow-float)] transition-opacity duration-200 lg:bottom-6 lg:left-6',
        state === 'closing' && 'pointer-events-none opacity-0',
      )}
    >
      <p className="text-[16px] font-semibold text-ink">Cookies</p>
      <p className="mt-1 text-[14px] leading-[1.5] text-body">We only count visits if you say yes.</p>
      <div className="mt-4 flex gap-2">
        <Button variant="secondary" onClick={dismiss}>
          Decline
        </Button>
        <Button onClick={dismiss}>Accept</Button>
      </div>
    </div>
  )
}

const suggestions = ['What calls do you take?', 'What are your hours?', 'How do we start?']

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])
  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Ask about Malate"
          className="anim-modal fixed right-4 bottom-[80px] z-50 w-[calc(100vw-32px)] max-w-[320px] rounded-[20px] border border-line bg-card p-5 shadow-[var(--shadow-lift)] lg:right-6 lg:bottom-[88px]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-semibold text-ink">Ask about Malate</p>
            <IconButton label="Close chat" size={32} onClick={() => setOpen(false)}>
              <Icon name="close" />
            </IconButton>
          </div>
          <form
            className="mt-4 flex h-11 items-center gap-2 rounded-full border border-line bg-page pr-1 pl-4 transition-shadow focus-within:border-focus focus-within:shadow-[0_0_0_4px_var(--c-chip)]"
            onSubmit={(e) => {
              e.preventDefault()
              setValue('')
            }}
          >
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Your question"
              className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-text-3"
              placeholder="Ask about Malate"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!value.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover active:bg-primary-press disabled:bg-line-2"
            >
              <Icon name="send" />
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setValue(s)
                  inputRef.current?.focus()
                }}
                className="h-8 rounded-full bg-tint px-3 text-[13px] text-ink transition-colors hover:bg-chip"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-float)] transition-colors hover:bg-primary-hover active:bg-primary-press lg:right-6 lg:bottom-6"
      >
        <Icon name={open ? 'close' : 'chat'} size={20} />
      </button>
    </>
  )
}
