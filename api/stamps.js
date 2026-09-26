import { Redis } from '@upstash/redis'

const STAMPS_PER_CARD = 10
const TOTAL_KEY = 'portfolio:stamp-total'
const POSITIONS_KEY = 'portfolio:stamp-positions'

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

async function currentStamps(redis, count) {
  if (count <= 0) return []
  const raw = await redis.lrange(POSITIONS_KEY, -count, -1)
  return raw.map(entry => (typeof entry === 'string' ? JSON.parse(entry) : entry))
}

export default async function handler(req, res) {
  const redis = getClient()
  if (!redis) {
    res.status(503).json({ error: 'Stamp storage is not configured yet.' })
    return
  }

  if (req.method === 'GET') {
    const total = Number((await redis.get(TOTAL_KEY)) ?? 0)
    const state = describe(total)
    const stamps = await currentStamps(redis, state.count)
    res.status(200).json({ ...state, stamps })
    return
  }

  if (req.method === 'POST') {
    const { x, y } = req.body ?? {}
    const nx = Number(x)
    const ny = Number(y)
    if (!Number.isFinite(nx) || !Number.isFinite(ny)) {
      res.status(400).json({ error: 'Expected numeric x and y (0-100).' })
      return
    }
    const total = await redis.incr(TOTAL_KEY)
    const state = describe(total)
    await redis.rpush(POSITIONS_KEY, JSON.stringify({ x: nx, y: ny }))
    const stamps = await currentStamps(redis, state.count)
    res.status(200).json({ ...state, stamps })
    return
  }

  res.setHeader('Allow', 'GET, POST')
  res.status(405).json({ error: 'Method not allowed' })
}
