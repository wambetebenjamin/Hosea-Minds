import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Storage helper.
 *
 * When KV_REST_API_URL and KV_REST_API_TOKEN are configured, Vercel KV is used
 * and everything is shared across server instances.
 *
 * Without them (local preview, or a deployment that has not connected a store
 * yet) the app falls back to a small JSON store on disk so the whole product
 * stays usable end to end. Nothing in the fallback path ever leaves the server.
 */

interface JsonClient {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: unknown): Promise<unknown>
  del(key: string): Promise<unknown>
}

async function restClient(): Promise<JsonClient | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null
  }
  try {
    const mod = await import('@vercel/kv')
    return mod.kv as unknown as JsonClient
  } catch {
    return null
  }
}

const DATA_DIR = process.env.HOSEA_DATA_DIR || path.join(process.cwd(), '.hosea-data')

function fileName(key: string): string {
  const safe = key.replace(/[^a-z0-9._-]/gi, '_')
  return path.join(DATA_DIR, `${safe}.json`)
}

async function readFileStore<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(fileName(key), 'utf8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeFileStore<T>(key: string, value: T): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(fileName(key), JSON.stringify(value), 'utf8')
  } catch {
    // Read only filesystems (such as a serverless bundle) simply skip the write.
  }
}

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  const kv = await restClient()
  if (kv) {
    try {
      const value = await kv.get<T>(key)
      return (value as T | null) ?? fallback
    } catch {
      // fall through to the local store on transient KV errors
    }
  }
  return readFileStore(key, fallback)
}

export async function writeJson<T>(key: string, value: T): Promise<void> {
  const kv = await restClient()
  if (kv) {
    try {
      await kv.set(key, value)
      return
    } catch {
      // fall through so the request still succeeds
    }
  }
  await writeFileStore(key, value)
}

export async function removeKey(key: string): Promise<void> {
  const kv = await restClient()
  if (kv) {
    try {
      await kv.del(key)
    } catch {
      // ignore
    }
  }
  try {
    await rm(fileName(key), { force: true })
  } catch {
    // ignore
  }
}

export function userKey(userId: string): string {
  return `hosea:user:${userId}`
}

export function emailKey(email: string): string {
  return `hosea:user-email:${email.trim().toLowerCase()}`
}

export function journalKey(userId: string): string {
  return `hosea:journal:${userId}`
}

export function checkinsKey(userId: string): string {
  return `hosea:checkins:${userId}`
}

export function membershipsKey(userId: string): string {
  return `hosea:memberships:${userId}`
}

export function groupMessagesKey(slug: string): string {
  return `hosea:group:${slug}:messages`
}

export function groupSeedKey(slug: string): string {
  return `hosea:group:${slug}:seeded`
}

export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}
