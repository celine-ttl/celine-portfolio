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

function StampSlot({ filled, justStamped }) {
  return (
    <div
      className={justStamped ? 'footer-stamp-pop' : undefined}
      style={{ width: 64, height: 64, borderRadius: '50%', background: '#FCF9F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      {filled && <img src="/images/footer/stamp-mark.png" alt="" style={{ width: 40, height: 'auto', display: 'block' }} />}
    </div>
  )
}

function StampCard({ card, count, onStamp, canStamp, justStampedAt }) {
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
        className="footer-stampcard"
        style={{
          position: 'absolute', inset: 0,
          background: '#C8DBF1',
          boxShadow: '0px 2px 16px rgba(16,22,23,0.05)',
          border: 'none', padding: '28px 32px', cursor: canStamp ? 'url(/images/footer/stamp-cursor.png) 21 24, pointer' : 'default',
          display: 'flex', flexDirection: 'column', gap: 18, textAlign: 'left',
          WebkitTapHighlightColor: 'transparent', overflow: 'hidden',
        }}
      >
        <img src="/images/footer/stampcard-title.png" alt="Visitor Stamp Card" style={{ height: 36, width: 'auto', display: 'block', objectFit: 'contain' }} />
        <img src="/images/footer/footer-coffee.png" alt="" style={{ position: 'absolute', right: -20, bottom: -30, width: 130, height: 130, opacity: 0.9, pointerEvents: 'none' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <StampSlot key={i} filled={i < count} justStamped={i === justStampedAt} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[5, 6, 7, 8, 9].map(i => (
              <StampSlot key={i} filled={i < count} justStamped={i === justStampedAt} />
            ))}
          </div>
        </div>
        <span style={{ ...dm, fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#B40205' }}>
          Card No.{card} · {count} of {STAMPS_PER_CARD} stamped
        </span>
      </button>
    </div>
  )
}

export default function Footer({ id }) {
  const [stampState, setStampState] = useState({ card: 1, count: 0 })
  const [canStamp, setCanStamp] = useState(false)
  const [justStampedAt, setJustStampedAt] = useState(null)

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

  const handleStamp = () => {
    if (!canStamp) return
    setCanStamp(false)
    fetch('/api/stamps', { method: 'POST' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data) { setCanStamp(true); return }
        setStampState(data)
        setJustStampedAt((data.count - 1 + STAMPS_PER_CARD) % STAMPS_PER_CARD)
        setTimeout(() => setJustStampedAt(null), 500)
        setCanStamp(true)
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
        .footer-stamp-pop img { animation: footerStampPop 0.4s ease; }
        .footer-stampcard { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .footer-stampcard:not(:disabled):hover { transform: translateY(-4px); box-shadow: 0px 8px 24px rgba(16,22,23,0.14); }
        .footer-stampcard:not(:disabled):active { transform: translateY(-1px) scale(0.99); }
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
            onStamp={handleStamp}
            canStamp={canStamp}
            justStampedAt={justStampedAt}
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
