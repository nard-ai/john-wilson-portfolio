import { useRef, useState } from 'react'
import { filterMap, filters, projects, type Filter, type Project } from '../data'
import { prefersReducedMotion } from '../lib/motion'
import { Icon } from './Icon'
import { Button, CloseButton, FilterPill, Modal } from './ui'

export function Tags({ tags }: { tags: string[] }) {
  return (
    <p className="t-meta flex gap-3">
      {tags.map((t) => (
        <span key={t}>
          <span className="text-link">#</span>
          {t}
        </span>
      ))}
    </p>
  )
}

function FeatureTile({ tile }: { tile: Project['tiles'][number] }) {
  return (
    <div className="lift rounded-[20px] border border-line bg-soft p-5">
      <Icon name={tile.icon} size={20} className="text-link" />
      <p className="mt-6 text-[16px] font-semibold text-ink">{tile.title}</p>
      <p className="mt-1 text-[14px] leading-[1.45] text-text-3">{tile.body}</p>
    </div>
  )
}

function ProjectBlock({ project, onLearnMore }: { project: Project; onLearnMore: () => void }) {
  return (
    <article aria-labelledby={`p-${project.id}`} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 id={`p-${project.id}`} className="t-project max-w-[860px]">
          {project.title}
        </h3>
        <Tags tags={project.tags} />
      </div>
      <div className="grid grid-cols-1 gap-5 rounded-[28px] border border-line bg-soft p-3 lg:grid-cols-[58fr_42fr] lg:p-5">
        <div className="flex min-h-[280px] flex-col rounded-[20px] bg-[#E6F6FF] p-5 lg:min-h-[320px]">
          <p className="font-mono text-[12px] text-[#0552B5]">{project.caption}</p>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
            <Icon name="call" size={40} className="text-[#0552B5]" />
            <p className="text-[28px] font-semibold tracking-[-0.4px] text-[#1F2933]">{project.name}</p>
          </div>
          <p className="text-[14px] text-[#1F2933]">{project.note}</p>
        </div>
        <div className="flex flex-col justify-between gap-8 p-2 lg:p-4">
          <div className="relative rounded-[24px] border border-line bg-card p-6">
            <p className="t-body">“{project.bubble}”</p>
            <span aria-hidden="true" className="absolute -bottom-[7px] left-8 h-3.5 w-3.5 rotate-45 border-r border-b border-line bg-card" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[16px] font-semibold text-ink">{project.role}</p>
            <p className="t-body">{project.line}</p>
            <Button className="mt-4" onClick={onLearnMore}>
              Learn more
              <Icon name="arrowUpRight" size={14} />
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {project.tiles.map((t) => (
          <FeatureTile key={t.title} tile={t} />
        ))}
      </div>
    </article>
  )
}

export function Works() {
  const [filter, setFilter] = useState<Filter>('Show all')
  const [shown, setShown] = useState<Filter>('Show all')
  const [fading, setFading] = useState(false)
  const [detail, setDetail] = useState<Project | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const choose = (f: Filter) => {
    if (f === filter) return
    setFilter(f)
    window.clearTimeout(timer.current)
    const d = prefersReducedMotion() ? 120 : 200
    setFading(true)
    timer.current = window.setTimeout(() => {
      setShown(f)
      setFading(false)
    }, d)
  }

  const visible = projects.filter((p) => filterMap[shown].includes(p.id))
  const count = filterMap[filter].length

  return (
    <section id="work" aria-labelledby="works-title" className="px-5 py-16 lg:px-20 lg:py-24">
      <h2 id="works-title" className="t-section">
        Services.
      </h2>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter services">
        {filters.map((f) => (
          <FilterPill key={f} selected={filter === f} onClick={() => choose(f)}>
            {f}
          </FilterPill>
        ))}
      </div>
      <p className="t-meta mt-4" aria-live="polite">
        Showing {count} of {projects.length} services
      </p>
      <div
        className="mt-12 flex flex-col gap-12 transition-opacity ease-out motion-reduce:duration-[120ms]"
        style={{ opacity: fading ? 0 : 1, transitionDuration: '200ms' }}
      >
        {visible.map((p) => (
          <ProjectBlock key={p.id} project={p} onLearnMore={() => setDetail(p)} />
        ))}
      </div>
      <Modal open={!!detail} onClose={() => setDetail(null)} labelledBy="detail-title">
        {detail && (
          <div className="p-6 lg:p-10">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 id="detail-title" className="t-project">
                  {detail.title}
                </h3>
                <Tags tags={detail.tags} />
              </div>
              <CloseButton onClick={() => setDetail(null)} />
            </div>
            <p className="t-body mt-6">{detail.bubble}</p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-6">
              <div>
                <p className="t-meta">What this is</p>
                <p className="text-[15px] text-ink">{detail.role}</p>
              </div>
              <div>
                <p className="t-meta">{detail.note}</p>
                <p className="text-[15px] text-ink">{detail.name}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
