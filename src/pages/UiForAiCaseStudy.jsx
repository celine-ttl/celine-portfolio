import { Link, NavLink } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'user-interviews', label: 'Research' },
  { id: 'problem-space', label: 'Problem' },
  { id: 'ideation', label: 'Ideation' },
  { id: 'solution-01', label: 'Solution' },
  { id: 'design-decisions', label: 'Decisions' },
  { id: 'reflection', label: 'Reflection' },
]

function SideNav({ active }) {
  return (
    <div className="cs-sidenav" style={{
      position: 'sticky', top: 190,
      display: 'flex', flexDirection: 'column',
      zIndex: 40,
    }}>
      {NAV_SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <a key={s.id} href={`#${s.id}`}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', padding: 0 }}
            onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }}>
            <div style={{ width: 12, display: 'flex', justifyContent: 'center', alignSelf: 'stretch', flexShrink: 0 }}>
              <div style={{
                width: isActive ? 3 : 1, alignSelf: 'stretch',
                background: isActive ? '#000000' : '#EBEBEB',
                transition: 'width 0.25s ease, background 0.25s ease',
              }} />
            </div>
            <span style={{
              ...dm, marginLeft: 10, fontSize: 12, lineHeight: '20px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#000000' : '#999999',
              transition: 'color 0.25s ease, font-weight 0.25s ease',
              whiteSpace: 'nowrap', padding: '5px 0',
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              {s.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}

function QuoteIcon() {
  return (
    <svg width="47" height="47" viewBox="0 0 24 24" fill="#4A77FF" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9999 4C7.02944 4 3 8.02944 3 13V17C3 18.6569 4.34315 20 6 20H8C9.65685 20 11 18.6569 11 17V14C11 12.3431 9.65685 11 8 11H5.1C5.56368 8.05668 8.53826 6 11.9999 6V4ZM20.9999 4C16.0294 4 12 8.02944 12 13V17C12 18.6569 13.3431 20 15 20H17C18.6569 20 20 18.6569 20 17V14C20 12.3431 18.6569 11 17 11H14.1C14.5637 8.05668 17.5383 6 20.9999 6V4Z" />
    </svg>
  )
}

function QuoteBox({ quote, highlights }) {
  // White card: 345×171, matching Figma inner rectangle. Icon at (12,11). Text at (73,46) w:250.
  // Highlight bars: rgba(74,119,255,0.2) positioned relative to white card.
  return (
    <div style={{
      position: 'relative', width: 345, height: 171, flexShrink: 0,
      background: '#FFFFFF', boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.07)',
    }}>
      {highlights.map((h, i) => (
        <div key={i} style={{
          position: 'absolute', left: h.x, top: h.y,
          width: h.w, height: 20,
          background: 'rgba(74,119,255,0.2)', borderRadius: 10,
          zIndex: 0,
        }} />
      ))}
      <div style={{ position: 'absolute', left: 12, top: 11, zIndex: 1 }}>
        <QuoteIcon />
      </div>
      <p style={{
        position: 'absolute', left: 73, top: 46, width: 250, margin: 0, zIndex: 1,
        fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 15,
        lineHeight: '27px', color: '#525252',
      }}>
        {quote}
      </p>
    </div>
  )
}


function Pill({ text, bg = '#4A77FF', color = '#FFFFFF' }) {
  return (
    <div style={{ ...dm, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: bg, color, borderRadius: 100, padding: '2px 14px', fontSize: 12, fontWeight: 600, lineHeight: '27px', letterSpacing: '0.08em', textTransform: 'uppercase', width: 'fit-content' }}>
      {text}
    </div>
  )
}

function CalloutCard({ pill, body }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 24, background: '#FFFFFF', padding: 24, boxShadow: '2px 2px 10px 0px rgba(0,0,0,0.03), -2px -2px 10px 0px rgba(0,0,0,0.03)', border: '1px solid #ECEEEE' }}>
      <Pill text={pill} />
      <p style={{ ...dm, fontSize: 17, fontWeight: 600, lineHeight: '27px', color: '#000000', margin: 0 }}>{body}</p>
    </div>
  )
}

function SectionLabel({ text }) {
  return (
    <p style={{ ...dm, fontSize: 16, fontWeight: 400, lineHeight: '42px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#979797', margin: 0 }}>{text}</p>
  )
}

