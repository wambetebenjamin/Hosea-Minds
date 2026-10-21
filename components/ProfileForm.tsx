'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, ShieldAlert, Trash2, X } from 'lucide-react'
import { Toggle } from './ui'

interface ProfileFormProps {
  displayName: string | null
  email: string
  prefs: { dailyReminder: boolean; weeklyDigest: boolean }
}

export function ProfileForm({ displayName, email, prefs }: ProfileFormProps) {
  const router = useRouter()
  const [name, setName] = useState(displayName ?? '')
  const [daily, setDaily] = useState(prefs.dailyReminder)
  const [weekly, setWeekly] = useState(prefs.weeklyDigest)
  const [pending, setPending] = useState(false)
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)

  const [showDanger, setShowDanger] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    setPending(true)
    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: name,
          prefs: { dailyReminder: daily, weeklyDigest: weekly },
        }),
      })
      const data = (await response.json()) as { ok?: boolean; message?: string; error?: string }
      if (!response.ok || !data.ok) {
        setNotice({ tone: 'error', text: data.error ?? 'We could not save that. Please try again.' })
        return
      }
      setNotice({ tone: 'ok', text: data.message ?? 'Saved.' })
      router.refresh()
    } catch {
      setNotice({ tone: 'error', text: 'We could not save that. Please try again.' })
    } finally {
      setPending(false)
    }
  }

  const deleteAccount = async () => {
    setDeleteError(null)
    if (confirmation !== 'DELETE') {
      setDeleteError('Type DELETE in capital letters to confirm.')
      return
    }
    setDeleting(true)
    try {
      const response = await fetch('/api/profile/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: 'DELETE' }),
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !data.ok) {
        setDeleteError(data.error ?? 'We could not complete that. Please try again.')
        setDeleting(false)
        return
      }
      await signOut({ redirect: false })
      router.push('/?deleted=1')
      router.refresh()
    } catch {
      setDeleteError('We could not complete that. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="card-soft p-5 sm:p-7">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark">Your details</h2>
        <p className="mt-1 text-sm text-dark/60">
          A display name is optional. Leave it blank and groups will simply show you as Anonymous.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="profile-name" className="field-label">
              Display name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="field"
              placeholder="Anonymous"
              maxLength={60}
            />
          </div>

          <div>
            <label htmlFor="profile-email" className="field-label">
              Email address
            </label>
            <input id="profile-email" type="email" value={email} readOnly className="field bg-light/60" />
            <p className="mt-1 text-xs text-dark/50">
              Your email is used to sign you in and nothing else. Contact us if you need to change it.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-light p-4 sm:p-5">
          <h3 className="font-display text-base font-semibold text-dark">Notifications</h3>
          <div className="mt-1 divide-y divide-dark/5">
            <Toggle
              id="pref-daily"
              checked={daily}
              onChange={setDaily}
              label="Daily check in reminder"
              description="One gentle email in the evening, if you have not written that day."
            />
            <Toggle
              id="pref-weekly"
              checked={weekly}
              onChange={setWeekly}
              label="Weekly insight digest"
              description="A short summary of your own week, with no advice and no scoring."
            />
          </div>
          <p className="mt-2 text-xs text-dark/50">
            Reminders never include the content of your entries.
          </p>
        </div>

        {notice ? (
          <p
            role="status"
            className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${
              notice.tone === 'ok' ? 'bg-primary/10 text-dark' : 'bg-secondary/10 text-dark'
            }`}
          >
            {notice.tone === 'ok' ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
            )}
            {notice.text}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[44px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary disabled:opacity-70"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Saving' : 'Save changes'}
        </button>
      </form>

      <section className="rounded-2xl border border-secondary/30 bg-secondary/5 p-5 sm:p-7" aria-labelledby="danger-heading">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-secondary">
            <ShieldAlert className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="danger-heading" className="font-display text-xl font-semibold text-dark">
              Danger zone
            </h2>
            <p className="mt-1 text-sm text-dark/70">
              Deleting your account permanently removes every journal entry, quick check in, group message,
              uploaded photo, and your account row. This cannot be undone, and we cannot recover it for you.
            </p>
            <button
              type="button"
              onClick={() => setShowDanger(true)}
              className="mt-4 inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-secondary px-5 text-sm font-semibold text-secondary hover:bg-secondary hover:text-white"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete my account and all data
            </button>
          </div>
        </div>
      </section>

      {showDanger ? (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center bg-dark/45 p-0 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-white p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="delete-title" className="font-display text-lg sm:text-xl font-semibold text-dark">
                Delete everything?
              </h2>
              <button
                type="button"
                onClick={() => setShowDanger(false)}
                aria-label="Close confirmation"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-dark/60 hover:bg-light"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-2 text-sm text-dark/70">
              This removes your journal entries, check ins, group messages, uploaded photos, and your account.
              There is no undo and no backup.
            </p>

            <label htmlFor="delete-confirm" className="field-label mt-4">
              Type DELETE to confirm
            </label>
            <input
              id="delete-confirm"
              type="text"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              className="field"
              placeholder="DELETE"
              autoComplete="off"
            />

            {deleteError ? (
              <p role="alert" className="mt-3 rounded-xl bg-secondary/10 p-3 text-sm text-dark">
                {deleteError}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowDanger(false)}
                className="inline-flex items-center justify-center min-h-[44px] flex-1 rounded-xl border border-dark/15 px-4 text-sm font-semibold text-dark"
              >
                Keep my account
              </button>
              <button
                type="button"
                onClick={deleteAccount}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 rounded-xl bg-secondary px-4 text-sm font-semibold text-white btn-secondary disabled:opacity-70"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {deleting ? 'Deleting' : 'Delete permanently'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
