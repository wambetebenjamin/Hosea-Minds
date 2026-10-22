export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-white" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-dark [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-secondary [animation-delay:300ms]" />
        </div>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-primary">Hosea Minds</p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  )
}
