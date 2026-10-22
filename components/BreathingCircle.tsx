/**
 * CSS @keyframes only, no animation library and no JavaScript state. The
 * circle grows from 60px to 120px over four seconds, holds for one, and
 * contracts over four. The label alternates in sync. Under
 * prefers-reduced-motion the stylesheet freezes the circle and swaps the label
 * for the calmer "Breathe slowly and gently." line.
 */
export function BreathingCircle() {
  return (
    <div className="w-full flex justify-center py-8 sm:py-12">
      <div className="w-full max-w-md text-center px-4">
        <div className="breathing-stage mx-auto">
          <div className="breathing-circle" aria-hidden="true" />
        </div>

        <div className="breathe-label-slot mt-4 breathe-motion-only" aria-live="polite">
          <span className="breathe-label-in">Breathe in</span>
          <span className="breathe-label-out">Breathe out</span>
        </div>

        <p className="breathe-motionless mt-4 font-display text-base font-semibold text-dark">
          Breathe slowly and gently.
        </p>

        <p className="mt-2 text-xs text-dark/50">
          Four seconds in, one second of stillness, four seconds out. Let your shoulders drop, and stop at any
          time if it stops feeling comfortable.
        </p>
      </div>
    </div>
  )
}
