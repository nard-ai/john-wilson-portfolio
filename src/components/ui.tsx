import { useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ')
}

type ButtonVariant = 'primary' | 'secondary' | 'selected'

const buttonBase =
  'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 py-1.5 text-[14px] font-medium leading-none whitespace-nowrap transition-colors duration-150 select-none'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-press',
  selected: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-press',
  secondary:
    'border border-line bg-card text-ink hover:bg-sec-hover active:bg-sec-press',
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button type="button" className={cx(buttonBase, buttonVariants[variant], className)} {...rest}>
      {children}
    </button>
  )
}

export function FilterPill({
  selected,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean }) {
  return (
    <Button variant={selected ? 'selected' : 'secondary'} aria-pressed={selected} {...rest}>
      {children}
    </Button>
  )
}

export function IconButton({
  active,
  label,
  className,
  children,
  size = 36,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  label: string
  size?: number
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      style={{ width: size, height: size }}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-150 hover:bg-icon-hover active:bg-chip',
        active ? 'text-link' : 'text-nav-icon hover:text-link',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-9 items-center rounded-full border border-line bg-card px-4 text-[14px] text-ink">
      {children}
    </span>
  )
}

export function Modal({
  open,
  onClose,
  width = 720,
  labelledBy,
  children,
}: {
  open: boolean
  onClose: () => void
  width?: number
  labelledBy?: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div
      className="anim-fade-in fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(31,41,51,0.28)] p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="anim-modal max-h-[calc(100vh-32px)] w-full overflow-auto rounded-[28px] border border-line bg-card shadow-[var(--shadow-lift)]"
        style={{ maxWidth: width }}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function CloseButton({ onClick, label = 'Close' }: { onClick: () => void; label?: string }) {
  return (
    <IconButton label={label} onClick={onClick} className="border border-line bg-card">
      <Icon name="close" />
    </IconButton>
  )
}
