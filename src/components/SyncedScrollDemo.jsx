import { useEffect, useRef } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }

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
          cursor: 'ns-resize', touchAction: 'pan-x',
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

// Three phones side by side. Each one scrolls on its own while the cursor (or a finger) is inside it,
// so viewers can compare the tiers at their own pace. Once a phone hits its top or bottom, the page scrolls as usual.
export default function SyncedScrollDemo({ screens, navBarSrc }) {
  const contentRefs = [useRef(null), useRef(null), useRef(null)]
  const phoneRefs = [useRef(null), useRef(null), useRef(null)]
  const navBarRefs = [useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const frames = contentRefs.map(r => r.current)
    const phones = phoneRefs.map(r => r.current)
    const navBars = navBarRefs.map(r => r.current)
    const offsets = [0, 0, 0]
    const maxScroll = [0, 0, 0]
    const cleanups = []

    function computeMaxScroll() {
      frames.forEach((f, i) => {
        const contentHeight = f.getBoundingClientRect().height
        const visibleHeight = phones[i].clientHeight - navBars[i].getBoundingClientRect().height
        maxScroll[i] = Math.max(contentHeight - visibleHeight + BOTTOM_GAP, 0)
        offsets[i] = Math.min(offsets[i], maxScroll[i])
      })
    }

    function apply(i) {
      frames[i].style.transform = 'translateY(' + -offsets[i] + 'px)'
    }

    // Returns true if phone i actually moved, so the page only scrolls once the phone is at an end.
    function scrollBy(i, dy) {
      const next = Math.min(Math.max(offsets[i] + dy, 0), maxScroll[i])
      if (next === offsets[i]) return false
      offsets[i] = next
      apply(i)
      return true
    }

    phones.forEach((ph, i) => {
      function onWheel(e) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
        const unit = e.deltaMode === 1 ? 16 : 1
        if (scrollBy(i, e.deltaY * unit)) e.preventDefault()
      }
      let touchY = null
      function onTouchStart(e) { touchY = e.touches[0].clientY }
      function onTouchMove(e) {
        if (touchY === null) return
        const y = e.touches[0].clientY
        if (scrollBy(i, touchY - y)) e.preventDefault()
        touchY = y
      }
      function onTouchEnd() { touchY = null }
      ph.addEventListener('wheel', onWheel, { passive: false })
      ph.addEventListener('touchstart', onTouchStart, { passive: true })
      ph.addEventListener('touchmove', onTouchMove, { passive: false })
      ph.addEventListener('touchend', onTouchEnd)
      ph.addEventListener('touchcancel', onTouchEnd)
      cleanups.push(() => {
        ph.removeEventListener('wheel', onWheel)
        ph.removeEventListener('touchstart', onTouchStart)
        ph.removeEventListener('touchmove', onTouchMove)
        ph.removeEventListener('touchend', onTouchEnd)
        ph.removeEventListener('touchcancel', onTouchEnd)
      })
    })

    // Measure once the images have loaded (and again if the layout changes size)
    let alive = true
    function waitForImages() {
      if (!alive) return
      const ready = frames.every(f => { const img = f.querySelector('img'); return img.complete && img.naturalHeight > 0 })
      if (ready) computeMaxScroll()
      else setTimeout(waitForImages, 50)
    }
    function onResize() { computeMaxScroll(); frames.forEach((_, i) => apply(i)) }
    window.addEventListener('resize', onResize)
    waitForImages()

    return () => {
      alive = false
      window.removeEventListener('resize', onResize)
      cleanups.forEach(fn => fn())
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%', background: '#F4F7F7', borderRadius: 24, padding: 32 }}>
      <div className="am-synced-scroll-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 24, width: '100%' }}>
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
      <span style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#979797', textAlign: 'center' }}>
        Scroll inside a phone to explore that tier.
      </span>
    </div>
  )
}
