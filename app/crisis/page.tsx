import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, HeartPulse, Phone, ShieldCheck, Wind } from 'lucide-react'
import { BreathingCircle } from '@/components/BreathingCircle'
import { WhatsAppIcon } from '@/components/icons'
import { CRISIS_WHATSAPP_LINK, EMERGENCY_NUMBER, HELPLINES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Crisis support',
  description:
    'Free mental health helplines in Kenya, a grounding exercise, and a breathing exercise. No sign in, no forms, no friction.',
}

const grounding = [
  { count: 5, sense: 'things you can see', detail: 'Look slowly around the room. Name each one.' },
  { count: 4, sense: 'things you can feel', detail: 'Your feet on the floor, your clothes, the chair, the air.' },
  { count: 3, sense: 'things you can hear', detail: 'Near sounds, then far ones. A fan, a road, your own breath.' },
  { count: 2, sense: 'things you can smell', detail: 'Or two smells you love, if there is nothing nearby.' },
  { count: 1, sense: 'thing you can taste', detail: 'Or one kind thing you can say to yourself.' },
]

export default function CrisisPage() {
  return (
    <>
      <section className="bg-[#FFF7F3] border-b border-secondary/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              <HeartPulse className="h-4 w-4" aria-hidden="true" />
              Free, confidential, always open
            </p>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-dark">
              You are not alone. Help is here.
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/75">
              Nothing on this page asks you to sign in, fill in a form, or explain yourself. If you can only do
              one thing, call one of the numbers below. A real person will answer.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14" aria-labelledby="helplines">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="helplines" className="font-display text-2xl sm:text-3xl text-dark">
            Call someone now
          </h2>
          <p className="mt-2 text-sm sm:text-base text-dark/70">
            These lines are free and confidential. You can call about anything, not only emergencies.
          </p>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {HELPLINES.map((line) => (
              <li key={line.name} className="rounded-2xl bg-white p-5 sm:p-6 border border-dark/10 shadow-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-dark/50">{line.name}</p>
                <a
                  href={`tel:${line.tel}`}
                  className="mt-1 inline-flex items-center gap-2 min-h-[44px] font-display text-2xl sm:text-3xl font-bold text-dark hover:text-secondary"
                >
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-secondary" aria-hidden="true" />
                  {line.number}
                </a>
                <p className="mt-1 text-sm text-dark/60">{line.note}</p>
                <a
                  href={`tel:${line.tel}`}
                  className="mt-3 inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto rounded-xl bg-secondary px-5 text-sm font-semibold text-white btn-secondary"
                >
                  Call {line.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border-2 border-secondary bg-white p-5 sm:p-6">
            <p className="text-sm sm:text-base font-semibold text-secondary">
              If you are in immediate danger, call 999 now.
            </p>
            <a
              href={`tel:${EMERGENCY_NUMBER.tel}`}
              className="mt-1 inline-flex items-center gap-2 min-h-[44px] font-display text-3xl sm:text-4xl font-bold text-dark"
            >
              <Phone className="h-6 w-6 text-secondary" aria-hidden="true" />
              {EMERGENCY_NUMBER.number}
            </a>
            <p className="mt-2 text-sm text-dark/70">
              Emergency services are free from any phone in Kenya. If you can, stay on the line and tell them
              where you are.
            </p>
          </div>

          <a
            href={CRISIS_WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex w-full sm:w-auto items-center justify-center gap-3 min-h-[48px] rounded-xl bg-[#25D366] px-6 font-display font-semibold text-white shadow-sm"
          >
            <WhatsAppIcon className="h-6 w-6" />
            WhatsApp someone now
          </a>
          <p className="mt-2 text-xs text-dark/50">
            If you cannot speak, WhatsApp works. You can type instead of talking.
          </p>
        </div>
      </section>

      <section className="bg-light py-10 sm:py-14" aria-labelledby="steps">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="steps" className="font-display text-2xl sm:text-3xl text-dark">
            If today feels unsafe, take these steps in order
          </h2>
          <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Call 999',
                body: 'If you are in immediate danger, call emergency services now. You do not need permission.',
              },
              {
                title: 'Move somewhere safer',
                body: 'Go to a room with another person, a shop, a neighbour, or a public place. Company helps.',
              },
              {
                title: 'Call a helpline',
                body: 'Befrienders Kenya on 0800 723 253 will stay on the line with you for as long as you need.',
              },
              {
                title: 'Tell one person',
                body: 'A friend, an aunt, a colleague. "I am not okay right now" is a complete sentence.',
              },
            ].map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white p-5 border border-dark/5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-light font-display font-bold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-display text-base sm:text-lg font-semibold text-dark">{step.title}</h3>
                <p className="mt-1 text-sm text-dark/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-10 sm:py-14" aria-labelledby="grounding">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-dark/5 p-5 sm:p-8">
            <h2 id="grounding" className="flex items-center gap-2 font-display text-2xl sm:text-3xl text-dark">
              <Wind className="h-6 w-6 text-primary" aria-hidden="true" />
              The 5 4 3 2 1 grounding exercise
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-dark/70">
              You can do this anywhere, and you do not have to do it perfectly. Say each item quietly to
              yourself, or simply notice it. Go slowly.
            </p>
            <ol className="mt-5 space-y-3">
              {grounding.map((item) => (
                <li key={item.count} className="flex items-start gap-3 rounded-xl bg-light p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-lg font-bold text-primary">
                    {item.count}
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-dark">
                      {item.count} {item.sense}
                    </p>
                    <p className="mt-0.5 text-sm text-dark/65">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-dark/60">
              When you reach one, breathe out slowly and look around the room once more. You are here.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F6FBFE] py-10 sm:py-14" aria-labelledby="breathing">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="breathing" className="font-display text-2xl sm:text-3xl text-dark">
              Breathe with the circle
            </h2>
            <p className="mt-2 text-sm sm:text-base text-dark/70">
              Match your breath to the circle for as long as feels comfortable. You can stop at any time. If
              you feel dizzy, breathe normally and sit down.
            </p>
          </div>
          <BreathingCircle />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-light p-5 sm:p-7">
              <h2 className="font-display text-xl font-semibold text-dark">What happens when you call</h2>
              <ul className="mt-3 space-y-2 text-sm text-dark/70">
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  Someone answers and asks how you are. You can say as little as you like.
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  Calls are confidential. You do not have to give your name.
                </li>
                <li className="flex items-start gap-2">
                  <HeartPulse className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  You will not be judged, and you will not be told to be grateful.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-5 sm:p-7 border border-dark/5">
              <h2 className="font-display text-xl font-semibold text-dark">When this page is not enough</h2>
              <p className="mt-2 text-sm text-dark/70">
                Hosea Minds is not a crisis intervention service. Our journal and peer groups are gentle
                companions, not emergency care. If you need urgent help, please use the numbers above, or go to
                the nearest hospital emergency department.
              </p>
              <p className="mt-3 text-sm text-dark/70">
                When you are ready, and not before, you can{' '}
                <Link href="/resources" className="link-underline font-semibold text-primary">
                  read a self help resource
                </Link>{' '}
                or{' '}
                <Link href="/groups" className="link-underline font-semibold text-primary">
                  find a peer group
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
