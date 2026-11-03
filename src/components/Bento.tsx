import { type CSSProperties } from 'react'
import { points, statementMark, statementSentence, teamMarks } from '../data'

const CIRCLE = 88
const GAP = 20

export function LogoRow() {
  const setWidth = teamMarks.length * (CIRCLE + GAP)
  const style = {
    '--marquee-shift': `-${setWidth}px`,
    '--marquee-duration': `${setWidth / 30}s`,
  } as CSSProperties
  return (
    <section id="teams" aria-label="Call center" className="py-12 lg:py-16">
      <p className="t-meta px-5 text-center lg:px-20">Call center</p>
      <div
        className="marquee-host mt-6 overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)' }}
      >
        <div className="anim-marquee flex w-max" style={style}>
          {Array.from({ length: 5 }).flatMap((_, k) =>
            teamMarks.map((m, i) => (
              <span
                key={`${k}-${i}`}
                aria-hidden={k > 0 ? 'true' : undefined}
                className="flex shrink-0 items-center justify-center rounded-full bg-primary text-[32px] font-semibold tracking-[-0.5px] text-white"
                style={{ width: CIRCLE, height: CIRCLE, marginRight: GAP }}
              >
                {m}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  )
}

export function StatementBento() {
  const [before, after] = statementSentence.split(statementMark)
  return (
    <section id="statement" aria-label="Statement" className="px-5 py-16 lg:px-20 lg:py-24">
      <p className="max-w-[860px] text-[28px] leading-[1.2] font-semibold tracking-[-0.6px] text-ink lg:text-[40px] lg:tracking-[-0.9px]">
        {before}<span className="text-emph">{statementMark}</span>{after}
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="border-t border-line pt-5">
            <p className="text-[16px] font-semibold text-ink">{p.title}</p>
            <p className="mt-1 text-[14px] leading-[1.5] text-text-3">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
