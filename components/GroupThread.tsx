'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, Loader2, Send } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import type { GroupMessage } from '@/lib/types'
import { CaptchaV2, useCaptcha } from './CaptchaField'

export function GroupThread({
  groupSlug,
  initialMessages,
  currentUserName,
}: {
  groupSlug: string
  initialMessages: GroupMessage[]
  currentUserName: string
}) {
  const reduceMotion = useReducedMotion()
  const captcha = useCaptcha('group-message')
  const [messages, setMessages] = useState(initialMessages)
  const [body, setBody] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [justSent, setJustSent] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' })
  }, [messages.length, reduceMotion])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (body.trim().length < 2) {
      setError('Write a short message first.')
      return
    }

    setPending(true)
    const captchaPayload = await captcha.prepare()
    const response = await fetch('/api/groups/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupSlug, body, ...captchaPayload }),
    })
    const data = (await response.json()) as {
      ok?: boolean
      error?: string
      needsV2?: boolean
      posted?: GroupMessage
    }
    setPending(false)

    if (!response.ok || !data.ok || !data.posted) {
      if (data.needsV2) captcha.setNeedsV2(true)
      setError(data.error ?? 'That message did not send. Please try again.')
      return
    }

    setMessages((current) => [...current, data.posted as GroupMessage])
    setJustSent(data.posted.id)
    setBody('')
    captcha.reset()
  }

  return (
    <div className="card-soft overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-dark/5 bg-light px-5 py-4">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-semibold text-dark">Group messages</h2>
          <p className="text-xs text-dark/50">What is shared here stays here.</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-[11px] uppercase tracking-wide text-dark/50">
          {messages.length} messages
        </span>
      </div>

      <div
        className="max-h-[520px] overflow-y-auto px-4 sm:px-5 py-5 space-y-4 bg-white"
        role="log"
        aria-live="polite"
        aria-label="Group message thread"
      >
        {messages.map((message) => {
          const mine = message.displayName === currentUserName && message.role === 'member'
          const isNew = message.id === justSent
          return (
            <motion.div
              key={message.id}
              initial={isNew && !reduceMotion ? { opacity: 0, y: 22 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'facilitator'
                    ? 'bg-light border border-primary/15'
                    : mine
                      ? 'bg-primary text-white'
                      : 'bg-[#F6FBFE] border border-dark/5'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      message.role === 'facilitator'
                        ? 'text-primary'
                        : mine
                          ? 'text-white/90'
                          : 'text-dark/70'
                    }`}
                  >
                    {message.role === 'facilitator' ? 'Facilitator' : mine ? 'You' : message.displayName}
                  </span>
                  {message.role === 'facilitator' ? (
                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                      Pinned voice
                    </span>
                  ) : null}
                  <span className={`text-[10px] ${mine ? 'text-white/60' : 'text-dark/40'}`}>
                    {formatDateTime(message.createdAt)}
                  </span>
                </div>
                <p
                  className={`mt-1.5 text-sm leading-relaxed whitespace-pre-line ${
                    mine ? 'text-white' : 'text-dark/80'
                  }`}
                >
                  {message.body}
                </p>
              </div>
            </motion.div>
          )
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={onSubmit} className="border-t border-dark/5 p-4 sm:p-5 bg-white" noValidate>
        <label htmlFor="group-message" className="sr-only">
          Your message to the group
        </label>
        <textarea
          id="group-message"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="field min-h-[96px] w-full resize-y"
          placeholder="Say as much or as little as you like. You are among people who get it."
          maxLength={1200}
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-dark/45">
          <span>{body.length} / 1200</span>
          <span>Posted as {currentUserName}</span>
        </div>

        <AnimatePresence>
          {captcha.needsV2 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden"
            >
              <CaptchaV2
                onToken={(token) => {
                  captcha.setV2Token(token)
                  setError(null)
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {error ? (
          <p role="alert" className="mt-3 flex items-start gap-2 rounded-xl bg-secondary/10 p-3 text-sm text-dark">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-3 inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[44px] rounded-xl bg-primary px-5 font-display font-semibold text-white btn-primary disabled:opacity-70"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {pending ? 'Sending' : 'Send to group'}
        </button>
      </form>
    </div>
  )
}
