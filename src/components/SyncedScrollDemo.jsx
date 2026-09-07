import { useEffect, useRef, useState } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }

// Preserved exactly from the source prototype (synced-scroll-capture.html)
const SPEED = 55
const HOLD_DURATION = 900
const BOTTOM_GAP = 12

function PhoneFrame({ label, src, alt, navBarSrc, phoneRef, contentRef, navBarRef }) {
  return (
    <div style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
      <span style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#979797', display: 'block', marginBottom: 12 }}>{label}</span>
      <div
        ref={phoneRef}
        style={{
          position: 'relative', width: '100%', aspectRatio: '280 / 586', borderRadius: 38,
          background: '#000000', border: '7px solid #2B1B12', overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(43,27,18,0.15)',
        }}
      >
        <div ref={contentRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', willChange: 'transform' }}>
          <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
        <div ref={navBarRef} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 2 }}>
          <img src={navBarSrc} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
      </div>
    </div>
  )
}

export default function SyncedScrollDemo({ screens, navBarSrc }) {
  const contentRefs = [useRef(null), useRef(null), useRef(null)]
  const phoneRefs = [useRef(null), useRef(null), useRef(null)]
  const navBarRefs = [useRef(null), useRef(null), useRef(null)]
  const controlsRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let running = true
    let rafId = null

    let startTime = null
    let pausedAt = 0
    let holdStart = null
    const speed = SPEED
    const holdDuration = HOLD_DURATION
    const frames = contentRefs.map(r => r.current)
    const phones = phoneRefs.map(r => r.current)
    const navBars = navBarRefs.map(r => r.current)
    let maxScroll = [0, 0, 0]

    function computeMaxScroll() {
      frames.forEach((f, i) => {
        const contentHeight = f.getBoundingClientRect().height
        const phoneHeight = phones[i].clientHeight
        const navBarHeight = navBars[i].getBoundingClientRect().height
        const visibleHeight = phoneHeight - navBarHeight
        maxScroll[i] = Math.max(contentHeight - visibleHeight + BOTTOM_GAP, 0)
      })
    }

    function imagesReady() {
      return frames.every(f => {
        const img = f.querySelector('img')
        return img.complete && img.naturalHeight > 0
      })
    }

    function waitForImages() {
      if (!running) return
      if (imagesReady()) {
        computeMaxScroll()
        rafId = requestAnimationFrame(animate)
      } else {
        setTimeout(waitForImages, 50)
      }
    }

    function animate(time) {
      if (!running) return

      if (holdStart !== null) {
        if (time - holdStart >= holdDuration) {
          holdStart = null
          startTime = null
          pausedAt = 0
        } else {
          rafId = requestAnimationFrame(animate)
          return
        }
      }

      if (startTime === null) startTime = time - pausedAt
      const elapsed = time - startTime
      const traveled = (elapsed / 1000) * speed

      let allDone = true
      frames.forEach((f, i) => {
        const y = -Math.min(traveled, maxScroll[i])
        f.style.transform = 'translateY(' + y + 'px)'
        if (traveled < maxScroll[i]) allDone = false
      })

      pausedAt = elapsed

      if (allDone) {
        holdStart = time
      }

      rafId = requestAnimationFrame(animate)
    }

    function toggleScroll() {
      running = !running
      setIsPaused(!running)
      if (running) {
        startTime = holdStart !== null ? startTime : null
        rafId = requestAnimationFrame(animate)
      }
    }

    function resetScroll() {
      startTime = null
      pausedAt = 0
      holdStart = null
      frames.forEach(f => { f.style.transform = 'translateY(0px)' })
    }

    controlsRef.current = { toggleScroll, resetScroll }

    waitForImages()

    return () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const buttonStyle = {
    ...dm, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: '#525252', borderRadius: 100, padding: '0 24px', cursor: 'pointer',
    border: 'none', fontSize: 17, fontWeight: 600, lineHeight: '42px', color: '#FFFFFF',
    boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.05), -4px -4px 12px 0px rgba(0,0,0,0.05)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '100%', background: '#F4F7F7', borderRadius: 24, padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 24, width: '100%' }}>
        {screens.map((screen, i) => (
          <PhoneFrame
            key={screen.label}
            label={screen.label}
            src={screen.src}
            alt={screen.alt}
            navBarSrc={navBarSrc}
            phoneRef={phoneRefs[i]}
            contentRef={contentRefs[i]}
            navBarRef={navBarRefs[i]}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="jump-btn" style={buttonStyle} onClick={() => controlsRef.current?.toggleScroll()}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button className="jump-btn" style={buttonStyle} onClick={() => controlsRef.current?.resetScroll()}>
          Restart
        </button>
      </div>
    </div>
  )
}
