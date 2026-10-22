import { z } from 'zod'
import { RESOURCE_CATEGORIES } from './constants'

export const moodSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])

export const basePostSchema = z.object({
  captchaToken: z.string().min(1, 'Please complete the verification step.').optional(),
  captchaV2Token: z.string().optional(),
})

export const registerSchema = basePostSchema.extend({
  email: z.string().trim().email('Enter a valid email address.').max(160),
  password: z
    .string()
    .min(8, 'Use at least 8 characters.')
    .max(120, 'That password is too long.'),
  displayName: z.string().trim().max(60, 'Keep your display name under 60 characters.').optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to the privacy notice to continue.' }),
  }),
})

export const journalSchema = basePostSchema.extend({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a valid date.'),
  mood: moodSchema,
  energy: z.coerce.number().int().min(1).max(10),
  text: z
    .string()
    .trim()
    .min(3, 'Write at least a few words, even a single sentence helps.')
    .max(6000, 'Please keep entries under 6000 characters.'),
  tags: z.array(z.enum(['work', 'family', 'sleep', 'anxiety', 'gratitude'])).max(5).default([]),
  photoUrl: z.string().url().max(500).optional().or(z.literal('').transform(() => undefined)),
})

export const checkInSchema = basePostSchema.extend({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  mood: moodSchema,
  note: z.string().trim().max(400, 'Keep it to one sentence.').default(''),
})

export const groupMessageSchema = basePostSchema.extend({
  groupSlug: z.string().trim().min(2).max(60),
  body: z
    .string()
    .trim()
    .min(2, 'Write a short message first.')
    .max(1200, 'Please keep messages under 1200 characters.'),
})

export const profileUpdateSchema = z.object({
  displayName: z.string().trim().max(60).optional(),
  prefs: z
    .object({
      dailyReminder: z.boolean().optional(),
      weeklyDigest: z.boolean().optional(),
    })
    .optional(),
})

export const enquirySchema = basePostSchema.extend({
  name: z.string().trim().min(2, 'Tell us your name.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(160),
  organisation: z.string().trim().max(160).optional(),
  topic: z.enum(['partnership', 'press', 'support', 'other']).default('partnership'),
  message: z.string().trim().min(10, 'A little more detail helps us reply well.').max(3000),
})

export const deleteAccountSchema = z.object({
  confirmation: z.literal('DELETE', {
    errorMap: () => ({ message: 'Type DELETE to confirm.' }),
  }),
})

export const resourceCategorySchema = z.enum(RESOURCE_CATEGORIES)
