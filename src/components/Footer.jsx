import { useEffect, useRef, useState } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }
const STAMPS_PER_CARD = 8
// 3x3 grid: 8 stampable circles plus the fixed dashed cup slot in the last cell
const GRID_SLOTS = 9
const STAMP_IMAGES = [
  '/images/footer/stamp-mark.png',
  '/images/footer/stamp-beans.png',
  '/images/footer/stamp-coffee.png',
  '/images/footer/stamp-crossaint.png',
  '/images/footer/stamp-toast.png',
]
const STAMP_SIZES = [60, 52, 52, 52, 52]
const CURSOR_IMAGES = [
  { src: '/images/footer/cursor-stamp-mark.png', hotspot: [21, 24] },
  { src: '/images/footer/cursor-stamp-beans.png', hotspot: [24, 17] },
  { src: '/images/footer/cursor-stamp-coffee.png', hotspot: [24, 18] },
  { src: '/images/footer/cursor-stamp-crossaint.png', hotspot: [24, 15] },
  { src: '/images/footer/cursor-stamp-toast.png', hotspot: [21, 24] },
]

function pickNextImg(excludeImg) {
  const choices = [0, 1, 2, 3, 4].filter(i => i !== excludeImg)
  return choices[Math.floor(Math.random() * choices.length)]
}

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Stamp({ x, y, img }) {
  const src = STAMP_IMAGES[img] ?? STAMP_IMAGES[0]
  const size = STAMP_SIZES[img] ?? 52
  return (
    <span
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        width: size, height: size,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt=""
        className="footer-stamp-pop"
        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', display: 'block' }}
      />
    </span>
  )
}