function ComparePoint({ good, icon = 'minus', fontSize = 12, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {good ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" fill="#3AA76D" />
          <path d="M7.5 12.5L10.3 15.3L16.5 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : icon === 'x' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path fillRule="evenodd" clipRule="evenodd" d="M8 1C11.8656 1 15 4.13438 15 8C15 11.8656 11.8656 15 8 15C4.13438 15 1 11.8656 1 8C1 4.13438 4.13438 1 8 1ZM9.99912 5.29416C9.99876 5.29427 9.99847 5.29444 9.99783 5.29508L8 7.29289L6.00219 5.29508C6.00153 5.29444 6.00125 5.29427 6.00087 5.29416C6.00052 5.29405 6.00014 5.29405 5.99978 5.29416C5.99944 5.29427 5.99914 5.29444 5.9985 5.29508L5.29506 5.9985C5.29444 5.99913 5.29428 5.99944 5.29416 5.9998C5.29405 6.00015 5.29405 6.00053 5.29416 6.00089L5.29431 6.00123C5.29453 6.00158 5.29478 6.00189 5.29508 6.00217L7.29289 8L5.29508 9.99784C5.29444 9.99847 5.29427 9.99878 5.29416 9.99914C5.29405 9.9995 5.29405 9.99988 5.29416 10.0002C5.29427 10.0006 5.29444 10.0009 5.29508 10.0015L5.9985 10.705C5.99913 10.7056 5.99944 10.7057 5.9998 10.7059C6.00015 10.706 6.00053 10.706 6.00089 10.7059C6.00123 10.7057 6.00153 10.7056 6.00217 10.7049L8 8.70709L9.99784 10.7049C9.99847 10.7056 9.99878 10.7057 9.99914 10.7058C9.9995 10.706 9.99988 10.706 10.0002 10.7058C10.0006 10.7057 10.0009 10.7056 10.0015 10.7049L10.705 10.0015C10.7056 10.0009 10.7057 10.0006 10.7059 10.0002C10.706 9.99985 10.706 9.99947 10.7059 9.99911L10.7057 9.99877C10.7055 9.99842 10.7052 9.99811 10.7049 9.99783L8.70709 8L10.7049 6.00219C10.7056 6.00153 10.7057 6.00125 10.7058 6.00087C10.706 6.00052 10.706 6.00014 10.7058 5.99978C10.7057 5.99944 10.7056 5.99914 10.7049 5.9985L10.0015 5.29506C10.0012 5.29465 10.0007 5.29434 10.0002 5.29416C9.99985 5.29405 9.99948 5.29405 9.99912 5.29416Z" fill="#E22D2D" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" fill="#C6C6C6" />
          <path d="M9 12H15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span style={{ ...dm, fontSize, fontWeight: 300, lineHeight: '24px', color: '#525252' }}>{children}</span>
    </div>
  )
}

function VersionCard({ image, imageAlt, title, points, winner, imageMaxWidth = '100%', imageBoxHeight, textOffset = 0, pointFontSize = 12, contentGap = 24 }) {
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: contentGap, background: '#FFFFFF', border: '1px solid #ECEEEE', boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)', borderRadius: 24, padding: '40px 32px 24px' }}>
      {imageBoxHeight ? (
        <div className="cs-versioncard-imgbox" style={{ alignSelf: 'stretch', height: imageBoxHeight, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <img src={image} alt={imageAlt} style={{ maxWidth: imageMaxWidth, height: 'auto', display: 'block' }} />
        </div>
      ) : (
        <img src={image} alt={imageAlt} style={{ maxWidth: imageMaxWidth, height: 'auto', display: 'block' }} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: textOffset }}>
        <h5 style={{ ...dm, fontSize: 17, fontWeight: 500, lineHeight: '24px', color: '#000000', margin: 0, textAlign: 'center' }}>{title}</h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {points.map((p, i) => (
            <ComparePoint key={i} good={p.good} icon={p.icon} fontSize={pointFontSize}>{p.text}</ComparePoint>
          ))}
        </div>
      </div>
      {winner && (
        <span style={{ position: 'absolute', top: 16, right: 20, ...dm, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', background: '#4A77FF', borderRadius: 20, padding: '4px 10px' }}>Winner</span>
      )}
    </div>
  )
}

export default function UiForAiCaseStudy() {
  const [activeSection, setActiveSection] = useState('overview')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [seriesOpen, setSeriesOpen] = useState(false)

  useEffect(() => {
    const sectionMap = {
      'hmw': 'problem-space',
      'synthesis': 'ideation',
      'solution-02': 'solution-01',
      'solution-03': 'solution-01',
    }
    const allIds = ['overview', 'user-interviews', 'problem-space', 'hmw', 'ideation', 'synthesis', 'solution-01', 'solution-02', 'solution-03', 'design-decisions', 'reflection']
    const update = () => {
      const threshold = window.innerHeight * 0.35
      let active = allIds[0]
      for (const id of allIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) active = id
      }
      setActiveSection(sectionMap[active] ?? active)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.fade-section')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          e.target.querySelectorAll('img[src$=".gif"]').forEach(img => {
            const src = img.src
            img.src = ''
            img.src = src
          })
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.08 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .fade-section {
          margin-left: 150px;
        }
        @media (max-width: 1200px) {
          .cs-sidenav { display: none !important; }
          .fade-section {
            margin-left: 0;
          }
        }
      `}</style>

      {/* Fixed nav */}
      <Nav fixed />

      {/* Case study hero */}
      <div className="cs-hero-outer" style={{ marginTop: 80, background: '#FFFFFF', display: 'flex', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 1080, display: 'flex', flexDirection: 'column', gap: 32, padding: '40px 0' }}>
          {/* Top row: text + image */}
          <div className="cs-hero-row" style={{ display: 'flex', flexDirection: 'row', gap: 48, alignItems: 'stretch' }}>
            {/* Left: text column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <h1 style={{ ...dm, fontSize: 48, fontWeight: 700, lineHeight: '60px', color: '#000000', margin: 0 }}>
                UI for AI:<br />Conversation flow
              </h1>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                Explores how linear AI chat interfaces might better support the way people actually work — making it easier to go back, find what mattered, and build on what's already there.
              </p>
              <button
                onClick={() => document.getElementById('solution-01')?.scrollIntoView({ behavior: 'smooth' })}
                className="jump-btn"
                style={{ ...dm, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#525252', borderRadius: 100, padding: '0 24px', width: 'fit-content', cursor: 'pointer', border: 'none', fontSize: 17, fontWeight: 600, lineHeight: '42px', color: '#FFFFFF', boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.05), -4px -4px 12px 0px rgba(0,0,0,0.05)' }}
              >
                Jump to solution
              </button>
            </div>
            {/* Right: image */}
            <div className="cs-hero-image" style={{ width: 464, flexShrink: 0 }}>
              <video
                src="/videos/ui-for-ai-thumbnail.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 17, display: 'block' }}
              />
            </div>
          </div>
          {/* Metadata row */}
          <div className="cs-metadata" style={{ background: '#F3F3F3', borderRadius: 24, padding: '24px 72px', display: 'flex', justifyContent: 'space-between' }}>
            {[
              { label: 'Role', values: ['Product Designer'] },
              { label: 'Timeline', values: ['Aug 2025 -', 'Dec 2025'] },
              { label: 'Team', values: ['2 Design Lead (me!)', '3 Designers'] },
              { label: 'Tools', values: ['Figma', 'Interaction Design'] },
            ].map(({ label, values }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 160 }}>
                <span style={{ ...dm, fontSize: 14, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '21px', color: '#4A77FF' }}>{label}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {values.map(v => (
                    <span key={v} style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D' }}>{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main style={{ position: 'relative' }}>
        <div className="cs-sidenav-col" style={{ position: 'absolute', top: 72, left: 40, height: 'calc(100% - 300px)', width: 0 }}>
          <SideNav active={activeSection} />
        </div>
        {/* OVERVIEW */}
        <section id="overview" className="flex flex-col items-center bg-white" style={{ padding: '60px 55px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 920 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Overview" />
              <h2 style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '120%', color: '#000000', margin: 0 }}>
                Humans don't think in straight lines
                <br />but AI chat interfaces are built like they do
              </h2>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Creative work is iterative. Research is non-linear. Ideas get revisited, refined, and built on over time. Yet most AI chat interfaces treat every conversation like a one-way scroll: outputs accumulate, good moments disappear, and users are left starting over instead of building forward.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <img
                src="/images/ui-for-ai/infinite-scroll-demo.gif"
                alt="Infinite scroll demo"
                style={{ width: '100%', borderRadius: 12, display: 'block' }}
              />
              <p style={{ ...dm, fontSize: 17, fontWeight: 600, lineHeight: '27px', color: '#525252', margin: 0 }}>
                A typical long chat: every output stacked in one endless column, with no way back.
              </p>
            </div>
            <CalloutCard
              pill="Challenge"
              body="Bring non-linear movement to the chat without breaking flow people already rely on. Add ways to go back, and build on past work, without making the interface feel unfamiliar."
            />
            {/* UI for AI Series callout — dropdown */}
            <div style={{ borderRadius: 24, background: '#FFFFFF', border: '1px solid #F3F3F3', overflow: 'hidden' }}>
              <button
                onClick={() => setSeriesOpen(o => !o)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <p style={{ ...dm, fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4A77FF', margin: 0 }}>Part of the UI for AI series</p>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  style={{ flexShrink: 0, transform: seriesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
                >
                  <path d="M6 9L12 15L18 9" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {seriesOpen && (
                <div className="cs-overview-row" style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-start', padding: '0 24px 24px' }}>
                  <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0, flex: 1 }}>
                    This is one entry in UI for AI: an ongoing project at Carnegie Mellon University, led by Dan Saffer, investigating how interfaces and interaction patterns need to change in the age of AI.
                    <br /><br />
                    See the full series at{' '}
                    <a href="https://uiforai.design" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">uiforai.design</a>
                    {' · '}
                    <a href="https://INSERT_MEDIUM_URL" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">Follow on Medium</a>
                  </p>
                  <img src="/images/ui-for-ai/series-screenshot.png" alt="UI for AI series screenshot" className="cs-series-img" style={{ width: 240, borderRadius: 16, flexShrink: 0, boxShadow: '4px 4px 12px rgba(0,0,0,0.1)' }} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* USER INTERVIEWS */}
        <section id="user-interviews" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 920 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="User Interviews" />
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 600, lineHeight: '42px', color: '#000000', margin: 0 }}>
                Users' struggles with the infinite scroll
              </h2>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Chat interfaces assume a conversation is something you read top to bottom, once. That holds for a quick exchange, and falls apart when the work turns iterative. Across 15 interviews with frequent AI tool users, similar frustration came up in nearly every interview.
            </p>
            <img
              src="/images/ui-for-ai/quotes.png"
              alt="User interview quotes"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </section>

        {/* PROBLEM SPACE */}
        <section id="problem-space" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionLabel text="Problem space" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 600, lineHeight: '42px', color: '#000000', margin: 0 }}>
              For frequent AI users, linear chat means starting over.
            </h2>
          </div>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 920 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Through these interviews, we synthesized our findings into key pain points. Each one pushes the user toward the same fallback: starting over, and the work already done is effectively lost.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 24 }}>
              {/* Card 1 */}
              <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center', minHeight: 248, border: '1px solid #ECEEEE', boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)' }}>
                <div style={{ width: 52, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 14px' }}>
                  <span style={{ ...dm, fontSize: 64, fontWeight: 600, lineHeight: '42px', color: 'rgba(137,197,234,0.3)' }}>1</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <p style={{ ...dm, fontSize: 20, fontWeight: 700, color: '#000000', margin: 0 }}>The users can't get back to their own work.</p>
                  <p style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '24px', color: '#525252', margin: 0 }}>
                    Good outputs and prompts vanished into the scroll, and finding cost more than re-asking, so people re-asked instead of relocating and reusing them.
                  </p>
                </div>
                <div style={{ position: 'relative', width: 174, height: 180, flexShrink: 0 }}>
                  <img src="/images/ui-for-ai/avatar-3e07b5.png" alt="" style={{ position: 'absolute', left: 14, top: 17, width: 147, height: 147, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', left: 9, top: 123, width: 157, height: 46, background: '#F8F8F8', borderRadius: 18, padding: 7, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 9px 0px rgba(0,0,0,0.12), -3px -3px 9px 0px rgba(0,0,0,0.12)' }}>
                    <span style={{ ...dm, fontSize: 12, fontWeight: 400, lineHeight: '15px', color: '#525252' }}>I had a great idea.<br />Where was it?</span>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div style={{ background: '#FFFFFF', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center', border: '1px solid #ECEEEE', boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)' }}>
                <div style={{ width: 52, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 14px' }}>
                  <span style={{ ...dm, fontSize: 64, fontWeight: 600, lineHeight: '42px', color: 'rgba(137,197,234,0.3)' }}>2</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <p style={{ ...dm, fontSize: 20, fontWeight: 700, color: '#000000', margin: 0 }}>The linear format doesn't fit how people think.</p>
                  <p style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '24px', color: '#525252', margin: 0 }}>
                    People think dynamically, but the chat only moves down. Users can't act on a single past response without excluding part of the conversation, so they copy fragments into other tools to arrange them the way they think.
                  </p>
                </div>
                <div style={{ position: 'relative', width: 174, height: 200, flexShrink: 0 }}>
                  <img src="/images/ui-for-ai/avatar-6c0e40.png" alt="" style={{ position: 'absolute', left: 14, top: 18, width: 147, height: 147, borderRadius: '50%', objectFit: 'cover' }} />
                  {/* Connecting lines */}
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <line x1="47" y1="38" x2="99" y2="19" stroke="#979797" strokeWidth="1" />
                    <line x1="131" y1="21" x2="141" y2="35" stroke="#979797" strokeWidth="1" />
                    <line x1="49" y1="43" x2="131" y2="50" stroke="#979797" strokeWidth="1" />
                  </svg>
                  {/* Thought bubble icons */}
                  <img src="/images/ui-for-ai/thought-bubble-c.svg" alt="" style={{ position: 'absolute', left: 11, top: 22, width: 37, height: 37 }} />
                  <img src="/images/ui-for-ai/thought-bubble-b.svg" alt="" style={{ position: 'absolute', left: 94, top: 0, width: 37, height: 37 }} />
                  <img src="/images/ui-for-ai/thought-bubble-a.svg" alt="" style={{ position: 'absolute', left: 127, top: 31, width: 37, height: 37 }} />
                  <div style={{ position: 'absolute', left: 9, top: 122, width: 157, height: 46, background: '#F8F8F8', borderRadius: 18, padding: 7, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 9px 0px rgba(0,0,0,0.12), -3px -3px 9px 0px rgba(0,0,0,0.12)' }}>
                    <span style={{ ...dm, fontSize: 12, fontWeight: 400, lineHeight: '15px', color: '#525252' }}>It's all connected, but it's<br />stuck in a straight line.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HMW */}
        <section id="hmw" style={{ background: '#525252', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 920 }}>
            {/* Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#4A77FF', borderRadius: 100, padding: '2px 14px', width: 'fit-content' }}>
              <span style={{ ...dm, fontSize: 12, fontWeight: 600, lineHeight: '27px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFFFFF' }}>How might we...</span>
            </div>
            {/* Question + body side by side */}
            <div className="cs-hmw-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
              <h2 style={{ ...dm, fontSize: 36, fontWeight: 500, lineHeight: '140%', color: '#FFFFFF', margin: 0, width: 444, flexShrink: 0 }}>
                Help frequent users navigate, revisit, and iterate on previous inputs and outputs within a<br />long-running, linear chat?
              </h2>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#FFFFFF', opacity: 0.7, margin: 0, width: 195, flexShrink: 0, marginLeft: 'auto' }}>
                The longer the session ran, the wider that gap. Until the tool people came to for thinking became one they had to leave in order to think.
              </p>
            </div>
          </div>
        </section>

        {/* IDEATION AND TESTING */}
        <section id="ideation" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          {/* Section title */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel text="Ideation and testing" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 600, lineHeight: '42px', color: '#000000', margin: 0 }}>
              We tested three concepts, one clear direction emerged
            </h2>
          </div>
          {/* Body + cards */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Our HMW defined a problem, not a solution, so we explored three potential approaches: navigation, retrieval, and non-linear structure. We tested the concepts with 12 participants, collected rankings to compare preferences, and used affinity diagramming to uncover patterns in the qualitative feedback.
            </p>
            <div className="cs-three-col" style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
              {[
                {
                  img: '/images/ui-for-ai/concept-bookmarking-50732f.png',
                  cardBg: '#525252', contentBg: '#525252',
                  name: 'Bookmarking', nameColor: '#FFFFFF',
                  desc: 'Saving and acting on specific outputs directly within the conversation, surfaced in a dedicated panel.',
                  descColor: '#FFFFFF',
                  rank: 'Ranked 1st', rankBg: '#4A77FF', rankColor: '#FFFFFF',
                  borderColor: '#4A77FF',
                  feedback: 'Immediately useful and intuitive across all user types.', feedbackColor: '#FFFFFF',
                },
                {
                  img: '/images/ui-for-ai/concept-timeline-222db1.png',
                  cardBg: '#FFFFFF', contentBg: '#FFFFFF',
                  name: 'Timeline', nameColor: '#525252',
                  desc: 'A scroll-like navigation bar running alongside the chat, with visual markers representing saved or significant moments.',
                  descColor: '#525252',
                  rank: 'Ranked 2nd', rankBg: '#E5E5E5', rankColor: '#525252',
                  borderColor: '#E5E5E5',
                  feedback: 'Intuitive for recall, but less useful for users with lighter, shorter session patterns.', feedbackColor: '#525252',
                },
                {
                  img: '/images/ui-for-ai/concept-branching-2563f2.png',
                  cardBg: '#FFFFFF', contentBg: '#FFFFFF',
                  name: 'Branching', nameColor: '#525252',
                  desc: 'A flexible, non-linear tree-view of chat threads representing divergent thought paths.',
                  descColor: '#525252',
                  rank: 'Ranked 3rd', rankBg: '#E5E5E5', rankColor: '#525252',
                  borderColor: '#E5E5E5',
                  feedback: 'Powerful but polarizing. Too visually heavy for everyday use.', feedbackColor: '#525252',
                },
              ].map(({ img, cardBg, contentBg, name, nameColor, desc, descColor, rank, rankBg, rankColor, borderColor, feedback, feedbackColor }) => (
                <div key={name} style={{ flex: 1, background: cardBg, borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.05), -4px -4px 12px 0px rgba(0,0,0,0.05)' }}>
                  <img src={img} alt={name} style={{ width: '100%', height: 211, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ background: contentBg, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    {/* Name row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <p style={{ ...dm, fontSize: 24, fontWeight: 600, color: nameColor, margin: 0 }}>{name}</p>
                    </div>
                    {/* Desc + ranking */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                      <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '20px', color: descColor, margin: 0 }}>{desc}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
                        {/* Rank pill */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: rankBg, borderRadius: 100, padding: '2px 14px', width: 'fit-content' }}>
                          <span style={{ ...dm, fontSize: 12, fontWeight: 600, lineHeight: '27px', letterSpacing: '0.08em', textTransform: 'uppercase', color: rankColor }}>{rank}</span>
                        </div>
                        {/* Feedback with left border */}
                        <div style={{ borderLeft: `2px solid ${borderColor}`, padding: '0 12px' }}>
                          <p style={{ ...dm, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: feedbackColor, margin: 0 }}>{feedback}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SYNTHESIS */}
        <section id="synthesis" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          {/* Section label only — no h2 */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Synthesis" />
          </div>
          {/* Content */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Intro body text */}
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              The clearest signal: users&apos; core struggle was retrieval, not generation. Scrolling and Cmd+F were common workarounds, but most users just re-asked rather than digging back through the chat.
              {'\n'}That split pointed to two distinct needs:
            </p>
            {/* Two user insight cards */}
            <div className="cs-two-col" style={{ display: 'flex', flexDirection: 'row', gap: 24, paddingBottom: 24 }}>
              {/* Everyday users */}
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: '32px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, boxShadow: '2px 2px 10px 0px rgba(0,0,0,0.03), -2px -2px 10px 0px rgba(0,0,0,0.03)', border: '1px solid #ECEEEE' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#4A77FF" style={{ flexShrink: 0 }}>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <p style={{ ...dm, fontSize: 20, fontWeight: 600, color: '#000000', margin: 0 }}>Everyday users</p>
                  <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '24px', color: '#525252', margin: 0 }}>I wanted automation and quick recall</p>
                </div>
              </div>
              {/* Power Users */}
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: '32px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, boxShadow: '2px 2px 10px 0px rgba(0,0,0,0.03), -2px -2px 10px 0px rgba(0,0,0,0.03)', border: '1px solid #ECEEEE' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#4A77FF" style={{ flexShrink: 0 }}>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  <path d="M19 3l.94 2.06L22 6l-2.06.94L19 9l-.94-2.06L16 6l2.06-.94z"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <p style={{ ...dm, fontSize: 20, fontWeight: 600, color: '#000000', margin: 0 }}>Power Users</p>
                  <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '24px', color: '#525252', margin: 0 }}>I wanted depth and control.</p>
                </div>
              </div>
            </div>
            {/* Affinity diagram + text side by side */}
            <div className="cs-affinity-row" style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start' }}>
              <img
                src="/images/ui-for-ai/affinity-diagram.png"
                alt="Affinity diagram"
                className="cs-affinity-img"
                style={{ width: 340, height: 320, objectFit: 'cover', borderRadius: 20, display: 'block', flexShrink: 0 }}
              />
              {/* Text block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                  Timeline was helpful but too passive. Branching appealed to power users but overwhelmed others.
                  {' '}The overlap pointed toward a single integrated recall surface: <strong style={{ fontWeight: 600 }}>one that took the</strong>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    'navigation simplicity of Timeline',
                    'the flexibility of Branching',
                    'the intuitiveness of Bookmarking',
                  ].map(line => (
                    <p key={line} style={{ ...dm, fontSize: 17, fontWeight: 600, lineHeight: '27px', color: '#525252', margin: 0 }}>
                      • {line}
                    </p>
                  ))}
                </div>
                <p style={{ ...dm, fontSize: 17, fontWeight: 600, lineHeight: '27px', color: '#525252', margin: 0 }}>
                  without the cognitive overhead of<br />any one concept alone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION 01 */}
        <section id="solution-01" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          {/* Section title block */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel text="Solution" />
            <h2 style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '120%', color: '#000000', margin: 0 }}>
              Transforming the linear chat into<br />an interactive workspace
            </h2>
          </div>
          {/* Content block */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Number + section name row */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px 0', flexShrink: 0 }}>
                <span style={{ ...dm, fontSize: 64, fontWeight: 500, lineHeight: '42px', color: '#D9D9D9' }}>01</span>
              </div>
              <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>Jump to any saved output from a sidebar index</h3>
            </div>
            {/* Subtitle */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ ...dm, fontSize: 24, fontWeight: 600, color: '#4A77FF', margin: 0 }}>Bookmarking and Navigation</p>
            </div>
            {/* Body */}
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Users can directly save any output and revisit AI responses. By separating retrieval from generation, it removes the need to scroll or re-ask, so users can quickly reorient when returning to a long conversation. As the conversation grows, the panel becomes a non-linear map of the thread, not a reflection of its length.
            </p>
            {/* GIF */}
            <div className="cs-gif-container" style={{ width: '100%', height: 570, overflow: 'hidden', borderRadius: 28, border: '1px solid #ECEEEE' }}>
              <img src="/images/ui-for-ai/feature-01.gif" alt="Bookmarking and navigation demo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* SOLUTION 02 */}
        <section id="solution-02" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px 0', flexShrink: 0 }}>
                <span style={{ ...dm, fontSize: 64, fontWeight: 500, lineHeight: '42px', color: '#D9D9D9' }}>02</span>
              </div>
              <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>Group saved outputs by project, theme, or phase</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ ...dm, fontSize: 24, fontWeight: 600, color: '#4A77FF', margin: 0 }}>Bookmark Collections</p>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Users can organize bookmarks into self-created Collections, structured around any grouping that makes sense to them. What once disappeared into the scroll becomes something users can return to, build on, and organize according to their own mental model across sessions, projects, and time.
            </p>
            <div className="cs-gif-container" style={{ width: '100%', height: 570, overflow: 'hidden', borderRadius: 28, border: '1px solid #ECEEEE' }}>
              <img src="/images/ui-for-ai/feature-02.gif" alt="Bookmark collections demo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* SOLUTION 03 */}
        <section id="solution-03" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px 0', flexShrink: 0 }}>
                <span style={{ ...dm, fontSize: 64, fontWeight: 500, lineHeight: '42px', color: '#D9D9D9' }}>03</span>
              </div>
              <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>Apply prompts to selected outputs without noise</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ ...dm, fontSize: 24, fontWeight: 600, color: '#4A77FF', margin: 0 }}>Direct Iteration</p>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Users can select one or multiple bookmarked outputs, even across chats, and apply a new prompt directly to them. Unrelated responses no longer interrupt the thread. Users can refine, combine, or build on exactly what they've chosen, with full clarity about what the AI is responding to.
            </p>
            <div className="cs-gif-container" style={{ width: '100%', height: 570, overflow: 'hidden', borderRadius: 28, border: '1px solid #ECEEEE' }}>
              <img src="/images/ui-for-ai/feature-03.gif" alt="Direct iteration demo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* DESIGN DECISIONS */}
        <section id="design-decisions" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div className="fade-section" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Title block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SectionLabel text="Design Decisions Highlights" />
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 600, lineHeight: '42px', color: '#000000', margin: 0 }}>
                How user behavior shaped our design decisions
              </h2>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              After converging on a solution, a second round of testing shaped several deliberate choices.
            </p>
            {/* Decision 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ ...dm, fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '42px', color: '#4A77FF', margin: 0 }}>Decision 1</p>
                <h4 style={{ ...dm, fontSize: 24, fontWeight: 600, lineHeight: '120%', color: '#525252', margin: 0 }}>Bookmarking across chats, not just within one</h4>
              </div>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                Early designs scoped bookmarks to a single conversation. In testing, users naturally wanted to pull strong outputs across chats, especially on ongoing projects. The boundary sat right where users most wanted to move freely.
              </p>
              <div className="cs-two-col" style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
                <VersionCard
                  image="/images/ui-for-ai/decision-1a-mockup.png"
                  imageAlt="Bookmark within chat"
                  title="Version A: Bookmark within chat"
                  imageMaxWidth="75%"
                  imageBoxHeight={386}
                  pointFontSize={14}
                  contentGap={40}
                  points={[
                    { good: true, text: 'Simpler, contained experience' },
                    { good: false, icon: 'x', text: 'Breaks down when working across multiple sessions' },
                  ]}
                />
                <VersionCard
                  image="/images/ui-for-ai/decision-1b-mockup.png"
                  imageAlt="Bookmark across chats"
                  title="Version B: Bookmark across chats"
                  winner
                  imageMaxWidth="75%"
                  imageBoxHeight={386}
                  pointFontSize={14}
                  contentGap={40}
                  points={[
                    { good: true, text: 'More flexible, can build on any output from any session' },
                    { good: false, text: 'Adds complexity to how bookmarks are organized' },
                  ]}
                />
              </div>
            </div>
            {/* Decision 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ ...dm, fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '42px', color: '#4A77FF', margin: 0 }}>Decision 2</p>
                <h4 style={{ ...dm, fontSize: 24, fontWeight: 600, lineHeight: '120%', color: '#525252', margin: 0 }}>Collections stay focused: one at a time</h4>
              </div>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                Saving outputs is only useful if users can find them again. When multiple collections were visible at once, the panel became cluttered and users were back to scrolling, which is the exact problem we set out to solve.
              </p>
              <div className="cs-two-col" style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
                <VersionCard
                  image="/images/ui-for-ai/decision-2a-mockup.png"
                  imageAlt="Multiple collections visible"
                  title="Version A: Multiple collections visible"
                  imageMaxWidth="85%"
                  imageBoxHeight={226}
                  pointFontSize={14}
                  contentGap={40}
                  points={[
                    { good: true, text: 'More flexible, everything accessible at a glance' },
                    { good: false, icon: 'x', text: 'Panel gets cluttered, back to scrolling' },
                  ]}
                />
                <VersionCard
                  image="/images/ui-for-ai/decision-2b-mockup.png"
                  imageAlt="One collection at a time"
                  title="Version B: One collection at a time"
                  winner
                  imageMaxWidth="85%"
                  imageBoxHeight={226}
                  pointFontSize={14}
                  contentGap={40}
                  points={[
                    { good: true, text: 'Each collection feels like a dedicated, intentional space' },
                    { good: false, text: 'Less immediate access to other collections' },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* REFLECTION */}
        <section id="reflection" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 920 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Reflection" />
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 600, lineHeight: '42px', color: '#000000', margin: 0 }}>Future Directions</h2>
            </div>
            <div className="cs-two-col" style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: 24, boxShadow: '2px 2px 10px 0px rgba(0,0,0,0.03), -2px -2px 10px 0px rgba(0,0,0,0.03)', border: '1px solid #ECEEEE', display: 'flex', flexDirection: 'column', gap: 32 }}>
                <Pill text="What I'd done differently" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h4 style={{ ...dm, fontSize: 24, fontWeight: 600, color: '#000000', margin: 0, whiteSpace: 'pre-line' }}>{'Segment by why,\nnot just how much.'}</h4>
                  <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                    Testing surfaced two user types: everyday users and power users. But intensity doesn&apos;t capture the full picture. Someone doing creative synthesis and someone doing casual research behave differently not because of how much they use AI chat, but because of why they&apos;re there. Next time I&apos;d segment by use case from the start so the solution gets tested against the actual workflows it&apos;s meant to serve.
                  </p>
                </div>
              </div>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: 24, boxShadow: '2px 2px 10px 0px rgba(0,0,0,0.03), -2px -2px 10px 0px rgba(0,0,0,0.03)', border: '1px solid #ECEEEE', display: 'flex', flexDirection: 'column', gap: 32 }}>
                <Pill text="Next step" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h4 style={{ ...dm, fontSize: 24, fontWeight: 600, color: '#000000', margin: 0, whiteSpace: 'pre-line' }}>{'More on organization,\nsurfacing, versioning'}</h4>
                  <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                    This project focused on improving conversation flow within existing chat interfaces. The larger opportunity lies in rethinking how conversations accumulate value over time, AI-assisted organization, smarter surfacing of relationships between saved outputs, and versioning that tracks how an idea evolves across iterations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Next Project */}
      <div
        className="cs-next-project-outer"
        onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
        style={{ borderTop: '1px solid #E5E5E5', padding: '61px 125px 60px' }}
      >
        <p style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '42px', color: '#000000', marginBottom: 40, marginTop: 0 }}>Next Project</p>
        <Link to="/amazon-music" style={{ display: 'block', textDecoration: 'none' }}>
          <div
            className="cs-next-project-row"
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 48 }}
          >
            <div className="cs-next-project-img" style={{ width: 499, height: 315, flexShrink: 0, borderRadius: 20, overflow: 'hidden', boxShadow: '4px 4px 12px rgba(0,0,0,0.12)' }}>
              <video
                src="/videos/am_thumbnail.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.15)', transformOrigin: 'center center' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ ...dm, fontSize: 24, fontWeight: 700, color: '#2D2D2D', margin: 0 }}>Amazon Music</h3>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#2D2D2D', margin: 0 }}>
                Bridging the gap between listeners and creators through a reimagined<br />Amazon Music experience
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Product Design', 'Interaction Design'].map(tag => (
                  <span key={tag} style={{ background: '#F3F3F3', borderRadius: 20, padding: '8px 24px', fontSize: 14, color: '#000000', fontFamily: 'Inter, sans-serif' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Custom cursor for next project */}
      <div style={{
        position: 'fixed',
        left: cursorPos.x,
        top: cursorPos.y,
        transform: 'translate(12px, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: cursorVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        background: '#2D2D2D',
        color: '#fff',
        borderRadius: 100,
        padding: '10px 20px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}>
        View Project
      </div>

      <Footer />
    </>
  )
}
