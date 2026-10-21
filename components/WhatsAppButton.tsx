'use client'

import { WHATSAPP_LINK } from '@/lib/constants'
import { WhatsAppIcon } from './icons'

export function WhatsAppButton() {
  return (
    <div className="fixed right-6 bottom-safe z-[9998] print:hidden">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with us on WhatsApp"
        className="entrance-pulse group relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary/30 transition-transform hover:scale-105 focus-visible:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-dark px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          Chat with us on WhatsApp
        </span>
      </a>
    </div>
  )
}