function StampCard({ card, stamps, onStamp, canStamp, cardAnim, nextImg }) {
  const cursor = CURSOR_IMAGES[nextImg] ?? CURSOR_IMAGES[0]
  return (
    <div className="footer-stampcard-wrap" style={{ position: 'relative', width: 470, aspectRatio: '470 / 247', flexShrink: 0 }}>
      {/* Older card peeking out from behind for depth */}
      <div
        aria-hidden="true"
        className="footer-stampcard-back"
        style={{
          position: 'absolute', left: -18, top: 18, width: 380, height: 196,
          transform: 'rotate(-4deg)',
        }}
      >
        {/* The artwork has a soft shadow baked into transparent padding, so it's oversized to keep the card edge on the box */}
        <img src="/images/footer/stampcard-back.png" alt="" style={{ position: 'absolute', left: '-3.6%', top: '-5.8%', width: '107.1%', maxWidth: 'none', display: 'block' }} />
      </div>
      {/* Active card */}
      <button
        type="button"
        onClick={onStamp}
        disabled={!canStamp || stamps.length >= STAMPS_PER_CARD}
        className={`footer-stampcard${cardAnim === 'leaving' ? ' footer-card-leaving' : cardAnim === 'entering' ? ' footer-card-entering' : ''}`}
        style={{
          position: 'absolute', inset: 0,
          background: '#B2C9EA',
          boxShadow: '0px 2px 16px rgba(16,22,23,0.05)',
          border: 'none', padding: 0, cursor: canStamp ? `url(${cursor.src}) ${cursor.hotspot[0]} ${cursor.hotspot[1]}, pointer` : 'default',
          display: 'block', textAlign: 'left',
          WebkitTapHighlightColor: 'transparent', overflow: 'hidden',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/footer/paper-texture.svg)', backgroundSize: '200px 200px', opacity: 0.3, pointerEvents: 'none' }} />
        <img src="/images/footer/stampcard-title-v2.png" alt="Visitor Stamp Card" className="footer-stampcard-title" style={{ position: 'absolute', left: 0, top: '41%', width: '44%', height: 'auto', display: 'block', pointerEvents: 'none' }} />
        <span className="footer-stampcard-meta" style={{ ...dm, position: 'absolute', left: '5.3%', top: '76%', fontSize: 14, lineHeight: '1.2em', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#FCF9F2', pointerEvents: 'none' }}>
          Card No.{card}<br />{stamps.length} of {STAMPS_PER_CARD} stamped
        </span>
        <div
          aria-hidden="true"
          className="footer-stampcard-circles"
          style={{
            position: 'absolute', right: '5.5%', top: '50%', transform: 'translateY(-50%)',
            display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 12, pointerEvents: 'none',
          }}
        >
          {Array.from({ length: GRID_SLOTS }, (_, i) => (
            i === GRID_SLOTS - 1 ? (
              <div key={i} className="footer-stampcard-circle footer-stampcard-next" style={{ width: 62, height: 62, borderRadius: '50%', border: '2px dashed #F3F3F3', boxSizing: 'border-box', position: 'relative', flexShrink: 0 }}>
                <img src="/images/footer/stampcard-cup.png" alt="" style={{ position: 'absolute', inset: -2, width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }} />
              </div>
            ) : (
              <div key={i} className="footer-stampcard-circle" style={{ width: 62, height: 62, borderRadius: '50%', background: '#FCF9F2', flexShrink: 0 }} />
            )
          ))}
        </div>
        {stamps.map((s, i) => (
          <Stamp key={`${card}-${i}`} x={s.x} y={s.y} img={s.img} />
        ))}
      </button>
    </div>
  )
}

export default function Footer({ id }) {
  const [stampState, setStampState] = useState({ card: 1, count: 0, total: 0, stamps: [] })
  const [canStamp, setCanStamp] = useState(false)
  const [cardAnim, setCardAnim] = useState('idle')
  const [nextImg, setNextImg] = useState(() => pickNextImg())
  // Tracks which card number we've already scheduled the leave/reset/enter
  // sequence for, so the effect below can never fire it twice for the same
  // completed card (StrictMode double-invokes effects in dev, and without
  // this guard a rapid-fire double-render could trigger it twice too).
  const rolloverHandledRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/stamps')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled || !data) return
        setStampState(data)
        setCanStamp(true)
        const lastImg = data.stamps?.[data.stamps.length - 1]?.img
        setNextImg(pickNextImg(lastImg))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Drive the "card full" transition off the actual rendered state rather
  // than a value captured in the click handler's closure — that closure can
  // go stale (e.g. two clicks landing before React re-renders in between),
  // which was letting the 10th stamp occasionally land without ever
  // triggering the rollover.
  useEffect(() => {
    if (stampState.count === STAMPS_PER_CARD && rolloverHandledRef.current !== stampState.card) {
      rolloverHandledRef.current = stampState.card
      const completedCard = stampState.card
      setTimeout(() => setCardAnim('leaving'), 500)
      setTimeout(() => {
        setStampState(p => (p.card === completedCard ? { card: p.card + 1, count: 0, total: p.total, stamps: [] } : p))
        setCardAnim('entering')
      }, 950)
      setTimeout(() => setCardAnim('idle'), 1350)
    }
  }, [stampState.count, stampState.card])

  const handleStamp = (e) => {
    if (!canStamp || stampState.count >= STAMPS_PER_CARD) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.min(94, Math.max(6, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.min(82, Math.max(22, ((e.clientY - rect.top) / rect.height) * 100))
    const img = nextImg
    setCanStamp(false)
    setNextImg(pickNextImg(img))

    // Render the stamp immediately instead of waiting on the network round
    // trip — we already know exactly what will be stamped (x/y/img), so
    // there's no reason the pop-in should lag behind the click.
    setStampState(prev => ({ ...prev, count: prev.count + 1, total: prev.total + 1, stamps: [...prev.stamps, { x, y, img }] }))

    fetch('/api/stamps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y, img }),
    })
      .then(() => setCanStamp(true))
      .catch(() => setCanStamp(true))
  }

  return (
    <footer id={id} className="w-full bg-[#F3F3F3]">
      <style>{`
        @keyframes footerStampPop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .footer-stamp-pop { animation: footerStampPop 0.4s ease; }
        .footer-stampcard { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .footer-stampcard:not(:disabled):hover { transform: translateY(-4px); box-shadow: 0px 8px 24px rgba(16,22,23,0.14); }
        .footer-stampcard:not(:disabled):active { transform: translateY(-1px) scale(0.99); }
        @keyframes footerCardLeave {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(-36px) rotate(7deg) scale(0.94); opacity: 0; }
        }
        @keyframes footerCardEnter {
          0% { transform: translateY(16px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .footer-card-leaving { animation: footerCardLeave 0.45s ease forwards; }
        .footer-card-entering { animation: footerCardEnter 0.4s ease; }
        @media (max-width: 900px) {
          .site-footer-top { flex-direction: column !important; align-items: center !important; text-align: center; }
          .site-footer-identity { align-items: center !important; text-align: center !important; }
          .site-footer-bottom { align-items: center !important; text-align: center !important; }
          .footer-stampcard-wrap { width: 100% !important; max-width: 470px; }
          .footer-stampcard-back { left: -3% !important; top: 14px !important; width: 94% !important; height: 84% !important; }
          .footer-stampcard-circles { gap: 8px !important; }
          .footer-stampcard-circle { width: 52px !important; height: 52px !important; }
        }
        @media (max-width: 480px) {
          .footer-stampcard-circles { gap: 6px !important; }
          .footer-stampcard-circle { width: 42px !important; height: 42px !important; }
          .footer-stampcard-meta { font-size: 11px !important; }
        }
        .footer-social-link { min-height: 44px; padding: 8px 0; }
      `}</style>
      <div className="site-footer-inner flex flex-col" style={{ maxWidth: 1280, margin: '0 auto', padding: '61px 40px 60px', gap: 70 }}>
        <div className="site-footer-top flex flex-col lg:flex-row justify-between items-start lg:items-center" style={{ gap: 48 }}>
          <div className="site-footer-identity flex flex-col" style={{ gap: 32, maxWidth: 447 }}>
            <h2 className="text-black text-[48px] leading-[48px]" style={{ ...dm, fontWeight: 800 }}>
              Thanks for
              <br />stopping by!
            </h2>
            <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={dm}>
              I&apos;m currently available for new work.
              <br />Feel free to grab a virtual coffee with me via{' '}
              <a href="mailto:celine900423lu@gmail.com" className="underline hover:opacity-70 transition-opacity">email</a>!
            </p>
          </div>
          <StampCard
            card={stampState.card}
            stamps={stampState.stamps ?? []}
            onStamp={handleStamp}
            canStamp={canStamp}
            cardAnim={cardAnim}
            nextImg={nextImg}
          />
        </div>
        <div className="site-footer-bottom flex flex-col sm:flex-row justify-between items-start sm:items-center" style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24, gap: 16 }}>
          <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={dm}>
            Crafted with Cursor, Claude Code, and too much caffeine.
          </p>
          <div className="flex items-center" style={{ gap: 38 }}>
            <a href="https://www.linkedin.com/in/celine-tseng" target="_blank" rel="noopener noreferrer" className="footer-social-link flex items-center hover:opacity-70 transition-opacity">
              <span className="text-[#4A77FF] text-[17px] leading-[27px]" style={{ ...dm, fontWeight: 500 }}>LinkedIn</span>
              <ArrowDiagonal />
            </a>
            <a href="mailto:celine900423lu@gmail.com" className="footer-social-link flex items-center hover:opacity-70 transition-opacity">
              <span className="text-[#4A77FF] text-[17px] leading-[27px]" style={{ ...dm, fontWeight: 500 }}>Email</span>
              <ArrowDiagonal />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
