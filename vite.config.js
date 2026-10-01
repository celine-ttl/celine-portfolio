import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const STAMPS_PER_CARD = 10
const STAMP_IMAGE_COUNT = 5

// Dev-only mock for /api/stamps so the stamp card is clickable under
// `npm run dev` without real Upstash credentials. Vercel's own serverless
// runtime handles /api in production, so this never runs there.
function mockStampsApi() {
  let card = 1
  let total = 0
  let stamps = []

  function pickImage(prevImg) {
    const choices = Array.from({ length: STAMP_IMAGE_COUNT }, (_, i) => i).filter(i => i !== prevImg)
    return choices[Math.floor(Math.random() * choices.length)]
  }

  return {
    name: 'mock-stamps-api',
    configureServer(server) {
      server.middlewares.use('/api/stamps', (req, res) => {
        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ card, count: stamps.length, total, stamps }))
          return
        }
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            const { x, y, img: requestedImg } = body ? JSON.parse(body) : {}
            const last = stamps[stamps.length - 1]
            const isValid = Number.isInteger(requestedImg) && requestedImg >= 0 && requestedImg < STAMP_IMAGE_COUNT
            const img = isValid && requestedImg !== last?.img ? requestedImg : pickImage(last?.img)
            stamps.push({ x: Number(x), y: Number(y), img })
            total++
            if (stamps.length > STAMPS_PER_CARD) {
              stamps = [stamps[stamps.length - 1]]
              card++
            }
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ card, count: stamps.length, total, stamps }))
          })
          return
        }
        res.statusCode = 405
        res.end()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockStampsApi()],
})
