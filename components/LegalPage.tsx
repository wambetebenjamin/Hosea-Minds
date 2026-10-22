import type { ReactNode } from 'react'
import Link from 'next/link'
import { HelplineStrip } from './Helplines'

export interface LegalSection {
  id: string
  title: string
  body: ReactNode
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
  children,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
  children?: ReactNode
}) {
  return (
    <>
      <section className="bg-light border-b border-dark/5">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-primary">
            Legal and transparency
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-dark">{title}</h1>
          <p className="mt-3 text-sm text-dark/60">Last updated {updated}</p>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-dark/75">{intro}</p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <nav aria-label="On this page" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28 rounded-2xl bg-light p-5">
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-dark/50">
                  On this page
                </p>
                <ul className="mt-3 space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-center min-h-[44px] text-sm text-dark/70 hover:text-primary"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-dark/10 pt-4">
                  <Link href="/crisis" className="text-sm font-semibold text-secondary">
                    Need help now?
                  </Link>
                  <p className="mt-1 text-xs text-dark/50">Free helplines, no sign in required.</p>
                </div>
              </div>
            </nav>

            <div className="lg:col-span-9 space-y-8">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark">{section.title}</h2>
                  <div className="mt-3 space-y-3 text-sm sm:text-base leading-relaxed text-dark/75">
                    {section.body}
                  </div>
                </section>
              ))}
              {children}
              <p className="text-xs text-dark/50">
                This page is written in plain language for clarity. It does not replace legal advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HelplineStrip />
    </>
  )
}
