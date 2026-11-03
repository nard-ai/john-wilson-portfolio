import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { LogoRow, StatementBento } from './components/Bento'
import { ChatWidget, CookieCard, DesktopNav, LoadingScreen, MobileBar, SideRuler } from './components/Chrome'
import { Hero } from './components/Hero'
import { About, Footer } from './components/Sections'
import { Works } from './components/Works'
import { navItems, sectionIds } from './data'
import { prefersReducedMotion } from './lib/motion'

function useActiveSection(deps: unknown[]) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4
      let current = 0
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = i
      })
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sectionIds.length - 1
      }
      setIndex(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return index
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> }
}

export default function App() {
  const [loading, setLoading] = useState<'on' | 'out' | 'done'>('on')
  const [dark, setDark] = useState(false)
  const active = useActiveSection([loading])

  useEffect(() => {
    document.title = 'Malate Call Center | Live Phone Support'
    const a = setTimeout(() => setLoading('out'), 800)
    const b = setTimeout(() => setLoading('done'), 1200)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [])

  const toggleTheme = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const next = !dark
      const apply = () => {
        document.documentElement.classList.toggle('dark', next)
        flushSync(() => setDark(next))
      }
      const doc = document as ViewTransitionDoc
      if (!doc.startViewTransition || prefersReducedMotion()) {
        apply()
        return
      }
      const r = e.currentTarget.getBoundingClientRect()
      const x = r.left + r.width / 2
      const y = r.top + r.height / 2
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      const t = doc.startViewTransition(apply)
      t.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 800, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
    },
    [dark],
  )

  // Map the current page section to the nearest nav item at or above it.
  const navIndexes = navItems.map((n) => sectionIds.indexOf(n.id))
  let activeNav = navItems[0].id
  navIndexes.forEach((si, i) => {
    if (si <= active) activeNav = navItems[i].id
  })

  return (
    <div className="relative min-h-screen overflow-x-clip bg-page">
      <div className="hatch" aria-hidden="true" />
      <div className="fog" aria-hidden="true" />
      <DesktopNav activeNav={activeNav} dark={dark} onTheme={toggleTheme} />
      <MobileBar dark={dark} onTheme={toggleTheme} />
      <SideRuler activeIndex={active} />
      <main className="relative z-10 mx-auto max-w-[1440px]">
        <Hero ready={loading !== 'on'} />
        <LogoRow />
        <StatementBento />
        <Works />
        <About />
        <Footer />
      </main>
      <CookieCard />
      <ChatWidget />
      {loading !== 'done' && <LoadingScreen phase={loading} />}
    </div>
  )
}
