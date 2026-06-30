import { Link, NavLink } from 'react-router-dom'
import Nav from '../components/Nav'
import { useState, useRef, useEffect } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.334 2.6665V5.33317" stroke="#4A77FF" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.666 2.6665V5.33317" stroke="#4A77FF" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.3333 10.6665C21.687 10.6665 22.0261 10.807 22.2761 11.057C22.5262 11.3071 22.6667 11.6462 22.6667 11.9998V22.6665C22.6667 24.081 22.1048 25.4375 21.1046 26.4377C20.1044 27.4379 18.7478 27.9998 17.3333 27.9998H9.33333C7.91885 27.9998 6.56229 27.4379 5.5621 26.4377C4.5619 25.4375 4 24.081 4 22.6665V11.9998C4 11.6462 4.14048 11.3071 4.39052 11.057C4.64057 10.807 4.97971 10.6665 5.33333 10.6665H24C25.4145 10.6665 26.771 11.2284 27.7712 12.2286C28.7714 13.2288 29.3333 14.5853 29.3333 15.9998C29.3333 17.4143 28.7714 18.7709 27.7712 19.7711C26.771 20.7713 25.4145 21.3332 24 21.3332H22.6667" stroke="#4A77FF" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 2.6665V5.33317" stroke="#4A77FF" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function WorkCard({ imageSrc, gifSrc, imageAlt, title, description, tags, href }) {
  const [hovered, setHovered] = useState(false)
  const card = (
    <div
      className="flex flex-col bg-white rounded-[24px] overflow-hidden transition-transform duration-300 hover:rotate-[-2deg]"
      style={{ width: '100%', height: 538, boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.12)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full flex-shrink-0" style={{ height: 330 }}>
        <img src={hovered && gifSrc ? gifSrc : imageSrc} alt={imageAlt} className="object-cover rounded-t-[20px] w-full h-full" />
      </div>
      <div className="flex flex-col gap-[14px] px-6 pt-0 pb-6 mt-[25px]">
        <h3 className="text-[#2D2D2D] text-[24px] font-bold leading-tight" style={dm}>{title}</h3>
        <p className="text-[#525252] text-[17px] font-light leading-[27px]" style={{ ...dm, whiteSpace: 'pre-line' }}>{description}</p>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <span key={tag} className="bg-[#F3F3F3] rounded-full text-[14px] text-black font-normal" style={{ ...dm, padding: '8px 24px', lineHeight: '140%' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  if (href) {
    return <Link to={href} className="block">{card}</Link>
  }
  return card
}

const BREWING_IDEAS = [
  'white space is never wasted',
  "every pixel has a reason",
  "users don't read — they scan",
  'the best UX is invisible',
  'design is how it works',
  'good design tells a story',
  'coffee → ideas → design',
  'serif fonts = trust ✓',
  'simplicity takes effort',
  'details make the design',
  'empathy first, always',
  'ask why, then why again',
]

// normal → shake1 → shake2 → spill
const HERO_IMAGES = ['hero-bg', 'hero-shake-1', 'hero-shake-2', 'hero-bg-hover']

export default function Home() {
  const [bubbles, setBubbles] = useState([])
  const [heroState, setHeroState] = useState(0) // 0=normal,1=shake1,2=shake2,3=spill
  const ideaIndexRef = useRef(0)
  const imgRef = useRef(null)
  const lastPosRef = useRef(null)
  const lastDirectionRef = useRef(null)
  const shakeCountRef = useRef(0)
  const decayTimerRef = useRef(null)
  const spillTimerRef = useRef(null)
  const spilledRef = useRef(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 900)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = (e) => {
    if (spilledRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x < 660) {
      clearTimeout(decayTimerRef.current)
      setHeroState(0)
      lastPosRef.current = null
      lastDirectionRef.current = null
      return
    }
    if (lastPosRef.current) {
      const dx = e.clientX - lastPosRef.current.x
      if (Math.abs(dx) > 2) {
        const dir = dx > 0 ? 1 : -1
        setHeroState(dir === 1 ? 1 : 2)

        if (lastDirectionRef.current !== null && dir !== lastDirectionRef.current) {
          shakeCountRef.current += 1
          if (shakeCountRef.current >= 5) {
            spilledRef.current = true
            shakeCountRef.current = 0
            lastDirectionRef.current = null
            setHeroState(2)
            setTimeout(() => setHeroState(3), 320)
            return
          }
        }
        lastDirectionRef.current = dir
      }
    }
    lastPosRef.current = { x: e.clientX, y: e.clientY }

    clearTimeout(decayTimerRef.current)
    decayTimerRef.current = setTimeout(() => {
      if (!spilledRef.current) setHeroState(0)
      lastPosRef.current = null
    }, 150)
  }

  const handleMouseLeave = () => {
    clearTimeout(decayTimerRef.current)
    if (!spilledRef.current) setHeroState(0)
    lastPosRef.current = null
    lastDirectionRef.current = null
    shakeCountRef.current = 0
  }

  const handleImageClick = (e) => {
    const rect = imgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const idea = BREWING_IDEAS[ideaIndexRef.current % BREWING_IDEAS.length]
    ideaIndexRef.current++
    const id = Date.now()
    setBubbles(prev => [...prev, { id, x, y, idea }])
    setTimeout(() => setBubbles(prev => prev.filter(b => b.id !== id)), 2200)
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .home-work-grid {
            grid-template-columns: 1fr !important;
            row-gap: 40px !important;
          }
          #work {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
      <Nav />

      <div className="bg-white" style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Hero Section */}
        <section id="about" className="bg-white" style={{ position: 'relative', padding: '60px 40px 80px', minHeight: 720, overflow: 'hidden' }}>
          {/* Background image — full width, character sits on the right naturally */}
          <div
            ref={imgRef}
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hidden lg:block"
            style={{
              position: 'absolute', right: 0, top: -96, bottom: 0, left: 0,
              cursor: 'pointer',
            }}
          >
            <img
              src={`/images/${HERO_IMAGES[heroState]}.png`}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'right top', transition: 'opacity 0.15s ease', display: 'block', transform: 'scale(0.9) translateX(12px)', transformOrigin: 'right top' }}
            />
            {/* Spill text */}
            <div style={{
              position: 'absolute', top: 24, left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
              opacity: heroState === 3 ? 1 : 0,
              transform: heroState === 3 ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              pointerEvents: 'none',
            }}>
              <span style={{
                fontFamily: 'DM Serif Text, serif', fontSize: 20,
                color: 'rgba(98, 77, 63, 0.85)',
                background: 'rgba(255,255,255,0.88)', borderRadius: 24,
                padding: '6px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}>oops — ideas everywhere!</span>
            </div>
            {/* Idea bubbles */}
            {bubbles.map(b => (
              <div key={b.id} className="brewing-bubble" style={{ left: b.x, top: b.y, transform: 'translate(-50%, -100%)' }}>
                {b.idea}
              </div>
            ))}

          </div>

          {/* "try shaking" hint — receipt-style popup, upper-left */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute', top: 164, left: 752, zIndex: 2,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.08), -4px -4px 12px 0px rgba(0,0,0,0.05)',
              opacity: showHint && heroState !== 3 ? 1 : 0,
              transform: showHint && heroState !== 3 ? undefined : 'translateY(-8px)',
              transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              animation: showHint && heroState !== 3 ? 'floatUpDown 2.8s ease-in-out infinite' : undefined,
              pointerEvents: 'none',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/about/coffee-card-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
            <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.92)', padding: '14px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 500, color: '#4F5256', margin: '0 0 3px' }}>TRY SHAKING</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 300, color: '#ABABAB', margin: 0 }}>move your mouse<br />back and forth</p>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col" style={{ gap: 40, position: 'relative', zIndex: 1, maxWidth: 620, paddingTop: 48 }}>
            <div className="flex flex-col" style={{ gap: 24 }}>
              <p className="hero-animate text-[#4F5256] text-[24px] font-semibold leading-[30px]" style={{ ...dm, animationDelay: '0ms' }}>Hi, this is Celine!</p>
              <p className="hero-animate text-[48px] font-semibold leading-[60px]" style={{ ...dm, color: '#000000', animationDelay: '100ms' }}>
                I bring simplicity, human connection, and a touch of caffeine to{' '}
                <span style={{ color: '#4A77FF', whiteSpace: 'nowrap' }}>AI design</span>
                {' '}as a product designer.
              </p>
            </div>
            <p className="hero-animate text-[20px] font-normal leading-[30px]" style={{ ...dm, color: '#525252', animationDelay: '200ms' }}>
              Currently Pursuing a Master's of HCI
              <br />@ Carnegie Mellon University
            </p>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="bg-white flex flex-col items-center" style={{ padding: '20px 40px 120px', gap: 60 }}>
          <div className="flex flex-col items-center" style={{ gap: 16 }}>
            <div className="flex items-center justify-center relative" style={{ width: 328.6, height: 54 }}>
              <div style={{ position: 'absolute', left: 0, top: 11 }}><MenuIcon /></div>
              <p className="text-[36px] font-semibold leading-[54px] text-black text-center" style={dm}>Today&apos;s Menu</p>
              <div style={{ position: 'absolute', right: 0, top: 11 }}><MenuIcon /></div>
            </div>
            <p className="text-[18px] font-normal leading-[27px] text-[#525252] text-center" style={dm}>
              A carefully curated selection of design projects,{' '}
              <br />each brewed with care and attention to detail.
            </p>
          </div>

          <div className="home-work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '80px 40px', width: '100%' }}>
            <WorkCard
              href="/ui-for-ai"
              imageSrc="/images/ui-for-ai/work-card-thumbnail.gif"
              gifSrc="/images/ui-for-ai/work-card-thumbnail.gif"
              imageAlt="Re-imagining UI for AI"
              title="Re-imagining UI for AI"
              description={"Tackling the conversation flow problem with\ncurrent chatbot design of AI."}
              tags={['AI Design', 'Interaction Design']}
            />
            <WorkCard
              href="/ahoku"
              imageSrc="/images/work-card-1.png"
              imageAlt="Ahoku Smart Homecare Device"
              title="Ahoku Smart Homecare Device"
              description="Designed digital interface of a healthcare device for elders to help track and manage health data."
              tags={['Product Design', 'Healthcare']}
            />
            <WorkCard
              imageSrc="/images/work-card-3.png"
              imageAlt="Amazon Music"
              title="Amazon Music (Coming soon)"
              description="Bridging the gap between listeners and creators through a reimagined Amazon Music experience"
              tags={['Capstone', 'Interaction Design']}
            />
            <WorkCard
              imageSrc="/images/work-card-4.png"
              imageAlt="MyInfluency (Coming Soon)"
              title="MyInfluency (Coming Soon)"
              description={"Redesigning a platform for business–influencer\ncollaboration and management"}
              tags={['Startup', 'SaSS Design']}
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer id="contact" className="w-full bg-[#F3F3F3]">
        <div className="flex flex-col" style={{ maxWidth: 1280, margin: '0 auto', padding: '61px 40px 60px', gap: 70 }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center" style={{ gap: 32 }}>
            <div className="flex items-center" style={{ gap: 32 }}>
              <div style={{ width: 235 }}>
                <h2 className="text-black text-[48px] leading-[48px]" style={{ ...dm, fontWeight: 800 }}>
                  Want to learn more about my work?
                </h2>
              </div>
              <img src="/images/footer-portrait-303597.png" alt="Celine portrait" className="object-cover flex-shrink-0" style={{ width: 176, height: 185 }} />
            </div>
            <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={{ ...dm, maxWidth: 447 }}>
              I&apos;m currently available for new work.
              <br />Feel free to grab a virtual coffee with me via{' '}
              <a href="mailto:celine900423lu@gmail.com" className="underline hover:opacity-70 transition-opacity">email</a>!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center" style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24, gap: 16 }}>
            <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={dm}>
              Crafted with Cursor, Claude Code, and too much caffeine.
            </p>
            <div className="flex items-center" style={{ gap: 38 }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-70 transition-opacity">
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
    </>
  )
}
