import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { headlines, statements } from '../data'
import { scrollToId } from '../lib/motion'
import { Icon } from './Icon'
import { Cloud, Portrait } from './Portrait'
import { Button, cx } from './ui'

function delay(ms: number): CSSProperties {
  return { animationDelay: `${ms}ms` }
}

function CyclingHeadline() {
  const [state, setState] = useState<{ cur: number; prev: number | null; n: number }>({ cur: 0, prev: null, n: 0 })
  useEffect(() => {
    const t = setInterval(() => {
      setState((s) => ({ cur: (s.cur + 1) % headlines.length, prev: s.cur, n: s.n + 1 }))
    }, 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <h1 className="t-hero relative grid min-h-[2em] items-end lg:min-h-[1.9em]" aria-live="polite">
      <span className="sr-only">Malate Call Center, live phone support. </span>
      {state.prev !== null && (
        <span key={`out-${state.n}`} aria-hidden="true" className="anim-vapor-out col-start-1 row-start-1">
          {headlines[state.prev]}
        </span>
      )}
      <span key={`in-${state.n}`} className="anim-vapor-in col-start-1 row-start-1">
        {headlines[state.cur]}
      </span>
    </h1>
  )
}

/** Press-and-hold "About me": draws "Keep holding", scrolls to About when held 600ms. */
function HoldButton() {
  const [phase, setPhase] = useState<'idle' | 'hold' | 'fade'>('idle')
  const [run, setRun] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  const fadeTimer = useRef<number | undefined>(undefined)

  const start = () => {
    window.clearTimeout(fadeTimer.current)
    setRun((r) => r + 1)
    setPhase('hold')
    timer.current = window.setTimeout(() => {
      timer.current = undefined
      scrollToId('about')
      release()
    }, 600)
  }
  const release = () => {
    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
    setPhase((p) => (p === 'idle' ? p : 'fade'))
    fadeTimer.current = window.setTimeout(() => setPhase('idle'), 220)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <div className="relative">
      <Button
        variant="secondary"
        aria-describedby="hold-hint"
        className="touch-none"
        onPointerDown={(e) => {
          if (e.button !== 0) return
          e.currentTarget.setPointerCapture(e.pointerId)
          start()
        }}
        onPointerUp={() => phase === 'hold' && release()}
        onPointerCancel={() => phase === 'hold' && release()}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
            e.preventDefault()
            start()
          }
        }}
        onKeyUp={(e) => (e.key === ' ' || e.key === 'Enter') && release()}
        onContextMenu={(e) => e.preventDefault()}
      >
        About us
      </Button>
      <span id="hold-hint" className="sr-only">
        Press and hold to jump to About
      </span>
      {phase !== 'idle' && (
        <span
          key={run}
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute top-full left-2 mt-2 inline-flex flex-col transition-opacity duration-200',
            phase === 'fade' && 'opacity-0',
          )}
        >
          <span className="t-hand anim-write -rotate-2 whitespace-nowrap">Keep holding</span>
          <svg width="112" height="8" viewBox="0 0 112 8" className="anim-underline -mt-0.5 text-link" fill="none">
            <path d="M2 5C30 2 70 2 110 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </span>
      )}
    </div>
  )
}

function PortraitScene() {
  return (
    <div className="relative mx-auto flex aspect-[1/1.05] w-[240px] items-end justify-center lg:w-full lg:max-w-[400px]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[6%] h-[55%] overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, #000 18%, #000 82%, transparent)' }}
      >
        <Cloud className="anim-drift absolute top-[8%] w-[46%]" style={{ left: '0%', filter: 'drop-shadow(0 6px 14px rgba(31,41,51,0.05))' }} />
        <Cloud
          className="anim-drift absolute top-[44%] w-[32%]"
          style={{ left: '50%', animationDelay: '-9s', filter: 'drop-shadow(0 6px 14px rgba(31,41,51,0.05))' }}
        />
      </div>
      <span
        aria-hidden="true"
        className="anim-breathe absolute top-[4%] right-[10%] h-12 w-12 rounded-full border-2 border-[#F0B429] bg-[#FFF3C4] lg:h-14 lg:w-14"
      />
      <Portrait className="relative w-[200px] text-ink transition-colors lg:w-[280px]" />
    </div>
  )
}

function Statements() {
  const [open, setOpen] = useState(0)
  return (
    <div className="flex flex-col">
      {statements.map((s, i) => {
        const isOpen = open === i
        return (
          <div key={s.title} className={cx('border-line py-4', i > 0 && 'border-t')}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`stmt-${i}`}
              onClick={() => setOpen(i)}
              className="group flex w-full items-baseline gap-3 text-left"
            >
              <span className="t-meta tabular-nums">0{i + 1}</span>
              <span
                className={cx(
                  'text-[16px] transition-colors duration-200',
                  isOpen ? 'font-semibold text-ink' : 'font-medium text-text-3 group-hover:text-ink',
                )}
              >
                {s.title}
              </span>
            </button>
            <div
              id={`stmt-${i}`}
              className="grid transition-[grid-template-rows] duration-[250ms] ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className={cx('t-body pt-2 pl-7 transition-opacity duration-[250ms]', isOpen ? 'opacity-100' : 'opacity-0')}>
                  {s.body}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const v = ready ? 'anim-vapor-in' : 'opacity-0'
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="grid min-h-[min(860px,100vh)] grid-cols-1 items-center gap-10 px-5 pt-[104px] pb-16 lg:grid-cols-[420px_minmax(0,1fr)_360px] lg:gap-12 lg:px-20 lg:pt-[120px] lg:pb-20"
    >
      <div className="flex flex-col gap-8">
        <div className={ready ? '' : 'opacity-0'}>{ready && <CyclingHeadline />}</div>
        <div className={cx('flex flex-wrap gap-2', v)} style={delay(80)}>
          <HoldButton />
          <Button variant="secondary" onClick={() => scrollToId('work')}>
            See our services
            <Icon name="arrowRight" size={14} />
          </Button>
        </div>
      </div>
      <div className={v} style={delay(140)}>
        <PortraitScene />
      </div>
      <div className={v} style={delay(200)}>
        <Statements />
      </div>
    </section>
  )
}
