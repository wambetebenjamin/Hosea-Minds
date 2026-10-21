import type { ReactNode } from 'react'

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string
  title: string
  intro?: string
  children?: ReactNode
}) {
  return (
    <section className="bg-light border-b border-dark/5">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-primary">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-dark">{title}</h1>
          {intro ? <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/70">{intro}</p> : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </div>
    </section>
  )
}
