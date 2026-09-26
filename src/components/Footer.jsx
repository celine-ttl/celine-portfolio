import { useEffect, useState } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }
const STAMPS_PER_CARD = 10

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Stamp({ x, y }) {
  const rotate = ((Math.round(x * 7 + y * 13) % 30) - 15)
  return (
    <span
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        width: 52, height: 52,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        pointerEvents: 'none', display: 'block',
      }}
    >
      <img
        src="/images/footer/stamp-mark.png"
        alt=""
        className="footer-stamp-pop"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </span>
  )
}

function StampCard({ card, count, stamps, onStamp, canStamp, cardAnim }) {
  return (
    <div className="footer-stampcard-wrap" style={{ position: 'relative', width: 470, height: 270, flexShrink: 0 }}>
      {/* Older card peeking out from behind for depth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: -18, top: 18, width: 380, height: 196,
          background: '#B2C5DB',
          boxShadow: '0px 2px 12px rgba(16,22,23,0.05)',
          transform: 'rotate(-4deg)',
        }}
      />
      {/* Active card */}
      <button
        type="button"
        onClick={onStamp}
        disabled={!canStamp}
        className={`footer-stampcard${cardAnim === 'leaving' ? ' footer-card-leaving' : cardAnim === 'entering' ? ' footer-card-entering' : ''}`}
        style={{
          position: 'absolute', inset: 0,
          background: '#C8DBF1',
          boxShadow: '0px 2px 16px rgba(16,22,23,0.05)',
          border: 'none', padding: '28px 32px', cursor: canStamp ? 'url(/images/footer/stamp-cursor.png) 21 24, pointer' : 'default',
          display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'left',
          WebkitTapHighlightColor: 'transparent', overflow: 'hidden',
        }}
      >
        <img src="/images/footer/stampcard-title.png" alt="Visitor Stamp Card" style={{ height: 36, width: 'auto', display: 'block', objectFit: 'contain', marginTop: -8 }} />
        <img src="/images/footer/footer-coffee.png" alt="" style={{ position: 'absolute', right: -20, bottom: -30, width: 130, height: 130, opacity: 0.9, pointerEvents: 'none' }} />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, calc(-50% + 4px))',
            display: 'flex', flexDirection: 'column', gap: 12, pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: 20 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{ width: 64, height: 64, borderRadius: '50%', background: '#FCF9F2', flexShrink: 0 }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[5, 6, 7, 8, 9].map(i => (
              <div key={i} style={{ width: 64, height: 64, borderRadius: '50%', background: '#FCF9F2', flexShrink: 0 }} />
            ))}
          </div>
        </div>
        {stamps.map((s, i) => (
          <Stamp key={`${card}-${i}`} x={s.x} y={s.y} />
        ))}
        <span style={{ ...dm, fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#B40205', marginTop: 'auto', transform: 'translateY(4px)' }}>
          Card No.{card} · {count} {count === 1 ? 'stamp' : 'stamps'} collected
        </span>
      </button>
    </div>
  )
}

export default function Footer({ id }) {
  const [stampState, setStampState] = useState({ card: 1, count: 0, stamps: [] })
  const [canStamp, setCanStamp] = useState(false)
  const [cardAnim, setCardAnim] = useState('idle')

  useEffect(() => {
    let cancelled = false
    fetch('/api/stamps')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled || !data) return
        setStampState(data)
        setCanStamp(true)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const handleStamp = (e) => {
    if (!canStamp) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.min(94, Math.max(6, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.min(82, Math.max(22, ((e.clientY - rect.top) / rect.height) * 100))
    setCanStamp(false)
    fetch('/api/stamps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y }),
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data) { setCanStamp(true); return }
        setStampState(data)
        setCanStamp(true)
        if (data.count === STAMPS_PER_CARD) {
          setTimeout(() => setCardAnim('leaving'), 500)
          setTimeout(() => {
            setStampState(prev => (prev.card === data.card ? { card: data.card + 1, count: 0, stamps: [] } : prev))
            setCardAnim('entering')
          }, 950)
          setTimeout(() => setCardAnim('idle'), 1350)
        }
      })
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
          .site-footer-top { flex-direction: column !important; align-items: flex-start !important; }
          .footer-stampcard-wrap { width: 100% !important; max-width: 470px; height: 260px !important; }
        }
      `}</style>
      <div className="site-footer-inner flex flex-col" style={{ maxWidth: 1280, margin: '0 auto', padding: '61px 40px 60px', gap: 70 }}>
        <div className="site-footer-top flex flex-col lg:flex-row justify-between items-start lg:items-center" style={{ gap: 48 }}>
          <div className="site-footer-identity flex flex-col" style={{ gap: 32, maxWidth: 447 }}>
            <h2 className="text-black text-[48px] leading-[48px]" style={{ ...dm, fontWeight: 800 }}>
              Let&apos;s work together!
            </h2>
            <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={dm}>
              I&apos;m currently available for new work.
              <br />Feel free to grab a virtual coffee with me via{' '}
              <a href="mailto:celine900423lu@gmail.com" className="underline hover:opacity-70 transition-opacity">email</a>!
            </p>
          </div>
          <StampCard
            card={stampState.card}
            count={stampState.count}
            stamps={stampState.stamps ?? []}
            onStamp={handleStamp}
            canStamp={canStamp}
            cardAnim={cardAnim}
          />
        </div>
        <div className="site-footer-bottom flex flex-col sm:flex-row justify-between items-start sm:items-center" style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24, gap: 16 }}>
          <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={dm}>
            Crafted with Cursor, Claude Code, and too much caffeine.
          </p>
          <div className="flex items-center" style={{ gap: 38 }}>
            <a href="https://www.linkedin.com/in/celine-tseng" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-70 transition-opacity">
              <span className="text-[#4A77FF] text-[17px] leading-[27px]" style={{ ...dm, fontWeight: 500 }}>Linkedin</span>
              <ArrowDiagonal />
            </a>
            <a href="mailto:celine900423lu@gmail.com" className="flex items-center hover:opacity-70 transition-opacity">
              <span className="text-[#4A77FF] text-[17px] leading-[27px]" style={{ ...dm, fontWeight: 500 }}>Email</span>
              <ArrowDiagonal />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
