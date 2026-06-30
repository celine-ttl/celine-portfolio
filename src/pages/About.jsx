import { Link, NavLink } from 'react-router-dom'
import Nav from '../components/Nav'
import { useState, useEffect, useRef } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }
const serif = { fontFamily: 'DM Serif Text, serif' }

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const TABS = [
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    desc: 'My design philosophy',
    image: '/images/about/drink-latte-inactive.png',
    activeImage: '/images/about/drink-latte.png',
    title: 'My design philosophy',
    titleColor: 'rgba(98, 77, 63, 0.5)',
    showEnjoy: true,
    content: [
      <>I&apos;m always someone who finds joy in the little things.<br />I believe <strong style={{ fontWeight: 600 }}>beauty often lies in the details</strong>:{' '}the quiet moments, thoughtful gestures, and everyday experiences that can easily go unnoticed.</>,
      <>Good design works the same way: <strong style={{ fontWeight: 600 }}>paying attention to what people don&apos;t say but still feel</strong>.</>,
    ],
  },
  {
    id: 'matcha',
    name: 'Matcha',
    desc: 'Fun facts & hobbies',
    image: '/images/about/drink-matcha.png',
    activeImage: '/images/about/drink-matcha-active.png',
    title: 'Fun facts & hobbies',
    titleColor: 'rgba(98, 135, 55, 0.6)',
    showEnjoy: false,
    content: [
      <>
        When I&apos;m away from my screen, you&apos;ll catch me:<br />
        &nbsp;&nbsp;- <strong style={{ fontWeight: 600 }}>Journaling!</strong> if it happened today, it&apos;s getting written down<br />
        &nbsp;&nbsp;- On the hunt for <strong style={{ fontWeight: 600 }}>a new food spot</strong> (a proud Beli user)<br />
        &nbsp;&nbsp;- Currently <strong style={{ fontWeight: 600 }}>reading a thriller</strong> (recommend me one, but it has to actually be scary)
      </>,
    ],
    photos: [
      { src: '/images/about/matcha-photo-1-103b6d.png', frameW: 180, frameH: 248, imgLeft: 11, imgTop: 11, imgW: 154, imgH: 196, rotate: -5 },
      { src: '/images/about/matcha-photo-2-103b6d.png', frameW: 198, frameH: 259, imgLeft: 18, imgTop: 12, imgW: 169, imgH: 206, overlap: 42, rotate: 10 },
    ],
  },
  {
    id: 'frapp',
    name: 'Frappuccino',
    desc: 'My design journey',
    image: '/images/about/drink-frapp.png',
    activeImage: '/images/about/drink-frapp-active.png',
    title: 'My design journey',
    titleColor: '#D0ACB5',
    showEnjoy: false,
    content: [
      <>I started in marketing as a business student, where storytelling first sparked my interest in <strong style={{ fontWeight: 600 }}>how people connect with products and ideas</strong>.</>,
      <>Since then, I&apos;ve designed across healthcare, entertainment, AI, and SaaS, always with the goal of creating experiences that <strong style={{ fontWeight: 600 }}>help people feel understood</strong>.</>,
      <>Today, I&apos;m interested in designing AI-powered experiences that amplify <strong style={{ fontWeight: 600 }}>human creativity, productivity, and connection</strong>.</>,
    ],
  },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('cold-brew')
  const [hoveredTab, setHoveredTab] = useState(null)
  const [visitedTabs, setVisitedTabs] = useState(new Set(['cold-brew']))
  const [showReceipt, setShowReceipt] = useState(false)
  const active = TABS.find(t => t.id === activeTab)

  const handleTabClick = (id) => {
    setActiveTab(id)
    setVisitedTabs(prev => {
      const next = new Set(prev)
      next.add(id)
      if (next.size === TABS.length && !showReceipt) {
        setTimeout(() => {
          setShowReceipt(true)
          setTimeout(() => setShowReceipt(false), 4000)
        }, 300)
      }
      return next
    })
  }

  const heroRef = useRef(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const handleHeroMouseMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    setParallax({ x, y })
  }

  const handleHeroMouseLeave = () => setParallax({ x: 0, y: 0 })

  useEffect(() => {
    const els = document.querySelectorAll('.fade-section')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Nav />

      <style>{`
        @media (max-width: 900px) {
          .about-hero-section {
            padding: 48px 24px !important;
          }
          .about-hero-inner {
            flex-direction: column !important;
            align-items: center !important;
            gap: 40px !important;
          }
          .about-hero-inner .fade-section:first-child {
            align-items: center !important;
            text-align: center !important;
          }
          .about-hero-photo {
            width: 100% !important;
            height: auto !important;
            max-width: 435px;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="about-hero-section bg-white flex justify-center" style={{ padding: '60px 100px' }}>
        <div className="about-hero-inner" style={{ width: '100%', maxWidth: 1080, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left: text */}
          <div className="fade-section" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 48, fontWeight: 600, lineHeight: '42px', color: '#4F5256', margin: 0, maxWidth: 557 }}>
              Hi, this is Celine!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#525252', margin: 0, maxWidth: 611 }}>
                I&apos;m a UX designer and HCI master&apos;s student at Carnegie Mellon.{' '}
                <br />I believe technology should bring people closer, not further apart.
              </p>
              <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#525252', margin: 0, maxWidth: 611 }}>
                Whether designing everyday experiences or emerging technologies, I&apos;m interested in creating solutions that foster understanding,{' '}
                <br />support genuine human connection, and help people feel seen.
              </p>
            </div>
          </div>

          {/* Right: photo collage */}
          <img
            className="about-hero-photo fade-section"
            ref={heroRef}
            src="/images/about/aboutme-collage.png"
            alt="Celine"
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            style={{
              width: 435, height: 508, objectFit: 'contain', flexShrink: 0, display: 'block',
              transform: `translate(${parallax.x * 12}px, ${parallax.y * 8}px) rotate(${parallax.x * 2}deg)`,
              transition: 'transform 0.4s ease-out',
            }}
          />
        </div>
      </section>

      {/* Coffee Menu Section */}
      <section className="about-coffee-section bg-white flex flex-col items-center" style={{ padding: '20px 100px 120px', gap: 60 }}>
        {/* Header */}
        <div className="fade-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <h2 style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '54px', color: '#000000', margin: 0, textAlign: 'center' }}>
            Let&apos;s grab a coffee!
          </h2>
          <p style={{ ...dm, fontSize: 18, fontWeight: 400, lineHeight: '27px', color: '#525252', margin: 0, textAlign: 'center' }}>
            Pick your order — and I&apos;ll tell you more about myself.
          </p>
        </div>

        {/* Card */}
        <div className="fade-section" style={{
          position: 'relative',
          width: '100%',
          padding: 48,
          borderRadius: 24,
          boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.05), -4px -4px 12px 0px rgba(0,0,0,0.05)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32,
          overflow: 'hidden',
        }}>
          {/* BG image at 20% opacity */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 24,
            backgroundImage: 'url(/images/about/coffee-card-bg.png)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.2, zIndex: 0,
          }} />

          {/* "Today's Menu" watermark — vertical, peeking out from left edge */}
          <p style={{
            position: 'absolute', left: -34.5, top: 117,
            ...serif, fontSize: 70.67, lineHeight: '106px', color: '#979797',
            margin: 0, writingMode: 'vertical-lr', zIndex: 1, pointerEvents: 'none',
          }}>
            Today&apos;s Menu
          </p>

          {/* Main content row */}
          <div className="about-content-row" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 52, width: '100%' }}>

            {/* Left panel: drink items + vertical divider */}
            <div className="about-left-panel" style={{
              width: 486, minWidth: 0, padding: 24, borderRadius: 48,
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4,
            }}>
              {/* Drink items column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', flex: 1, marginLeft: 0, alignSelf: 'stretch' }}>
                {TABS.map(tab => {
                  const isActive = tab.id === activeTab
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      onMouseEnter={() => setHoveredTab(tab.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                      style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: 174, height: 160, flexShrink: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: isActive || hoveredTab === tab.id ? 1 : 0.7,
                        transform: hoveredTab === tab.id && !isActive ? 'translateY(-8px)' : 'translateY(0)',
                        transition: 'transform 0.25s ease, opacity 0.2s ease',
                      }}>
                        <img
                          src={isActive || hoveredTab === tab.id ? tab.activeImage : tab.image}
                          alt={tab.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', opacity: isActive ? 1 : hoveredTab === tab.id ? 0.8 : 0.5, transition: 'opacity 0.2s ease' }}>
                        <span style={{ ...dm, fontSize: 18, fontWeight: 600, lineHeight: '27px', color: '#525252' }}>{tab.name}</span>
                        <span style={{ ...dm, fontSize: 18, fontWeight: 400, lineHeight: '27px', color: '#525252' }}>{tab.desc}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Vertical divider */}
              <div className="about-divider" style={{ width: 1, height: 480, background: '#C6C6C6', flexShrink: 0 }} />
            </div>

            {/* Right panel */}
            <div key={active.id} style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, justifyContent: 'center', alignSelf: 'stretch', animation: 'fadeInUp 0.35s ease-out both' }}>
              <h3 style={{ ...dm, fontSize: 48, fontWeight: 900, lineHeight: '120%', color: active.titleColor, margin: 0 }}>
                {active.title}
              </h3>
              {active.content.map((para, i) => (
                <p key={i} style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                  {para}
                </p>
              ))}
              {active.photos && (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                  {active.photos.map((photo, i) => (
                    <div key={i} style={{
                      position: 'relative', flexShrink: 0,
                      width: photo.frameW, height: photo.frameH,
                      background: '#FFFFFF',
                      boxShadow: '3px 3px 9px 0px rgba(0,0,0,0.05), -3px -3px 9px 0px rgba(0,0,0,0.05)',
                      marginLeft: photo.overlap ? -photo.overlap : 0,
                      zIndex: i + 1,
                      transform: photo.rotate ? `rotate(${photo.rotate}deg)` : undefined,
                    }}>
                      <img src={photo.src} alt="" style={{
                        position: 'absolute', left: photo.imgLeft, top: photo.imgTop,
                        width: photo.imgW, height: photo.imgH, objectFit: 'cover', display: 'block',
                      }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enjoy your order! — always at card bottom, right-aligned */}
          <p style={{
            position: 'relative', zIndex: 2,
            ...serif, fontSize: 36, lineHeight: '27px', color: '#D9D9D9',
            margin: 0, textAlign: 'right', width: '100%',
          }}>
            Enjoy your order!
          </p>
        </div>
      </section>

      {/* Receipt toast */}
      <div style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 1000,
        transform: showReceipt ? 'translateY(0)' : 'translateY(120%)',
        opacity: showReceipt ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
        borderRadius: 24, overflow: 'hidden',
        boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.08), -4px -4px 12px 0px rgba(0,0,0,0.05)',
        minWidth: 240,
      }}>
        {/* bg texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/about/coffee-card-bg.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15,
        }} />
        <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.92)', padding: '24px 28px' }}>
          <p style={{ ...serif, fontSize: 22, color: '#4F5256', margin: '0 0 16px' }}>Your order is ready!</p>
          <div style={{ height: 1, background: '#E8E8E8', marginBottom: 12 }} />
          {TABS.map(tab => (
            <p key={tab.id} style={{ ...dm, fontSize: 15, fontWeight: 300, color: '#525252', margin: '6px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#4A77FF', fontWeight: 600 }}>✓</span>{tab.name}
            </p>
          ))}
          <div style={{ height: 1, background: '#E8E8E8', margin: '12px 0 10px' }} />
          <p style={{ ...dm, fontSize: 13, fontWeight: 300, color: '#ABABAB', margin: 0 }}>Thanks for getting to know me :)</p>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="w-full bg-[#F3F3F3]">
        <div className="cs-footer-inner flex flex-col" style={{ maxWidth: 1280, margin: '0 auto', padding: '61px 125px 60px', gap: 70 }}>
          <div className="cs-footer-top flex justify-between items-end">
            <div className="flex items-center" style={{ gap: 32 }}>
              <div style={{ width: 235 }}>
                <h2 style={{ ...dm, fontSize: 60, fontWeight: 800, lineHeight: '62px', color: '#000000', margin: 0 }}>Let&apos;s work together!</h2>
              </div>
              <img src="/images/footer-portrait-303597.png" alt="Celine portrait" style={{ width: 176, height: 185, objectFit: 'cover', flexShrink: 0 }} />
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D', maxWidth: 447, margin: 0 }}>
              I&apos;m currently available for new work.
              <br />Feel free to grab a virtual coffee with me via{' '}
              <a href="mailto:celine900423lu@gmail.com" className="underline hover:opacity-70 transition-opacity">email</a>!
            </p>
          </div>
          <div className="cs-footer-bottom flex justify-between items-center" style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D', margin: 0 }}>
              Crafted with Cursor, Claude Code, and too much caffeine.
            </p>
            <div className="flex items-center" style={{ gap: 38 }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-70 transition-opacity" style={{ textDecoration: 'none' }}>
                <span style={{ ...dm, fontSize: 17, fontWeight: 500, lineHeight: '27px', color: '#4A77FF' }}>Linkedin</span>
                <ArrowDiagonal />
              </a>
              <a href="mailto:celine900423lu@gmail.com" className="flex items-center hover:opacity-70 transition-opacity" style={{ textDecoration: 'none' }}>
                <span style={{ ...dm, fontSize: 17, fontWeight: 500, lineHeight: '27px', color: '#4A77FF' }}>Email</span>
                <ArrowDiagonal />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
