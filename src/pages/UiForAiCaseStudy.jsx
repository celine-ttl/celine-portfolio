import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'user-interviews', label: 'Interviews' },
  { id: 'problem-space', label: 'Problem' },
  { id: 'ideation', label: 'Ideation' },
  { id: 'solution-01', label: 'Solution' },
  { id: 'design-decisions', label: 'Decisions' },
  { id: 'reflection', label: 'Reflection' },
]

function SideNav({ visible, active }) {
  return (
    <div className="cs-sidenav" style={{
      position: 'fixed', top: 200, right: 40,
      display: 'flex', flexDirection: 'column',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(16px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
      pointerEvents: visible ? 'auto' : 'none', zIndex: 40,
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

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Pill({ text, bg = '#4A77FF', color = '#FFFFFF' }) {
  return (
    <div style={{ ...dm, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: bg, color, borderRadius: 100, padding: '0 24px', fontSize: 17, fontWeight: 600, lineHeight: '27px', width: 'fit-content' }}>
      {text}
    </div>
  )
}

function CalloutCard({ pill, body }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 24, background: '#FFFFFF', padding: 24, boxShadow: '4px 4px 18px 0px rgba(0,0,0,0.1), -4px -4px 18px 0px rgba(0,0,0,0.1)' }}>
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

export default function UiForAiCaseStudy() {
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const heroRef = useRef(null)
  const nextProjectRef = useRef(null)
  const heroInViewRef = useRef(true)

  useEffect(() => {
    const heroObs = new IntersectionObserver(
      ([e]) => {
        heroInViewRef.current = e.isIntersecting
        setNavVisible(!e.isIntersecting)
      }, { threshold: 0 }
    )
    const nextObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNavVisible(false)
        else if (!heroInViewRef.current) setNavVisible(true)
      }, { threshold: 0 }
    )
    if (heroRef.current) heroObs.observe(heroRef.current)
    if (nextProjectRef.current) nextObs.observe(nextProjectRef.current)
    return () => { heroObs.disconnect(); nextObs.disconnect() }
  }, [])

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
      <SideNav visible={navVisible} active={activeSection} />

      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ height: 80, boxShadow: '0 1px 0 rgba(0,0,0,0.08)' }}>
        <div className="flex items-center justify-between h-full" style={{ padding: '0 48px' }}>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img src="/images/logo-46ec0d.png" alt="Celine Tseng logo" width={116} height={51} className="object-fill" />
          </Link>
          <div className="hidden sm:flex items-center" style={{ marginLeft: 'auto', gap: 52 }}>
            <Link to="/#work" className="text-[#2D2D2D] text-[17px] font-normal leading-7 hover:opacity-70 transition-opacity" style={dm}>Work</Link>
            <Link to="/#about" className="text-[#2D2D2D] text-[17px] font-normal leading-7 hover:opacity-70 transition-opacity" style={dm}>About</Link>
            <Link to="/#contact" className="text-[#2D2D2D] text-[17px] font-normal leading-7 hover:opacity-70 transition-opacity" style={dm}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Case study hero */}
      <div ref={heroRef} className="cs-hero-outer" style={{ marginTop: 80, background: '#FFFFFF', display: 'flex', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column', gap: 32, padding: '40px 0' }}>
          {/* Top row: text + image */}
          <div className="cs-hero-row" style={{ display: 'flex', flexDirection: 'row', gap: 48, alignItems: 'stretch' }}>
            {/* Left: text column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <h1 style={{ ...dm, fontSize: 48, fontWeight: 700, lineHeight: '60px', color: '#000000', margin: 0 }}>
                UI for AI -<br />Conversation flow
              </h1>
              <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D', margin: 0 }}>
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
              <img src="/images/ui-for-ai/hero-card.gif" alt="UI for AI preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 17, display: 'block' }} />
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

      <main>
        {/* OVERVIEW */}
        <section id="overview" className="flex flex-col items-center bg-white" style={{ padding: '60px 55px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Overview" />
              <h2 style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '120%', color: '#000000', margin: 0 }}>
                Humans don't think in straight lines — but AI chat interfaces are built like they do
              </h2>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Creative work is iterative. Research is non-linear. Ideas get revisited, refined, and built on over time. Yet most AI chat interfaces treat every conversation like a one-way scroll — outputs accumulate, good moments disappear, and users are left starting over instead of building forward.
            </p>
            <CalloutCard
              pill="Project Summary"
              body="This project explores how AI chat interfaces might better support the way people actually work — making it easier to go back, find what mattered, and build on what's already there."
            />
            {/* UI for AI Series callout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 24, background: '#FFFFFF', border: '1px solid #F3F3F3', padding: 24 }}>
              <p style={{ ...dm, fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4A77FF', margin: 0 }}>Part of the UI for AI series</p>
              <div className="cs-overview-row" style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-start' }}>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0, flex: 1 }}>
                  This is one entry in UI for AI: an ongoing project at Carnegie Mellon University, led by Dan Saffer, investigating how interfaces and interaction patterns need to change in the age of AI.
                  <br /><br />
                  See the full series at{' '}
                  <a href="https://uiforai.design" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">uiforai.design</a>
                </p>
                <img src="/images/ui-for-ai/series-screenshot.png" alt="UI for AI series screenshot" className="cs-series-img" style={{ width: 240, borderRadius: 16, flexShrink: 0, boxShadow: '4px 4px 12px rgba(0,0,0,0.1)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* USER INTERVIEWS */}
        <section id="user-interviews" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="User Interviews" />
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
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
        <section id="problem-space" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Problem Space" />
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
                Linear chat means starting over for frequent AI users
              </h2>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              Through these interviews, we synthesized our findings into key pain points. Each one pushes the user toward the same fallback: starting over, and the work already done is effectively lost.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  n: '1',
                  heading: "The users can't get back to their own work.",
                  body: "Good outputs and prompts vanished into the scroll, so users couldn't relocate or reuse what worked. Finding cost more than re-asking, so people re-asked and lost the work they'd already done.",
                },
                {
                  n: '2',
                  heading: "The linear format doesn't fit how people think.",
                  body: "Thinking is dynamic, but chat only moves down. Users can't act on a single past response without excluding certain part of the conversation, so they copy fragments into other tools just to arrange them the way they actually think.",
                },
              ].map(({ n, heading, body }) => (
                <div key={n} style={{ background: '#FFFFFF', borderRadius: 24, padding: '32px 24px', display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center', boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.05), -4px -4px 12px 0px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: 52, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px 14px' }}>
                    <span style={{ ...dm, fontSize: 64, fontWeight: 500, lineHeight: '42px', color: 'rgba(137,197,234,0.3)' }}>{n}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    <p style={{ ...dm, fontSize: 20, fontWeight: 700, color: '#000000', margin: 0 }}>{heading}</p>
                    <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '24px', color: '#525252', margin: 0 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HMW */}
        <section id="hmw" style={{ background: '#525252', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 800 }}>
            {/* Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#4A77FF', borderRadius: 100, padding: '0 24px', width: 'fit-content' }}>
              <span style={{ ...dm, fontSize: 17, fontWeight: 500, lineHeight: '42px', color: '#FFFFFF' }}>How might we...</span>
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
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel text="Ideation and testing" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
              We tested three concepts, one clear direction emerged
            </h2>
          </div>
          {/* Body + cards */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              From our HMW Statement, we explored three early concepts as sketches. To compare them, we had participants rank the concepts by preference and converted those rankings into points; we then used affinity diagramming to consolidate the qualitative feedback.
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '20px', color: descColor, margin: 0 }}>{desc}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {/* Rank pill */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: rankBg, borderRadius: 100, padding: '0 24px', width: 'fit-content' }}>
                          <span style={{ ...dm, fontSize: 12, fontWeight: 500, lineHeight: '20px', color: rankColor }}>{rank}</span>
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
          <div className="fade-section" style={{ width: '100%', maxWidth: 800 }}>
            <SectionLabel text="Synthesis" />
          </div>
          {/* Content */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Intro body text */}
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              The clearest signal: users&apos; core struggle was retrieval, not generation. Scrolling and Cmd+F were common workarounds, but most users just re-asked rather than digging back through the chat.
              {'\n'}That split pointed to two distinct needs:
            </p>
            {/* Two user insight cards */}
            <div className="cs-two-col" style={{ display: 'flex', flexDirection: 'row', gap: 24, paddingBottom: 24 }}>
              {/* Everyday users */}
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: '32px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.05), -4px -4px 12px 0px rgba(0,0,0,0.05)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#4A77FF" style={{ flexShrink: 0 }}>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <p style={{ ...dm, fontSize: 20, fontWeight: 600, color: '#000000', margin: 0 }}>Everyday users</p>
                  <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '24px', color: '#525252', margin: 0 }}>I wanted automation and quick recall</p>
                </div>
              </div>
              {/* Power Users */}
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: '32px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.05), -4px -4px 12px 0px rgba(0,0,0,0.05)' }}>
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
            {/* Affinity diagram */}
            <img
              src="/images/ui-for-ai/affinity-diagram.png"
              alt="Affinity diagram"
              style={{ width: '100%', height: 505, objectFit: 'cover', borderRadius: 20, display: 'block' }}
            />
            {/* Text block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
                    — {line}
                  </p>
                ))}
              </div>
              <p style={{ ...dm, fontSize: 17, fontWeight: 600, lineHeight: '27px', color: '#525252', margin: 0 }}>
                without the cognitive overhead of any one concept alone.
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION 01 */}
        <section id="solution-01" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          {/* Section title block */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel text="Solution" />
            <h2 style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '120%', color: '#000000', margin: 0 }}>
              Transforming the linear chat into<br />an interactive workspace
            </h2>
          </div>
          {/* Content block */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 24 }}>
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
            <div className="cs-gif-container" style={{ width: '100%', height: 570, overflow: 'hidden', borderRadius: 28, boxShadow: '0px 12px 12px 0px rgba(0,0,0,0.12)' }}>
              <img src="/images/ui-for-ai/feature-01.gif" alt="Bookmarking and navigation demo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* SOLUTION 02 */}
        <section id="solution-02" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 24 }}>
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
            <div className="cs-gif-container" style={{ width: '100%', height: 570, overflow: 'hidden', borderRadius: 28, boxShadow: '0px 12px 12px 0px rgba(0,0,0,0.12)' }}>
              <img src="/images/ui-for-ai/feature-02.gif" alt="Bookmark collections demo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* SOLUTION 03 */}
        <section id="solution-03" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 24 }}>
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
            <div className="cs-gif-container" style={{ width: '100%', height: 570, overflow: 'hidden', borderRadius: 28, boxShadow: '0px 12px 12px 0px rgba(0,0,0,0.12)' }}>
              <img src="/images/ui-for-ai/feature-03.gif" alt="Direct iteration demo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* DESIGN DECISIONS */}
        <section id="design-decisions" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          {/* Title block */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel text="Design Decisions Highlights" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
              How user behavior shaped our design decisions
            </h2>
          </div>
          {/* Content block */}
          <div className="fade-section" style={{ width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              After converging on a solution, a second round of testing informed deliberate design decisions.
            </p>
            {/* Decision 1 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ ...dm, fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '42px', color: '#4A77FF', margin: 0 }}>Decision 1</p>
              <h4 style={{ ...dm, fontSize: 24, fontWeight: 600, lineHeight: '120%', color: '#525252', margin: 0 }}>Bookmarking across chats, not just within one</h4>
              <img src="/images/ui-for-ai/decision-1-mockup.png" alt="Decision 1 mockup" style={{ width: '100%', borderRadius: 16, display: 'block' }} />
              <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '24px', color: '#525252', margin: 0 }}>
                Early designs scoped bookmarks to a single conversation. But in testing, users naturally wanted to pull strong outputs across chats, especially on ongoing projects. That invisible wall sat right where users most wanted to move freely. So we expanded bookmarks cross-chat, letting the panel become a workspace that lives above any single conversation.
              </p>
            </div>
            {/* Decision 2 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 24, padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ ...dm, fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '42px', color: '#4A77FF', margin: 0 }}>Decision 2</p>
              <h4 style={{ ...dm, fontSize: 24, fontWeight: 600, lineHeight: '120%', color: '#525252', margin: 0 }}>Collections stay focused: one at a time</h4>
              {/* Images row with arrow between */}
              <div className="cs-decision2-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <img src="/images/ui-for-ai/decision-2a-mockup.png" alt="Multiple collections open" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
                </div>
                <svg className="cs-decision2-spacer" width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M23 1L31 9M31 9L23 17M31 9H1" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <img src="/images/ui-for-ai/decision-2b-mockup.png" alt="Single collection open" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
                </div>
              </div>
              {/* Text row — spacer width matches arrow width so text aligns under each image */}
              <div className="cs-decision2-row" style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '24px', color: '#525252', margin: 0, flex: 1 }}>
                  When multiple collections were visible simultaneously, the panel became cluttered and users were back to scrolling — which goes back to the exact problem we were solving.
                </p>
                <div className="cs-decision2-spacer" style={{ width: 32, flexShrink: 0 }} />
                <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '24px', color: '#525252', margin: 0, flex: 1 }}>
                  Keeping only one collection open at a time removed that overhead and made each collection feel like a dedicated, intentional space rather than another pile to manage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REFLECTION */}
        <section id="reflection" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: '100%', maxWidth: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Reflection" />
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 600, lineHeight: '42px', color: '#000000', margin: 0 }}>Future Directions</h2>
            </div>
            <div className="cs-two-col" style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: 24, boxShadow: '4px 4px 18px rgba(0,0,0,0.1), -4px -4px 18px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Pill text="What I'd done differently" />
                <h4 style={{ ...dm, fontSize: 24, fontWeight: 700, color: '#000000', margin: 0, whiteSpace: 'pre-line' }}>{'Define success metrics\nup front'}</h4>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                  The core problem was measurable: users re-ask instead of retrieving. I'd have set a target early — reduction in re-asking, or time to find a past output — so the solution could be evaluated against the problem rather than argued for.
                </p>
              </div>
              <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 24, padding: 24, boxShadow: '4px 4px 18px rgba(0,0,0,0.1), -4px -4px 18px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Pill text="Next step" />
                <h4 style={{ ...dm, fontSize: 24, fontWeight: 700, color: '#000000', margin: 0, whiteSpace: 'pre-line' }}>{'More on organization,\nsurfacing, versioning'}</h4>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                  This project focused on improving conversation flow within existing chat interfaces. The larger opportunity lies in rethinking how conversations accumulate value over time, AI-assisted organization, smarter surfacing of relationships between saved outputs, and versioning that tracks how an idea evolves across iterations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Next Project */}
      <div ref={nextProjectRef} className="cs-next-project-outer" style={{ borderTop: '1px solid #E5E5E5', padding: '61px 125px 60px' }}>
        <p style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '42px', color: '#000000', marginBottom: 40, marginTop: 0 }}>Next Project</p>
        <div className="cs-next-project-row" style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          <div className="cs-next-project-img" style={{ width: 499, height: 315, flexShrink: 0, borderRadius: 20, overflow: 'hidden', boxShadow: '4px 4px 12px rgba(0,0,0,0.12)' }}>
            <img src="/images/ui-for-ai/next-project.png" alt="Amazon Music" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.15)', transformOrigin: 'center center' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ ...dm, fontSize: 24, fontWeight: 700, color: '#2D2D2D', margin: 0 }}>Amazon Music (Coming soon)</h3>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#2D2D2D', margin: 0 }}>
              Bridging the gap between listeners and creators through a reimagined Amazon Music experience
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Product Design', 'Interaction Design'].map(tag => (
                <span key={tag} style={{ background: '#F3F3F3', borderRadius: 20, padding: '8px 24px', fontSize: 14, color: '#000000', fontFamily: 'Inter, sans-serif' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#F3F3F3]">
        <div className="cs-footer-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '61px 125px 60px', display: 'flex', flexDirection: 'column', gap: 70 }}>
          <div className="cs-footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <div style={{ width: 235 }}>
                <h2 style={{ ...dm, fontSize: 60, fontWeight: 800, lineHeight: '62px', color: '#000000', margin: 0 }}>Let&apos;s work together!</h2>
              </div>
              <img src="/images/footer-portrait-303597.png" alt="Celine portrait" style={{ width: 176, height: 185, objectFit: 'cover', flexShrink: 0 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'end', gap: 32 }}>
              <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D', maxWidth: 447, margin: 0 }}>
                I&apos;m currently available for new work.
                <br />Feel free to grab a virtual coffee with me via{' '}
                <a href="mailto:celine900423lu@gmail.com" className="underline hover:opacity-70 transition-opacity">email</a>!
              </p>
            </div>
          </div>
          <div className="cs-footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D', margin: 0 }}>
              Crafted with Cursor, Claude Code, and too much caffeine.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 38 }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} className="hover:opacity-70 transition-opacity">
                <span style={{ ...dm, fontSize: 17, fontWeight: 500, lineHeight: '27px', color: '#4A77FF' }}>Linkedin</span>
                <ArrowDiagonal />
              </a>
              <a href="mailto:celine900423lu@gmail.com" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} className="hover:opacity-70 transition-opacity">
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
