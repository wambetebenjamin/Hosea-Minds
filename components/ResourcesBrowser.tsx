'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen, Headphones, ListChecks, PencilLine, X } from 'lucide-react'
import type { Resource, ResourceType } from '@/lib/constants'
import { RESOURCE_CATEGORIES, RESOURCES } from '@/lib/constants'

const TYPE_ICONS: Record<ResourceType, typeof BookOpen> = {
  Article: BookOpen,
  'Audio Guide': Headphones,
  Exercise: ListChecks,
  Worksheet: PencilLine,
}

const TYPE_TONES: Record<ResourceType, string> = {
  Article: 'bg-primary/10 text-primary',
  'Audio Guide': 'bg-secondary/15 text-secondary',
  Exercise: 'bg-[#E8F4EA] text-[#2F6B44]',
  Worksheet: 'bg-[#F2EDF9] text-[#5B4C82]',
}

export function ResourcesBrowser() {
  const reduceMotion = useReducedMotion()
  const [category, setCategory] = useState<string>('All')
  const [active, setActive] = useState<Resource | null>(null)

  const filtered = useMemo(
    () => (category === 'All' ? RESOURCES : RESOURCES.filter((item) => item.category === category)),
    [category],
  )

  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter resources by category">
        {['All', ...RESOURCE_CATEGORIES].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`inline-flex items-center justify-center min-h-[44px] rounded-full px-4 text-sm font-semibold transition-colors ${
              category === item
                ? 'bg-primary text-white'
                : 'bg-light text-dark/70 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-dark/50">
        {filtered.length} resource{filtered.length === 1 ? '' : 's'}
        {category === 'All' ? '' : ` in ${category}`}. Everything here is free and needs no account.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map((resource, index) => {
          const Icon = TYPE_ICONS[resource.type]
          return (
            <motion.article
              key={resource.slug}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay: (index % 3) * 0.12 }}
              className="card-soft p-5 sm:p-6 flex flex-col h-full"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${TYPE_TONES[resource.type]}`}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {resource.type}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-dark/40">{resource.category}</span>
              </div>

              <h3 className="mt-3 font-display text-lg sm:text-xl font-semibold text-dark">{resource.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/70 flex-1">{resource.description}</p>
              <p className="mt-3 text-xs text-dark/40">{resource.readTime}</p>

              <button
                type="button"
                onClick={() => setActive(resource)}
                className="mt-4 inline-flex items-center gap-2 min-h-[44px] self-start rounded-xl bg-light px-4 text-sm font-semibold text-primary hover:bg-primary/10"
              >
                Open resource
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.article>
          )
        })}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center bg-dark/45 p-0 sm:p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActive(null)
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resource-title"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-xl"
            >
              <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-dark/5 bg-white p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${TYPE_TONES[active.type]}`}>
                      {active.type}
                    </span>
                    <span className="text-[11px] uppercase tracking-wide text-dark/40">{active.category}</span>
                    <span className="text-[11px] text-dark/40">· {active.readTime}</span>
                  </div>
                  <h2 id="resource-title" className="mt-2 font-display text-xl sm:text-2xl font-semibold text-dark">
                    {active.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close resource"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-dark/60 hover:bg-light"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                {active.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-sm sm:text-base leading-relaxed text-dark/75">
                    {paragraph}
                  </p>
                ))}

                {active.steps ? (
                  <div className="rounded-2xl bg-light p-4 sm:p-5">
                    <h3 className="font-display text-base font-semibold text-dark">Try this</h3>
                    <ol className="mt-3 space-y-2">
                      {active.steps.map((step, index) => (
                        <li key={step} className="flex items-start gap-3 text-sm text-dark/75">
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                <p className="rounded-xl border border-dark/5 bg-white p-3 text-xs text-dark/50">
                  This resource is general self help information, not personalised medical advice. If something
                  here does not fit your situation, that is alright. A health worker can help you find what does.
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center justify-center min-h-[44px] flex-1 rounded-xl border border-dark/15 px-4 text-sm font-semibold text-dark"
                  >
                    Back to resources
                  </button>
                  <a
                    href="/crisis"
                    className="inline-flex items-center justify-center min-h-[44px] flex-1 rounded-xl bg-secondary px-4 text-sm font-semibold text-white btn-secondary"
                  >
                    I need support now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
