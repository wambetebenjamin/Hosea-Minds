import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HeartHandshake, Leaf, ShieldCheck, Users } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Helplines } from '@/components/Helplines'
import { EnquiryForm } from '@/components/EnquiryForm'
import { Reveal, SectionTitle } from '@/components/ui'
import { PARTNERS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Hosea Minds is a community mental health tracker and journal built in Nairobi, Kenya. Meet the team and read our clinical advisory note.',
}

const team = [
  {
    name: 'Achieng Otieno',
    role: 'Co founder, community and peer support',
    image: '/images/portrait-woman-1.jpg',
    bio: 'Fifteen years organising community health groups in Nairobi and Kisumu. Believes the best support often arrives as a conversation, not a diagnosis.',
  },
  {
    name: 'Wanjiku Mwangi',
    role: 'Co founder, product and privacy',
    image: '/images/portrait-woman-2.jpg',
    bio: 'Builds tools that treat personal data as something borrowed, not owned. Leads our data protection work under the KDPA 2019.',
  },
  {
    name: 'Brian Kimani',
    role: 'Clinical advisory, counselling psychology',
    image: '/images/portrait-man-1.jpg',
    bio: 'Counselling psychologist working with young men and students. Reviews every resource before it is published.',
  },
  {
    name: 'Joseph Mutiso',
    role: 'Community facilitator',
    image: '/images/portrait-man-2.jpg',
    bio: 'Holds the men and mental health and work burnout groups. Trained in psychological first aid and group facilitation.',
  },
]

const values = [
  {
    icon: HeartHandshake,
    title: 'Non clinical by design',
    body: 'We do not diagnose, score, or label. The language here is plain, human, and free of jargon borrowed from hospital corridors.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy is the product',
    body: 'Sensitive data demands seriousness. Your entries are never sold, never shared, and never used to target advertising.',
  },
  {
    icon: Users,
    title: 'Community over content',
    body: 'Peer groups are the heart of Hosea Minds. The tools exist to help people stay connected long enough to feel less alone.',
  },
  {
    icon: Leaf,
    title: 'Made for Kenyan life',
    body: 'Matatus, exam pressure, family expectations, hustles, faith, and grief. Resources are written with those realities in mind.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Hosea Minds"
        title="Built by Kenyans who got tired of carrying it quietly"
        intro="Hosea Minds began as a shared journal between four friends in Nairobi, each of us managing something we did not have the words for. We built the tool we wished we had found first."
      />

      <section className="py-10 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div className="overflow-hidden rounded-[28px] border border-dark/5 shadow-[0_30px_60px_-45px_rgba(9,30,62,.6)]">
                <Image
                  src="/images/connection.jpg"
                  alt="Two women sitting together, listening to one another in a warm room"
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionTitle
                id="mission-heading"
                align="left"
                eyebrow="Our mission"
                title="Make the first step smaller, and warmer"
              />
              <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-dark/75">
                <p>
                  Most people in Kenya will never walk into a counsellor&apos;s office for a first session. Not
                  because support would not help, but because the step is too big: money, language, stigma, a
                  waiting room with neighbours in it.
                </p>
                <p>
                  So we built something smaller. A journal that takes two minutes. A mood tracker that shows
                  patterns instead of conclusions. Peer groups where speaking is optional. Everything is free,
                  and none of it requires you to call yourself a patient.
                </p>
                <p>
                  We are not the last step. We are a gentle first one, and we work hard to connect people to
                  real, qualified care when that is what they need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-12 sm:py-16" aria-labelledby="values-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            id="values-heading"
            eyebrow="What we hold to"
            title="Four things we refuse to compromise"
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.15} className="h-full">
                <div className="card-soft p-5 h-full">
                  <span className="icon-tile">
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base sm:text-lg font-semibold text-dark">{value.title}</h3>
                  <p className="mt-2 text-sm text-dark/70 leading-relaxed">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="advisory-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#FFF7F3] border border-secondary/20 p-6 sm:p-10">
            <h2 id="advisory-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl text-dark">
              Clinical advisory note
            </h2>
            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-dark/75 max-w-3xl">
              <p>
                Hosea Minds is a self help tool, not a substitute for professional care. Nothing on this
                platform diagnoses a condition, prescribes treatment, or replaces assessment by a qualified
                mental health professional.
              </p>
              <p>
                Our journal prompts, resources, and tracker observations are general wellbeing support, reviewed
                by a counselling psychologist registered in Kenya. They are written to be safe and gentle, but
                they cannot account for your full history or circumstances.
              </p>
              <p>
                If you are experiencing thoughts of ending your life, are unable to keep yourself safe, or are
                seeing changes in your sleep, appetite, or functioning that last more than two weeks, please
                speak to a health worker or call a helpline immediately. Peer groups are not crisis care.
              </p>
              <p>
                In an emergency, call 999. You do not need an appointment or an account for that call.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16" aria-labelledby="team-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            id="team-heading"
            eyebrow="The team"
            title="A small team, close to the work"
            description="We are four people, supported by facilitators and a clinical reviewer. Photographs are illustrative of our team's work in the community."
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.15} className="h-full">
                <article className="card-soft overflow-hidden h-full flex flex-col">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    width={640}
                    height={640}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw"
                    className="h-56 w-full object-cover object-center"
                  />
                  <div className="p-5 flex-1">
                    <h3 className="font-display text-lg font-semibold text-dark">{member.name}</h3>
                    <p className="text-xs uppercase tracking-wide text-primary">{member.role}</p>
                    <p className="mt-2 text-sm text-dark/70 leading-relaxed">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20" aria-labelledby="partners-heading">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <SectionTitle
                id="partners-heading"
                align="left"
                eyebrow="Partner organisations"
                title="Where we send people for more"
                description="We list these organisations as text only, out of respect for their brand and their work. We do not display logos we have no permission to use."
              />
              <ul className="mt-5 space-y-3">
                {PARTNERS.map((partner) => (
                  <li key={partner} className="rounded-xl border border-dark/10 bg-white p-4">
                    <p className="font-display text-base sm:text-lg font-semibold text-dark">{partner}</p>
                    <p className="mt-1 text-sm text-dark/60">
                      Free helpline and referral support for people across Kenya, at any hour.
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-dark/60">
                Interested in working with us?{' '}
                <Link href="/about#contact" className="link-underline font-semibold text-primary">
                  Send a partnership enquiry
                </Link>
                .
              </p>
            </div>
            <Helplines />
          </div>
        </div>
      </section>

      <section id="contact" className="pb-16 sm:pb-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <SectionTitle
                id="contact-heading"
                align="left"
                eyebrow="Talk to us"
                title="Partnerships, press, and quiet questions"
                description="We are a small team and we answer our own messages, usually within two working days. For anything urgent, please call a helpline instead of waiting for a reply."
              />
              <ul className="mt-5 space-y-3 text-sm text-dark/70">
                <li className="rounded-xl bg-light p-4">
                  <span className="block font-display font-semibold text-dark">Email</span>
                  hello@hoseaminds.co.ke
                </li>
                <li className="rounded-xl bg-light p-4">
                  <span className="block font-display font-semibold text-dark">WhatsApp</span>
                  +254 112 272 061, Monday to Saturday, 8am to 6pm
                </li>
                <li className="rounded-xl bg-light p-4">
                  <span className="block font-display font-semibold text-dark">Post</span>
                  Nairobi, Kenya
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
