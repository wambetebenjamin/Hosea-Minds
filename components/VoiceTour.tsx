'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const SCRIPT =
  'Welcome to Hosea Minds. This is a safe, private space where you can track your mood, write in your journal, and connect with a supportive community of people going through similar experiences. Mental health is not a luxury. It is something every Kenyan deserves to take seriously, including you. There are no judgments here. Scroll down to explore the platform, or create your free account and start your first journal entry today.'

const SEEN_KEY = 'hosea-minds-voice-tour-heard'

type TourStatus = 'idle' | 'speaking' | 'done' | 'muted'

export function VoiceTour() {
  const pathname = usePathname()
  const [status, setStatus] = useState<TourStatus>('idle')
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(SCRIPT)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.lang = 'en-KE'

    const voices = window.speechSynthesis.getVoices()
    const kenyan = voices.find((voice) => voice.lang?.toLowerCase() === 'en-ke')
    const english = voices.find((voice) => voice.lang?.toLowerCase().startsWith('en'))
    if (kenyan) utterance.voice = kenyan
    else if (english) utterance.voice = english

    utterance.onstart = () => setStatus('speaking')
    utterance.onend = () => setStatus('done')
    utterance.onerror = () => setStatus('done')

    utteranceRef.current = utterance
    setStatus('speaking')
    window.speechSynthesis.speak(utterance)
    window.sessionStorage.setItem(SEEN_KEY, 'true')
  }, [])

  // Runs once, on the first scroll or the first click anywhere on the page.
  // The crisis page never starts audio on its own, because it must stay free
  // of anything that could feel like friction or a surprise.
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    if (pathname?.startsWith('/crisis')) return

    let started = false
    const start = () => {
      if (started) return
      started = true
      speak()
    }

    if (window.sessionStorage.getItem(SEEN_KEY)) {
      const markHeard = window.setTimeout(() => setStatus('done'), 0)
      return () => window.clearTimeout(markHeard)
    }

    const onScroll = () => {
      if (window.scrollY > 120) start()
    }
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-voice-tour]')) return
      start()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
    }
  }, [pathname, speak])

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleClick = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    if (status === 'speaking') {
      window.speechSynthesis.cancel()
      setStatus('muted')
      return
    }
    speak()
  }

  const tooltip =
    status === 'speaking'
      ? 'Tap to mute the voice tour'
      : status === 'done' || status === 'muted'
        ? 'Replay tour'
        : 'Hear what this site is about'

  return (
    <div className="fixed left-6 bottom-safe z-[9998] print:hidden">
      <button
        type="button"
        data-voice-tour
        onClick={handleClick}
        aria-label="Site voice tour, click to mute"
        title={tooltip}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105 focus-visible:scale-105 ${
          status === 'speaking' ? 'voice-ring' : ''
        }`}
      >
        {status === 'speaking' || status === 'idle' ? (
          <Volume2 className="h-6 w-6" aria-hidden="true" />
        ) : (
          <VolumeX className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-dark px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          {tooltip}
        </span>
        {status === 'done' || status === 'muted' ? (
          <span className="sr-only">Replay tour</span>
        ) : null}
      </button>
      <span aria-live="polite" className="sr-only">
        {status === 'speaking'
          ? 'Voice tour playing.'
          : status === 'muted'
            ? 'Voice tour muted.'
            : status === 'done'
              ? 'Voice tour finished. Press to replay.'
              : ''}
      </span>
    </div>
  )
}
