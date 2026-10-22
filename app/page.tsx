import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Heart, MessageCircle, NotebookPen, Quote, ShieldCheck, Sparkles } from 'lucide-react'
import { HomeHero } from '@/components/HomeHero'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Helplines, HelplineStrip } from '@/components/Helplines'
import { Reveal, SectionTitle } from '@/components/ui'
import { PARTNERS, PRIVACY_PROMISES, TESTIMONIALS } from '@/lib/constants'

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Private by default',
                body: 'Your entries belong to you. Nothing is shared with other members or sold to anyone.',
              },
              {
                icon: MessageCircle,
                title: 'Community that listens',
                body: 'Seven peer groups, gently held. Read quietly, or speak when you are ready.',
              },
              {
                icon: Heart,
                title: 'Free, and made for Kenya',
                body: 'Written for our realities, with helplines that actually answer.',
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.15}>
                <div className="flex items-start gap-4 rounded-2xl bg-light/70 p-5 h-full">
                  <span className="icon-tile shrink-0 bg-white">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-display text-base sm:text-lg font-semibold text-dark">{item.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-dark/70">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6FBFE] py-14 sm:py-20" aria-labelledby="reality-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-[28px] border border-dark/5 shadow-[0_30px_60px_-45px_rgba(9,30,62,.6)]">
                  <Image
                    src="/images/journaling.jpg"
                    alt="A woman writing in a notebook in a calm, warmly lit room"
                    width={1200}
                    height={800}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 left-4 sm:left-8 max-w-[240px] rounded-2xl bg-white p-4 shadow-lg border border-dark/5">
                  <p className="font-display text-sm font-semibold text-primary">Two minutes is enough</p>
                  <p className="mt-1 text-xs text-dark/60">A mood, a sentence, the truth. That is a whole entry.</p>
                </div>
              </div>
            </Reveal>

            <div>
              <SectionTitle
                id="reality-heading"
                align="left"
                eyebrow="The reality we live in"
                title="Mental health in Kenya is real, and it is ours to speak about"
              />
              <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-dark/75">
                <p>
                  Many of us grew up hearing that feelings should be prayed away, pushed down, or kept from the
                  neighbours. So we carried things alone: exam pressure, job loss, grief, family expectations,
                  and the quiet weight of pretending we were fine.
                </p>
                <p>
                  Speaking about mental health is not weakness, and it is not a loss of faith. It is the same
                  instinct that takes you to a clinic when your body hurts. Your mind deserves that care too.
                </p>
                <p>
                  Hosea Minds exists to make the first step smaller. No diagnosis language, no forms in triplicate,
                  no one asking you to justify how you feel. Just a place to put things down, notice patterns,
                  and find people who understand.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRIVACY_PROMISES.map((promise) => (
                  <div key={promise} className="flex items-start gap-2 rounded-xl bg-white p-3 border border-dark/5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <p className="text-xs sm:text-sm text-dark/70">{promise}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 min-h-[44px] font-display text-sm font-semibold text-primary hover:text-secondary"
              >
                Why we built Hosea Minds
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="features-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            id="features-heading"
            eyebrow="Everything in one calm place"
            title="Small tools that help you keep going"
            description="Everything here is designed to take less energy than you think you have. You can use one part and ignore the rest."
          />
          <div className="mt-10">
            <FeatureGrid />
          </div>
        </div>
      </section>

      <section className="bg-light py-14 sm:py-20" aria-labelledby="how-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <SectionTitle
                id="how-heading"
                align="left"
                eyebrow="How it works"
                title="Three quiet steps, no pressure"
              />
              <ol className="mt-6 space-y-4">
                {[
                  {
                    icon: NotebookPen,
                    title: 'Write one entry',
                    body: 'Pick how you feel, slide your energy level, add a sentence or a page. Tags are optional.',
                  },
                  {
                    icon: Sparkles,
                    title: 'Notice your patterns',
                    body: 'The tracker turns your own entries into simple charts and plain observations, never guesses.',
                  },
                  {
                    icon: MessageCircle,
                    title: 'Find your people',
                    body: 'Join a peer group when it feels right. You can read for weeks before you say anything.',
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary font-display font-bold shadow-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-semibold text-dark">{step.title}</h3>
                      <p className="mt-1 text-sm text-dark/70 leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary"
                >
                  Create your free account
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] rounded-xl border border-dark/15 px-6 font-display font-semibold text-dark hover:border-primary hover:text-primary"
                >
                  Browse resources first
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="relative overflow-hidden rounded-[28px] border border-white shadow-[0_30px_70px_-50px_rgba(9,30,62,.7)]">
                  <Image
                    src="/images/nairobi-sunset.jpg"
                    alt="A warm dusk sky over the Nairobi skyline"
                    width={1200}
                    height={800}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(9,30,62,0.55),rgba(9,30,62,0.15))]" />
                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-2xl bg-white/92 p-4 sm:p-5 backdrop-blur">
                    <p className="font-display text-lg sm:text-xl font-semibold text-dark">
                      Your feelings are valid. Your journey is yours.
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-dark/70">
                      You do not have to arrive here with the right words. You just have to arrive.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="testimonials-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            id="testimonials-heading"
            eyebrow="In their own words"
            title="Quietly, people are telling the truth"
            description="Shared with permission, and anonymised by design. No real names, no photographs."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.2} className="h-full">
                <figure className="card-soft p-6 h-full flex flex-col">
                  <Quote className="h-7 w-7 text-secondary/60" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-sm sm:text-base leading-relaxed text-dark/75">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-dark/5 pt-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-light font-display text-lg font-bold text-primary"
                    >
                      {testimonial.initials}
                    </span>
                    <span>
                      <span className="block font-display text-sm font-semibold text-dark">
                        {testimonial.name}
                      </span>
                      <span className="block text-xs text-dark/50">{testimonial.detail}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-dark/50">
            Names are withheld at the request of our members. Quotes are edited only for length.
          </p>
        </div>
      </section>

      <HelplineStrip />

      <section className="py-14 sm:py-20" aria-labelledby="partners-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionTitle
                id="partners-heading"
                align="left"
                eyebrow="Working alongside"
                title="Organisations we point people towards"
                description="We do not replace professional care. When someone needs more than a peer group, these are the names we trust to say out loud."
              />
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PARTNERS.map((partner) => (
                  <li
                    key={partner}
                    className="rounded-xl border border-dark/10 bg-white px-4 py-5 font-display text-base sm:text-lg font-semibold text-dark"
                  >
                    {partner}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-dark/50">
                Listed as text only. We do not display logos we have no permission to use.
              </p>
            </div>
            <div>
              <Helplines />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[28px] bg-dark px-6 py-10 sm:px-10 sm:py-14 text-center">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Your mental health journey starts here
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-white/75">
                One entry today. That is the whole ask. The rest can wait until you are ready.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] rounded-xl bg-primary px-7 font-display font-semibold text-white btn-primary"
                >
                  Start free
                </Link>
                <Link
                  href="/check-in"
                  className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] rounded-xl border border-white/40 px-7 font-display font-semibold text-white hover:bg-white/10"
                >
                  Quick check in
                </Link>
              </div>
              <p className="mt-5 text-xs text-white/50">
                Hosea Minds is a self help tool, not a substitute for professional care.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
