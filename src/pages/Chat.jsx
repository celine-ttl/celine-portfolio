import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// The chat is a self-contained retro-computer prototype, so it lives in an iframe
// to keep its global styles and keyboard handling isolated from the site.
// The frame is at least one viewport tall (the nav covers its top 80px until the first
// scroll hides it). When the prototype's scene is taller than that, it reports its
// height and the frame grows to match, so the computer keeps its size.
export default function Chat() {
  const frameRef = useRef(null)
  const [frameHeight, setFrameHeight] = useState(0)

  useEffect(() => {
    const onMessage = e => {
      if (e.origin !== window.location.origin) return
      if (e.source !== frameRef.current?.contentWindow) return
      if (e.data?.type !== 'mocha-frame-height') return
      setFrameHeight(Number(e.data.height) || 0)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div style={{ background: '#FFFFFF' }}>
      <Nav />
      <iframe
        ref={frameRef}
        src="/mocha-portfolio.html"
        title="Chat with Mocha"
        onLoad={() => frameRef.current?.contentWindow?.focus()}
        style={{ width: '100%', height: frameHeight ? `max(100vh, ${frameHeight}px)` : '100vh', border: 0, display: 'block', background: '#eef2fd' }}
      />
      <Footer id="contact" />
    </div>
  )
}
