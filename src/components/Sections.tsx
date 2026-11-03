import { aboutClose, aboutText, timeline } from '../data'
import { scrollToId } from '../lib/motion'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-5 py-16 lg:px-20 lg:py-24">
      <p className="t-tag">Malate Call Center</p>
      <h2 id="about-title" className="t-section mt-3">
        John Wilson Malate
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <p className="max-w-[460px] text-[20px] leading-[1.5] text-strong">{aboutText}</p>
        <div>
          <ol className="relative border-l border-line">
            {timeline.map((t) => (
              <li key={t.years} className="relative pb-7 pl-8 last:pb-0">
                <span className="absolute top-[7px] -left-[4.5px] h-2 w-2 rounded-full border border-line-2 bg-page" />
                <p className="font-mono text-[12px] text-link">{t.years}</p>
                <p className="mt-0.5 text-[16px] text-ink">{t.line}</p>
              </li>
            ))}
          </ol>
          <p className="t-body mt-10">{aboutClose}</p>
        </div>
      </div>
    </section>
  )
}

const footerLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'work' },
  { label: 'About', id: 'about' },
]
const socialLinks = [{ label: 'Email', href: 'mailto:' }]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line px-5 pt-12 pb-28 lg:px-20 lg:pb-12">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[20px] font-semibold tracking-[-0.3px] text-ink">Malate</p>
          <p className="mt-1 text-[14px] text-text-3">Live phone support for businesses.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
          {footerLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="link"
              onClick={(e) => {
                e.preventDefault()
                scrollToId(l.id)
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
          {socialLinks.map((l) => (
            <a key={l.label} href={l.href} className="link">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
