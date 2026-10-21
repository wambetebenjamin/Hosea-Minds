'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  BookOpen,
  Leaf,
  LifeBuoy,
  Sparkles,
  Users,
} from 'lucide-react'
import { FEATURES } from '@/lib/constants'

const icons = {
  book: BookOpen,
  activity: Activity,
  sparkles: Sparkles,
  users: Users,
  leaf: Leaf,
  lifebuoy: LifeBuoy,
} as const

export function FeatureGrid() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {FEATURES.map((feature, index) => {
        const Icon = icons[feature.icon]
        return (
          <motion.article
            key={feature.title}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.3 }}
            className="group card-soft p-6 h-full flex flex-col"
          >
            <span className="icon-tile transition-transform duration-500 group-hover:scale-105">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold text-dark">{feature.title}</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-dark/70 flex-1">
              {feature.description}
            </p>
            <Link
              href={feature.href}
              className="mt-5 inline-flex items-center gap-2 min-h-[44px] font-display text-sm font-semibold text-primary hover:text-secondary"
            >
              Explore
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </motion.article>
        )
      })}
    </div>
  )
}
