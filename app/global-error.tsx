'use client'

import './globals.css'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-KE">
      <body className="antialiased">
        <main className="bg-[#EEF9FF] min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#06A3DA] font-semibold">Hosea Minds</p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl text-[#091E3E]">We hit a snag</h1>
            <p className="mt-3 text-sm text-[#091E3E]/70">
              Nothing you wrote has been lost. Please reload, or message us on WhatsApp on +254 112 272 061 and a
              person will help.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center justify-center min-h-[48px] rounded-xl bg-[#06A3DA] px-6 font-semibold text-white"
            >
              Try again
            </button>
            <p className="mt-6 text-xs text-[#091E3E]/60">
              If you are in danger, call 999 or Befrienders Kenya on 0800 723 253.
            </p>
          </div>
        </main>
      </body>
    </html>
  )
}
