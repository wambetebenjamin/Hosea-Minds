'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Phone, ShieldCheck, Sparkles } from 'lucide-react'

const slides = [
  {
    src: '/images/hero-calm.jpg',
    alt: 'A woman standing outdoors with her eyes closed, breathing in the quiet of a park',
    eyebrow: 'A safe space for Kenyans',
    label: 'Slow down, gently',
  },
  {
    src: '/images/connection.jpg',
    alt: 'Two women sitting together on a sofa, listening to one another',
    eyebrow: 'Nothing to prove here',
    label: 'You are not meant to carry this alone',
  },
]

export function HomeHero() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  const go = (next: number) => setIndex((next + slides.length) % slides.length)

  return (
    <section
      aria-label="Welcome to Hosea Minds"
      className="relative overflow-hidden bg-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={slideIndex === index ? undefined : 'true'}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,30,62,0.52)_0%,rgba(9,30,62,0.62)_55%,rgba(9,30,62,0.72)_100%)]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex-col items-center justify-center py-16 sm:py-20 text-center">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1], delay: 0.3 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
              <Sparkles className="h-4 w-4 text-secondary" aria-hidden="true" />
              {slides[index]?.eyebrow}
            </span>

            <motion.h1
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            >
              Your mental health journey starts here
            </motion.h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/85">
              A safe, private place to track how you feel, keep a journal nobody else can read, and find
              community with Kenyans who understand. No judgment. No pressure. Just space to be honest.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl bg-primary px-7 py-3 font-display font-semibold text-white btn-primary"
              >
                Start your journal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/crisis"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl border border-white/60 bg-white/5 px-7 py-3 font-display font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-dark"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                I need support now
              </Link>
            </div>

            <p className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
                Private by design
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-white/30">
                |
              </span>
              <span>Free to use</span>
              <span aria-hidden="true" className="hidden sm:inline text-white/30">
                |
              </span>
              <span>Built for Kenya</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous hero image"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-pressed={slideIndex === index}
              aria-label={slide.label}
              onClick={() => setIndex(slideIndex)}
              className={`h-2.5 rounded-full transition-all ${
                slideIndex === index ? 'w-7 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next hero image"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
