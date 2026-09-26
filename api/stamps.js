import { Redis } from '@upstash/redis'

const STAMPS_PER_CARD = 10
const KEY = 'portfolio:stamp-total'

function getClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

function describe(total) {
  if (total <= 0) return { card: 1, count: 0, total: 0 }
  const card = Math.floor((total - 1) / STAMPS_PER_CARD) + 1
  const count = ((total - 1) % STAMPS_PER_CARD) + 1
  return { card, count, total }
}

export default async function handler(req, res) {
  const redis = getClient()
  if (!redis) {
    res.status(503).json({ error: 'Stamp storage is not configured yet.' })
    return
  }

  if (req.method === 'GET') {
    const total = Number((await redis.get(KEY)) ?? 0)
    res.status(200).json(describe(total))
    return
  }

  if (req.method === 'POST') {
    const total = await redis.incr(KEY)
    res.status(200).json(describe(total))
    return
  }

  res.setHeader('Allow', 'GET, POST')
  res.status(405).json({ error: 'Method not allowed' })
}
