import nodemailer from 'nodemailer'
import { guardCaptcha, json, zodMessage } from '@/lib/api'
import { enquirySchema } from '@/lib/validation'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: zodMessage(parsed.error) }, 400)
  }

  const captcha = await guardCaptcha(parsed.data)
  if (captcha) return captcha

  const { name, email, organisation, topic, message } = parsed.data
  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER

  if (smtpHost && smtpUser && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: Number(process.env.SMTP_PORT ?? 587) === 465,
        auth: { user: smtpUser, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        from: process.env.SMTP_FROM ?? smtpUser,
        to: process.env.SMTP_FROM ?? smtpUser,
        replyTo: email,
        subject: `Hosea Minds enquiry: ${topic}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Organisation: ${organisation ?? 'not given'}`,
          `Topic: ${topic}`,
          '',
          message,
        ].join('\n'),
      })
    } catch {
      return json(
        {
          ok: false,
          error: 'We could not send that just now. Please email hello@hoseaminds.co.ke and we will reply.',
        },
        502,
      )
    }
  }

  return json({
    ok: true,
    message:
      'Thank you for reaching out. A member of our small team will reply within two working days. If this is urgent, please call Befrienders Kenya on 0800 723 253.',
  })
}
