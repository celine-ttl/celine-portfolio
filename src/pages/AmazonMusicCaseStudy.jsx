import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import SyncedScrollDemo from '../components/SyncedScrollDemo'

const dm = { fontFamily: 'DM Sans, sans-serif' }

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'research', label: 'Research' },
  { id: 'direction', label: 'Ideation' },
  { id: 'solution-system', label: 'System Design' },
  { id: 'decision-1', label: 'Design Decisions' },
  { id: 'why-this-works', label: 'Why This Works' },
  { id: 'result', label: 'Result' },
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

function SectionLabel({ text, color = '#979797' }) {
  return (
    <p style={{ ...dm, fontSize: 16, fontWeight: 400, lineHeight: '42px', textTransform: 'uppercase', letterSpacing: '0.05em', color, margin: 0 }}>{text}</p>
  )
}

function Pill({ text, bg = '#4A77FF', color = '#FFFFFF' }) {
  return (
    <div style={{ ...dm, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: bg, color, borderRadius: 100, padding: '2px 14px', fontSize: 12, fontWeight: 600, lineHeight: '27px', letterSpacing: '0.08em', textTransform: 'uppercase', width: 'fit-content' }}>
      {text}
    </div>
  )
}

function InfoCard({ pill, heading, body, flex, padding = '26px 24px', gap = 14 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, borderRadius: 24, background: '#FFFFFF', border: '1px solid #ECEEEE', boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)', padding, ...(flex ? { flex: 1, minWidth: 0 } : {}) }}>
      <Pill text={pill} />
      {heading && <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 20, fontWeight: 500, color: '#101314' }}>{heading}</span>}
      <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>{body}</p>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 1.5L11 6.5L2 11.5V1.5Z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function TrackCard({ label }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20, padding: 22 }}>
      <span style={{ ...dm, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B9C9FF' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: '#000000', borderRadius: 13, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <img src="/images/amazon-music/album-cover.png" alt="" width={42} height={42} style={{ borderRadius: 3, display: 'block', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>I&apos;ve Seen It</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#A6A6A6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Olivia Dean • 1,423,456,789</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <img src="/images/amazon-music/icon-like.svg" alt="" width={24} height={24} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: '#25D1DA', flexShrink: 0 }}>
            <PlayIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

function GifPlaceholder({ height }) {
  return (
    <div style={{ width: '100%', height, borderRadius: 24, background: '#EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, color: '#ABABAB' }}>GIF placeholder</span>
    </div>
  )
}

function SolutionBlock({ caption, heading, body, flex, gifSrc, media }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, ...(flex ? { flex: 1, minWidth: 0 } : {}) }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#979797' }}>{caption}</span>
          <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 24, fontWeight: 400, lineHeight: '42px', color: '#000000' }}>{heading}</span>
        </div>
        <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>{body}</p>
      </div>
      {media
        ? media
        : gifSrc
          ? <img src={gifSrc} alt="" style={{ width: '100%', aspectRatio: '812 / 1080', objectFit: 'cover', borderRadius: 24, display: 'block', flexShrink: 0 }} />
          : <GifPlaceholder height={600} />}
    </div>
  )
}

function ResearchCard({ caption, image, heading, body }) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14, background: '#FFFFFF', border: '1px solid #ECEEEE', borderRadius: 20, boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)', padding: '30px 24px' }}>
      <span style={{ ...dm, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#979797' }}>{caption}</span>
      <img src={image} alt="" style={{ width: '100%', height: 202, objectFit: 'cover', borderRadius: 24, display: 'block' }} />
      <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 20, fontWeight: 600, color: '#2B3433', whiteSpace: 'pre-line' }}>{heading}</span>
      <p style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#525252', margin: 0 }}>{body}</p>
    </div>
  )
}

function IdeationCard({ title, subtitle, rationale, image, winner }) {
  return (
    <div className="am-ideation-card" style={{ display: 'flex', alignItems: 'center', gap: 32, background: '#FFFFFF', border: `1px solid ${winner ? '#4A77FF' : '#ECEEEE'}`, boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.04)', borderRadius: 20, padding: '12px 24px' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 20, fontWeight: 600, color: '#101314' }}>{title}</span>
        <span style={{ ...dm, fontSize: 14, fontStyle: 'italic', lineHeight: '22px', color: '#55605F' }}>{subtitle}</span>
        <span style={{ ...dm, fontSize: 14, lineHeight: '22px', color: '#4A4A55', paddingTop: 12, borderTop: '1px solid #F0F2F2' }}>{rationale}</span>
      </div>
      <div className="am-ideation-card-image" style={{ position: 'relative', width: 292, height: 202, flexShrink: 0 }}>
        <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24, display: 'block' }} />
        {winner && (
          <span style={{ position: 'absolute', top: 12, left: 12, ...dm, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', background: '#4A77FF', borderRadius: 20, padding: '4px 10px' }}>Winner</span>
        )}
      </div>
    </div>
  )
}

function NeedRow({ label, caption, chips }) {
  return (
    <div className="am-need-row" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 24, paddingBottom: 12 }}>
      <div className="am-need-label" style={{ width: 112, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 600, color: '#525252' }}>{label}</span>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252' }}>{caption}</span>
      </div>
      <div className="am-need-chips" style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
        {chips.map((chip, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '20px 12px', borderRadius: 8, background: `rgba(74,119,255,${chip.opacity})` }}>
            {chip.text && <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 600, color: '#525252' }}>{chip.text}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const MOCKUP_BLOCK_STYLES = {
  plain: { bg: '#3F3F3F', color: '#C9C9C9', weight: 300 },
  highlight1: { bg: '#B6C8FF', color: '#101625', weight: 600 },
  highlight2: { bg: '#4A77FF', color: '#FFFFFF', weight: 600 },
  highlight3: { bg: '#2F55CC', color: '#FFFFFF', weight: 600 },
}

function MockupBlock({ text, variant }) {
  const s = MOCKUP_BLOCK_STYLES[variant]
  return (
    <div style={{ display: 'flex', padding: '7px 8px', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch', background: s.bg, borderRadius: 6 }}>
      <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 9, lineHeight: '11.7px', fontWeight: s.weight, color: s.color }}>{text}</span>
    </div>
  )
}

const TIER_MOCKUPS = [
  {
    id: 'new',
    label: 'New Listener',
    blocks: [
      { text: 'New album announcement', variant: 'highlight1' },
      { text: 'Top songs', variant: 'plain' },
      { text: 'Top albums', variant: 'plain' },
      { text: 'Because you like …', variant: 'highlight1' },
      { text: 'Fan favorites', variant: 'highlight1' },
      { text: 'Releases', variant: 'plain' },
      { text: 'Podcasts about Olivia', variant: 'plain' },
      { text: 'Related radio stations', variant: 'plain' },
      { text: 'Artist fans also like', variant: 'plain' },
    ],
  },
  {
    id: 'engaged',
    label: 'Engaged Listener',
    blocks: [
      { text: 'New album announcement', variant: 'highlight1' },
      { text: 'Top songs', variant: 'plain' },
      { text: 'Top albums', variant: 'plain' },
      { text: 'Continue your journey', variant: 'highlight2' },
      { text: 'More to explore', variant: 'highlight2' },
      { text: 'Superfan favorites', variant: 'highlight2' },
      { text: 'Releases', variant: 'plain' },
      { text: 'Podcasts about Olivia', variant: 'plain' },
      { text: 'Related radio stations', variant: 'plain' },
      { text: 'Artist fans also like', variant: 'plain' },
    ],
  },
  {
    id: 'superfan',
    label: 'Superfan',
    blocks: [
      { text: 'New album announcement', variant: 'highlight1' },
      { text: 'Since your last visit', variant: 'highlight3' },
      { text: 'Your favorites', variant: 'highlight3' },
      { text: 'Top songs', variant: 'plain' },
      { text: 'Top albums', variant: 'plain' },
      { text: 'Your playlists with Olivia', variant: 'highlight3' },
      { text: 'Releases', variant: 'plain' },
      { text: 'Podcasts about Olivia', variant: 'plain' },
      { text: 'Related radio stations', variant: 'plain' },
      { text: 'Artist fans also like', variant: 'plain' },
    ],
  },
]

function TierMockup({ label, blocks, active, onClick }) {
  return (
    <div className={`am-tier-mockup-btn${active ? ' active' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 12, flex: 1, minWidth: 0 }}>
      <span style={{ ...dm, fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', color: active ? '#D998AD' : '#979797' }}>{label}</span>
      <button
        onClick={onClick}
        style={{
          display: 'flex', flexDirection: 'column', gap: 5, padding: 10,
          background: '#1C1C1C', borderRadius: 20,
          border: active ? '4px solid #E494AE' : '4px solid transparent',
          cursor: 'pointer', textAlign: 'left', width: '100%', font: 'inherit',
        }}
      >
        <div style={{ background: '#000000', borderRadius: 8, padding: '11px 8px', textAlign: 'center', marginBottom: 2 }}>
          <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 9.5, fontWeight: 600, color: '#FFFFFF' }}>Header</span>
        </div>
        {blocks.map((b, i) => <MockupBlock key={i} {...b} />)}
        <div style={{ background: '#000000', borderRadius: 8, padding: '11px 8px', textAlign: 'center', marginTop: 2 }}>
          <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 9.5, fontWeight: 300, color: '#9A9A9A' }}>Nav bar</span>
        </div>
      </button>
    </div>
  )
}

function RuleLegend({ label, top, bottom }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 80, flexShrink: 0, alignSelf: 'stretch' }}>
      <span style={{ ...dm, fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#979797' }}>{label}</span>
      <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 500, color: '#4A77FF' }}>{top}</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div style={{ width: 0, flex: 1, borderLeft: '1px solid #4A77FF' }} />
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6L11 1" stroke="#4A77FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 500, color: '#4A77FF' }}>{bottom}</span>
    </div>
  )
}

const DECISION1_RATIONALE = {
  new: {
    eyebrow: 'New Listener',
    heading: 'New personalized sections are designed to help new users discover',
    body: 'New listeners have no listening history to personalize from, trust is what guides discovery, so we built two sources of it:',
    blocks: [
      { image: '/images/amazon-music/decision1-social-proof.png', title: 'Social Proof', caption: 'New listeners trust fan’s taste more the general public.' },
      { image: '/images/amazon-music/decision1-rationale-visibility.png', title: 'Rationale Visibility', caption: 'Surfaces reasoning from user taste in other artists, instead of a generic “Recommended for You”.' },
    ],
    stat: { value: '88%', caption: 'of respondents said they’d rather see why something’s recommended than just see the recommendation.' },
  },
  engaged: {
    eyebrow: 'Engaged listener',
    heading: 'Exploration isn’t linear',
    body: 'Breath and depth discovery sections help engaged listeners explore the artist.',
    blocks: [
      { image: '/images/amazon-music/decision1-resume-not-restart.png', title: 'Resume, not restart', caption: 'Help users pick up where they left off, rather than starting something new every time.' },
      { image: '/images/amazon-music/decision1-breadth-past-hits.png', title: 'Breadth past the hits', caption: 'Opens up deeper catalog as an invitation, positioned below top songs so discovery never displaces what she came for.' },
    ],
  },
  superfan: {
    eyebrow: 'Superfan',
    heading: 'Recognition leads, and the system welcomes superfans back.',
    body: 'Superfans arrive with a relationship already built. The interface leads with their own history and treats time away as something to catch up on, not something to point out.',
    blocks: [
      { image: '/images/amazon-music/decision1-catchup-not-shaming.png', title: 'Gap-aware but not gap-announcing', caption: 'Shows what changed, never how long users’ been gone to serve as a welcome back instead of a countdown.' },
      { image: '/images/amazon-music/decision1-history-as-navigation.png', title: 'History as navigation', caption: 'Turns users’ listening record into a way to move through the catalog, which no other tier has enough history to support.' },
    ],
    stat: { value: '51%', caption: 'of superfans said they return for updates and specific tracks, not algorithmic picks' },
  },
}

function RationalePanel({ data }) {
  if (!data) {
    return (
      <div style={{ width: '100%', background: '#F4F7F7', borderRadius: 24, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, color: '#ABABAB' }}>Rationale content coming soon</span>
      </div>
    )
  }
  return (
    <div style={{ width: '100%', background: '#F4F7F7', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeInUp 0.4s ease-out both' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ ...dm, fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D998AD' }}>{data.eyebrow}</span>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 24, fontWeight: 400, color: '#000000', whiteSpace: 'pre-line' }}>{data.heading}</span>
        <p style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252', margin: 0 }}>{data.body}</p>
      </div>
      <div className="am-decision1-blocks" style={{ display: 'flex', justifyContent: 'center', gap: 36, padding: '24px 0' }}>
        {data.blocks.map((b, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1, minWidth: 0 }}>
            <img src={b.image} alt={b.title} style={{ width: '100%', height: 297, objectFit: 'cover', borderRadius: 24, display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 500, color: '#000000' }}>{b.title}</span>
              <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252' }}>{b.caption}</span>
            </div>
          </div>
        ))}
      </div>
      {data.stat && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid #D9D9D9' }}>
          <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 32, fontWeight: 500, lineHeight: '32px', color: '#4A77FF', flexShrink: 0 }}>{data.stat.value}</span>
          <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252' }}>{data.stat.caption}</span>
        </div>
      )}
    </div>
  )
}

function CycleNode({ number, top, left }) {
  return (
    <div style={{ position: 'absolute', top, left, transform: 'translate(-50%, -50%)', width: 42, height: 42, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #C6D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 600, color: '#4A77FF' }}>{number}</span>
    </div>
  )
}

function StepItem({ number, title, caption }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #C6D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 600, color: '#4A77FF' }}>{number}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 600, lineHeight: '22px', color: '#525252' }}>{title}</span>
        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#6C7675' }}>{caption}</span>
      </div>
    </div>
  )
}

function TableCell({ children, header, lastCol, lastRow }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center',
        padding: header ? '16px 20px' : 20,
        background: header ? '#F7F8F8' : 'transparent',
        borderRight: lastCol ? 'none' : '1px solid #ECEEEE',
        borderBottom: lastRow ? 'none' : '1px solid #ECEEEE',
      }}
    >
      {children}
    </div>
  )
}

const RESULT_ROWS = [
  { surface: 'Landing', won: 'Recognition & instant resume', current: 'Variety & control when exploring' },
  { surface: 'Music tab', won: 'Tier-composed order & badges', current: 'Trust depends on explaining the metrics' },
  { surface: 'You & Artist tab', won: 'Era timeline & milestones felt earned', current: 'Clearer hierarchy still needed' },
]


export default function AmazonMusicCaseStudy() {
  const [decision1Tier, setDecision1Tier] = useState('new')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const sectionMap = {
      'hmw': 'research',
      'decision-2': 'decision-1',
      'decision-3': 'decision-1',
    }
    const allIds = ['overview', 'problem', 'solution', 'context', 'research', 'hmw', 'direction', 'solution-system', 'decision-1', 'decision-2', 'decision-3', 'why-this-works', 'result', 'reflection']
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

  // Scroll-in fade animation for section content
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
      <style>{`
        .am-tier-mockup-btn {
          transition: transform 0.2s ease;
        }
        .am-tier-mockup-btn:hover {
          transform: translateY(-6px);
        }
        .am-tier-mockup-btn.active:hover {
          transform: none;
        }
        section.fade-section > div, .cs-hero-inner {
          margin-left: 225px;
        }
        @media (max-width: 1200px) {
          .cs-sidenav { display: none !important; }
          section.fade-section > div, .cs-hero-inner {
            margin-left: 0;
          }
        }
        /* Problem section: the two track cards need ~350px each to hold their
           fixed-width icons and single-line track info without spilling past
           the dark card's edge. That never fits two-up on tablet or mobile,
           so stack them and shrink the card's own padding to match. */
        @media (max-width: 1024px) {
          .am-problem-outer { padding: 48px 24px !important; }
          .am-problem-card { padding: 48px 32px 40px !important; }
          .am-track-row { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .am-problem-outer { padding: 32px 16px !important; }
          .am-problem-card { padding: 32px 20px 28px !important; }
        }
        /* Solution highlights: each GIF needs its own comfortable width to
           read as a phone screen, not a sliver. Two-up drops each column to
           ~330px well before mobile; stack them below tablet instead. */
        @media (max-width: 1024px) {
          .am-solution-row { flex-direction: column !important; }
        }
        /* The three synced-scroll phones follow the same logic, just with a
           tighter floor since there are three instead of two. */
        @media (max-width: 700px) {
          .am-synced-scroll-row { flex-direction: column !important; align-items: center !important; }
          .am-synced-scroll-row > div { width: 100% !important; max-width: 320px; }
        }
        /* Context: the photo is a fixed 478px next to a flexible text column,
           the same "fixed sibling squeezes a flexible one" pattern as
           elsewhere in this file. Stack before that column runs out of room. */
        @media (max-width: 1024px) {
          .am-context-row { flex-direction: column !important; }
          .am-context-photo { width: 100% !important; height: auto !important; aspect-ratio: 478 / 327; }
        }
        /* Ideation cards: same fixed-image-next-to-flexible-text pattern as
           the context photo above, just repeated three times. */
        @media (max-width: 1024px) {
          .am-ideation-card { flex-direction: column !important; align-items: stretch !important; padding: 20px !important; }
          .am-ideation-card-image { width: 100% !important; height: auto !important; aspect-ratio: 292 / 202; }
        }
        /* Research: the 3-column row holds up fine through tablet, shrinking
           proportionally with the row - it only needs to stack once cards
           genuinely can't fit side by side. The assumed/found row's vertical
           divider can't rotate into a stack, so it swaps to a horizontal
           rule at the same breakpoint. */
        @media (max-width: 650px) {
          .am-research-outer { padding: 48px 24px !important; }
          .am-research-row { flex-direction: column !important; }
          .am-assumed-found-row { flex-direction: column !important; gap: 24px !important; }
          .am-assumed-found-divider { width: 100% !important; height: 0 !important; align-self: stretch !important; border-left: none !important; border-top: 1px solid #4A77FF !important; }
        }
        @media (max-width: 480px) {
          .am-research-outer { padding: 32px 16px !important; }
        }
        /* Need Layer / Three Tier System: the heading+paragraph row and the
           table's fixed-width side labels are the same "fixed sibling
           squeezes a flexible one" pattern as everywhere else in this file.
           The tier-footer row is the worst of it: a fixed 104px label plus
           42px gap left only ~45px per tier name at mobile widths, which is
           how "SUPERFAN" ended up overflowing past the card edge. */
        @media (max-width: 900px) {
          .am-solution-system-outer { padding: 48px 24px !important; }
          .am-tier-title-row { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .am-need-card { padding: 24px 20px !important; }
          .am-need-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; padding-bottom: 20px !important; }
          .am-need-label { width: 100% !important; flex-direction: row !important; align-items: baseline !important; gap: 8px !important; }
          .am-need-chips { width: 100% !important; }
          .am-tier-footer-row { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
          .am-tier-footer-label { width: 100% !important; text-align: left !important; }
        }
        @media (max-width: 480px) {
          .am-need-chips { gap: 8px !important; }
          .am-tier-footer-names { gap: 8px !important; }
        }
        /* Hero: What I Did/My Impact are two flexible columns with no fixed
           sibling, so they can shrink a long time before they break - stack
           at the same point the impact card's number+text row does, since
           both share the hero's 920px column. */
        @media (max-width: 650px) {
          .cs-hero-overview-row { flex-direction: column !important; gap: 24px !important; }
          .cs-impact-card { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
        }
      `}</style>
      <Nav fixed />

      {/* Banner */}
      <div style={{ marginTop: 80, width: '100%', aspectRatio: '1280 / 400', overflow: 'hidden' }}>
        <img src="/images/amazon-music/case-study-banner.png" alt="Amazon Music Superfan artist profile shown on a phone" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Case study hero + main share one relative wrapper so the sidenav can
          start at the hero title instead of at the Problem section. */}
      <div style={{ position: 'relative' }}>
      <div className="cs-sidenav-col" style={{ position: 'absolute', top: 68, left: 40, height: 'calc(100% - 300px)', width: 0 }}>
        <SideNav active={activeSection} />
      </div>
      {/* Case study hero */}
      <div className="cs-hero-outer" style={{ background: '#FFFFFF', display: 'flex', justifyContent: 'center', padding: '60px 40px 40px' }}>
        <div id="overview" className="cs-hero-inner" style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 40 }}>
          <h1 style={{ ...dm, fontSize: 52, fontWeight: 800, lineHeight: '54px', letterSpacing: '-0.0288em', color: '#101314', margin: 0 }}>
            Adaptive UI for Amazon Music
          </h1>
          <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
            As catalog size stopped being music streaming&apos;s differentiator, Amazon Music asked us to build{' '}
            <strong style={{ fontWeight: 600, color: '#000000' }}>real intimacy between creators and listeners</strong>. We designed an adaptive artist profile to recognize loyal fans and create belonging without requiring performance.
          </p>
          {/* Metadata row */}
          <div className="cs-metadata" style={{ background: '#F4F6F6', borderRadius: 24, padding: 24, display: 'flex', justifyContent: 'space-between' }}>
            {[
              { label: 'Project type', values: ['Amazon Music - Capstone Project'] },
              { label: 'Role', values: ['Product Designer'] },
              { label: 'Timeline', values: ['Jan 2026 -', 'Aug 2026'] },
              { label: 'Team', values: ['2 Design Lead (me!)', '2 Technical Lead', '1 Product Manager'] },
            ].map(({ label, values }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 160 }}>
                <span style={{ ...dm, fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '21px', color: '#4A77FF' }}>{label}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {values.map(v => (
                    <span key={v} style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D' }}>{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* What I Did + My Impact */}
          <div className="cs-hero-overview-row" style={{ display: 'flex', gap: 52 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ ...dm, fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '21px', color: '#4A77FF' }}>What I Did</span>
              <ul style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0, paddingLeft: 20, listStyleType: 'disc' }}>
                <li>Owned the Artist Profile end to end</li>
                <li>Designed the Music tab and You &amp; Artist tab, the two surfaces that carry most of the tier logic</li>
                <li>Defined the tier system and need layers that tied the team&apos;s screens together</li>
              </ul>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ ...dm, fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '21px', color: '#4A77FF' }}>My Impact</span>
                <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252' }}>
                  Testing showed the adaptive system made recognition felt, not just visible.
                </span>
              </div>
              <div className="cs-impact-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                <span style={{ ...dm, fontSize: 36, fontWeight: 500, lineHeight: '1.2em', color: '#525252', flexShrink: 0 }}>10/10</span>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252' }}>testers said &quot;it knows me,&quot; unprompted</span>
                  <span style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#979797' }}>
                    <strong style={{ fontWeight: 600 }}>—</strong> Based on moderated testing sessions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* PROBLEM */}
        <section id="problem" className="fade-section am-problem-outer" style={{ background: '#FFFFFF', padding: '60px 55px', display: 'flex', justifyContent: 'center' }}>
          <div className="am-problem-card" style={{ position: 'relative', width: '100%', maxWidth: 920, background: '#2E2E2E', borderRadius: 24, padding: '76px 80px 68px', display: 'flex', flexDirection: 'column', gap: 48, overflow: 'hidden' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <SectionLabel text="Problem" color="#B9C9FF" />
                <h2 style={{ ...dm, letterSpacing: '0.01em', fontSize: 36, fontWeight: 500, lineHeight: '1.2em', color: '#FFFFFF', margin: 0, whiteSpace: 'pre-line' }}>
                  {"You've heard this song 3,200 times.\nThe app still treats you like you just met."}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#FFFFFF', margin: 0 }}>
                  Streaming holds years of listening history and reflects almost none of it back. A fan of 10 years sees the same interface as someone hearing the song for the first time. On the Amazon music app, loyalty exists in memory but invisible to the platform that&apos;s supposed to know you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="am-track-row" style={{ display: 'flex', gap: 24 }}>
                    <TrackCard label="First Listen • Today" />
                    <TrackCard label="3,200 Plays • 10 Years" />
                  </div>
                  <p style={{ ...dm, letterSpacing: '0.01em', fontSize: 15.5, color: '#B4B4B4', textAlign: 'center', margin: 0 }}>
                    Same layout, same modules, same order, regardless of ten years of listening history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION HIGHLIGHTS */}
        <section id="solution" className="fade-section" style={{ background: '#FFFFFF', padding: '60px 55px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ ...dm, fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '21px', color: '#4A77FF' }}>Solution highlights</span>
            <h2 style={{ ...dm, fontSize: 36, fontWeight: 500, lineHeight: '120%', letterSpacing: '0.05em', color: '#000000', margin: 0 }}>
              An artist profile that adapts across three tiers, changing what&apos;s shown as recognition builds.
            </h2>
          </div>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 48 }}>
            <SolutionBlock
              caption="Opening an artist's page"
              heading="One page, reorganized for what each listener needs"
              body="Modules built for where users are with the artist. New listeners get introduced to the artist. Engaged listeners get modules for exploring deeper. Superfans get modules built around their own history."
              media={
                <SyncedScrollDemo
                  navBarSrc="/images/amazon-music/synced-scroll/nav-bar.jpeg"
                  screens={[
                    { label: 'new listener', src: '/images/amazon-music/synced-scroll/new-listener-screen.jpeg', alt: 'New listener view of the artist page' },
                    { label: 'engaged', src: '/images/amazon-music/synced-scroll/engaged-screen.jpeg', alt: 'Engaged listener view of the artist page' },
                    { label: 'superfan', src: '/images/amazon-music/synced-scroll/superfan-screen.jpeg', alt: 'Superfan view of the artist page' },
                  ]}
                />
              }
            />
            <div className="am-solution-row" style={{ display: 'flex', gap: 48 }}>
              <SolutionBlock
                flex
                caption="Being noticed by the platform"
                heading="Guiding recognition, not just content"
                body="Signals accumulate as the relationship deepens, each one appearing only once it's earned."
                gifSrc="/images/amazon-music/solution-3.gif"
              />
              <SolutionBlock
                flex
                caption="Revisiting your history with an artist"
                heading="Turning history into a relationship"
                body="A new tab that reflects users' timeline with the artist, earned through history instead of artist's release dates."
                gifSrc="/images/amazon-music/solution-2.gif"
              />
            </div>
          </div>
        </section>

        {/* CONTEXT */}
        <section id="context" className="fade-section" style={{ background: '#F8F8F8', padding: '80px 55px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div className="am-context-row" style={{ width: '100%', maxWidth: 920, display: 'flex', gap: 28 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <SectionLabel text="Context" />
                <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#000000', margin: 0, whiteSpace: 'pre-line' }}>
                  {"The music was all there. \nThe connection wasn't."}
                </h2>
              </div>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
                By 2026, distribution of content had stopped being the differentiator for music streaming platforms. The market had matured past &quot;does it have the song&quot; into &quot;does it understand me.&quot;{' '}
                <strong style={{ fontWeight: 600, color: '#000000' }}>Users and creators want more than just playback.</strong>
              </p>
            </div>
            <img className="am-context-photo" src="/images/amazon-music/context-photo.png" alt="" style={{ width: 478, height: 327, flexShrink: 0, objectFit: 'cover', borderRadius: 24, display: 'block' }} />
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="fade-section am-research-outer" style={{ background: '#F8F8F8', padding: '80px 40px 120px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Research" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#000000', margin: 0 }}>
              We spent weeks looking at how to build connection. Turns out it already existed.
            </h2>
          </div>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
              We wanted to find out how listeners build connections with creators, and where those connections actually live. Over 15 weeks, we ran three research methods in parallel and synthesized the results through affinity diagramming.
            </p>
            <div className="am-research-row" style={{ display: 'flex', gap: 22 }}>
              <ResearchCard
                caption="SURVEY · 85 RESPONDENTS"
                image="/images/amazon-music/research-card-1.png"
                heading={'Recognition, \nnot social features'}
                body="Listeners don't want streaming to replicate social media."
              />
              <ResearchCard
                caption="LISTENER INTERVIEWS · 30 SESH"
                image="/images/amazon-music/research-card-2.png"
                heading="Fans gather outside of the platform"
                body="Listeners use Discord, IG, and other platforms to interact with creators and other fans."
              />
              <ResearchCard
                caption="CREATOR INTERVIEWS · 12 ARTISTS"
                image="/images/amazon-music/research-card-3.png"
                heading="Streaming metrics don't show real fans"
                body="Creators build trust through live events. Streaming data felt useless and misleading."
              />
            </div>
            <div className="am-assumed-found-row" style={{ display: 'flex', gap: 48, padding: '0 12px', marginTop: 24 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <span style={{ ...dm, fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', color: '#6A6A78' }}>WE ASSUMED</span>
                <span style={{ ...dm, fontSize: 20, fontWeight: 400, lineHeight: '30px', color: '#6A6A78' }}>
                  Fan connection was missing from the app, so we should bring in social features.
                </span>
              </div>
              <div className="am-assumed-found-divider" style={{ width: 0, alignSelf: 'stretch', borderLeft: '1px solid #4A77FF' }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <span style={{ ...dm, fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', color: '#4A77FF' }}>WE FOUND</span>
                <span style={{ ...dm, fontSize: 20, fontWeight: 400, lineHeight: '30px', color: '#1C1C24' }}>
                  The connection already exists. It lives on social media, in fan communities.
                </span>
                <span style={{ ...dm, fontSize: 20, fontWeight: 700, lineHeight: '30px', color: '#4A77FF' }}>
                  Superfans didn&apos;t want it replicated here.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* REFRAMING THE CHALLENGE */}
        <section id="hmw" className="fade-section" style={{ background: '#525252', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Pill text="Reframing the challenge" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <span style={{ ...dm, fontSize: 24, fontWeight: 600, lineHeight: '1.4em', color: '#B9C9FF', textDecoration: 'line-through', textDecorationColor: '#FFFFFF' }}>
                How do we help build connection in the platform.
              </span>
              <span style={{ ...dm, fontSize: 32, fontWeight: 600, lineHeight: '1.4em', color: '#FFFFFF' }}>
                How do we make someone feel recognized for a relationship the platform has never acknowledged.
              </span>
            </div>
          </div>
        </section>

        {/* IDEATION */}
        <section id="direction" className="fade-section" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <SectionLabel text="Ideation" />
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#000000', margin: 0 }}>
                The favorite concept wasn&apos;t the one we built.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
                We sketched about two hundred ideas, narrowed them to three concepts. Each a different take on how a platform could acknowledge a relationship that already exists. Then we tested them in parallel with over twenty participants.
              </p>
              <div className="am-scored-against-row" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <span style={{ ...dm, fontSize: 14, color: '#979797' }}>SCORED AGAINST</span>
                {['Comprehension', 'Desirability', 'RICE-style comparison'].map(tag => (
                  <span key={tag} style={{ ...dm, fontSize: 14, color: '#4A4A55', background: '#E2E2E9', borderRadius: 7, padding: '7px 14px' }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <IdeationCard
                  winner
                  title="Adaptive UI"
                  subtitle="Shifted the interface as users' relationship with the artists grow."
                  rationale="It wasn't the favorite, but it pays off over the whole relationship rather than one session, and it asks nothing new of the user, working from listening they already do."
                  image="/images/amazon-music/concept-adaptive-ui.png"
                />
                <IdeationCard
                  title="Character/gamification"
                  subtitle="Turned listening history into a character that evolves with you."
                  rationale="Most loved, but riskiest: the novelty would fade, and it favored bigger artists. We dropped the concept but kept listening history as the signal for recognition."
                  image="/images/amazon-music/concept-gamification.png"
                />
                <IdeationCard
                  title="Situational Context"
                  subtitle="Adapted content to moment, activity, and intent, with more manual control."
                  rationale="It helped new users, but it didn't scale and participants are hesitant about more manual input. We kept the context-aware mindset carried forward."
                  image="/images/amazon-music/concept-situational-context.png"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION SYSTEM */}
        <section id="solution-system" className="fade-section am-solution-system-outer" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionLabel text="System design" />
            <h2 style={{ ...dm, fontSize: 42, fontWeight: 500, lineHeight: '1.2em', letterSpacing: '0.05em', color: '#000000', margin: 0 }}>
              The catalog stays the same. The interface changes based on how well it knows you.
            </h2>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
              <strong style={{ fontWeight: 500, color: '#000000' }}>Adaptive UI</strong> won because it asks nothing new of listeners, so I led the design of a system that works from listening alone. It reads each person&apos;s relationship with an artist and adapts the page as that relationship grows.
            </p>
          </div>

          {/* Three Tier System */}
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24, marginTop: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ ...dm, fontSize: 17, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4A77FF' }}>
                How does it adapt: Three Tier System
              </span>
              <div className="am-tier-title-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <h3 style={{ ...dm, letterSpacing: '0.01em', fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0, flex: 1, whiteSpace: 'pre-line' }}>
                  {'Three tiers are determined\nby user behavior, per artist.'}
                </h3>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0, flex: 1 }}>
                  We chose three because an adaptive interface only works if it stays familiar between adaptations, and three was the fewest that still mapped the need layers.
                </p>
              </div>
            </div>
            <img src="/images/amazon-music/three-tier-system.png" alt="Three tier system: New Listener, Engaged Listener, and Superfan, promoted based on listening behavior" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* Need Layer System */}
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24, marginTop: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ ...dm, fontSize: 17, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4A77FF' }}>
                Why does it adapt: Need Layer system
              </span>
              <div className="am-tier-title-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <h3 style={{ ...dm, letterSpacing: '0.01em', fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0, flex: 1, whiteSpace: 'pre-line' }}>
                  {'User needs are layered \ninstead of scattered.'}
                </h3>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0, flex: 1 }}>
                  Research surfaced three layers of needs from the users, functional comes first, identity second, and social last.
                </p>
              </div>
            </div>
            <div className="am-need-card" style={{ width: '100%', background: '#FFFFFF', border: '1px solid #ECEEEE', borderRadius: 24, boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)', padding: '36px 36px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <NeedRow
                label="Social"
                caption="Belonging"
                chips={[
                  { text: '', opacity: 0 },
                  { text: '', opacity: 0 },
                  { text: 'I belong here', opacity: 0.4 },
                ]}
              />
              <NeedRow
                label="Identity"
                caption="Recognition"
                chips={[
                  { text: '', opacity: 0 },
                  { text: 'Remember me', opacity: 0.25 },
                  { text: 'Recognize me', opacity: 0.4 },
                ]}
              />
              <NeedRow
                label="Functional"
                caption="Frontier"
                chips={[
                  { text: 'Who’s this', opacity: 0.1 },
                  { text: 'What’s next?', opacity: 0.25 },
                  { text: 'What’s new?', opacity: 0.4 },
                ]}
              />
              <div className="am-tier-footer-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 42, paddingTop: 16, borderTop: '1px solid #D9D9D9' }}>
                <span className="am-tier-footer-label" style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 600, color: '#525252', width: 104, flexShrink: 0 }}>Three Tiers</span>
                <div className="am-tier-footer-names" style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
                  {['New Listener', 'Engaged', 'Superfan'].map(t => (
                    <span key={t} style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 600, textTransform: 'uppercase', color: '#000000', textAlign: 'center', flex: 1 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DECISION 1: FUNCTIONAL */}
        <section id="decision-1" className="fade-section" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Design decisions" />
          </div>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Pill text="01  Functional" />
              <h3 style={{ ...dm, letterSpacing: '0.01em', fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
                Content leads with the general, then flips to personal
              </h3>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
                The more the system knows about users&apos; taste in this artist, the more it assumes. No data means no assumptions, meaning prioritizing general content first. Rich data means personalized leads.
              </p>
            </div>

            {/* Interactive architecture diagram */}
            <div style={{ width: '100%', marginTop: 8 }}>
              <p style={{ ...dm, fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#979797', margin: '0 0 32px' }}>
                Artist profile Architecture Across Three Tiers
              </p>
              <div className="am-decision1-diagram-row" style={{ display: 'flex', alignItems: 'stretch', gap: 24 }}>
                <RuleLegend label="The rule" top="General" bottom="Personalized" />
                {TIER_MOCKUPS.map((tier, i) => (
                  <Fragment key={tier.id}>
                    <TierMockup
                      label={tier.label}
                      blocks={tier.blocks}
                      active={decision1Tier === tier.id}
                      onClick={() => setDecision1Tier(tier.id)}
                    />
                    {i === 1 && <div style={{ width: 0, alignSelf: 'stretch', borderLeft: '1px dashed #4A77FF' }} />}
                  </Fragment>
                ))}
                <RuleLegend label="Rule flip" top="Personalized" bottom="General" />
              </div>
              <p style={{ ...dm, letterSpacing: '0.01em', fontSize: 14, fontWeight: 300, color: '#979797', textAlign: 'right', margin: 0, padding: '12px 0', borderTop: '1px solid #F0F2F2', marginTop: 24 }}>
                Click a tier to see its detailed rationale below.
              </p>
            </div>

            <RationalePanel key={decision1Tier} data={DECISION1_RATIONALE[decision1Tier]} />
          </div>
        </section>

        {/* DECISION 2: IDENTITY */}
        <section id="decision-2" className="fade-section" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Pill text="02  Identity" />
              <h3 style={{ ...dm, letterSpacing: '0.01em', fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
                The header is the first point of recognition
              </h3>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
                As a listener&apos;s relationship with an artist deepens, the header itself evolves to recognize the connection.
              </p>
            </div>

            <img src="/images/amazon-music/design-decision-2.png" alt="Header mockups across New Listener, Engaged Listener, and Superfan tiers" style={{ width: '100%', display: 'block', borderRadius: 24 }} />

            <div style={{ width: '100%', background: '#FFFFFF', borderRadius: 24, padding: '12px 24px 24px', display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <span style={{ ...dm, fontSize: 48, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.05em', color: '#4A77FF', flexShrink: 0 }}>5/5</span>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
                  testing participants named this the first thing that made them feel recognized
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <img src="/images/amazon-music/icon-quote.svg" alt="" width={50} height={50} style={{ flexShrink: 0 }} />
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', fontStyle: 'italic', margin: 0 }}>
                  Seeing our photos together made me feel close to this artist, like it&apos;s mutual, not one-directional.— P5
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DECISION 3: BELONGING */}
        <section id="decision-3" className="fade-section" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Pill text="03  Belonging" />
              <h3 style={{ ...dm, letterSpacing: '0.01em', fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
                The tab doesn&apos;t exist until there&apos;s a relationship to reflect
              </h3>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
                For superfans, artists are woven into memory, not just listening habits. The page reorganizes into eras of users&apos; journey rather than artists&apos; release. It stops being a page about the artist, but about what the artists mean to them.
              </p>
            </div>

            <img src="/images/amazon-music/design-decision-3.png" alt="Superfan artist profile with Era Clustering, Superfan Card, and Narrative Framing annotations" style={{ width: '100%', display: 'block', borderRadius: 24 }} />

            <div style={{ width: '100%', background: '#FFFFFF', borderRadius: 24, padding: '12px 24px 24px', display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <span style={{ ...dm, fontSize: 48, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.05em', color: '#4A77FF', flexShrink: 0 }}>96%</span>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
                  of survey respondents said they connect to music through mood, memory, or a part of themselves
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <img src="/images/amazon-music/icon-quote.svg" alt="" width={47} height={47} style={{ flexShrink: 0 }} />
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', fontStyle: 'italic', margin: 0 }}>
                  I like how it feels like it&apos;s no longer just me viewing the profile, it&apos;s the journey we built together. — P4
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS WORKS */}
        <section id="why-this-works" className="fade-section" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Why this works" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#101314', margin: 0 }}>
              Recognition compounds into deeper relationships.
            </h2>
          </div>

          <div className="am-whythisworks-row" style={{ width: '100%', maxWidth: 920, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: 400, flexShrink: 0 }}>
              <span style={{ ...dm, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#525252', textAlign: 'center' }}>Starts with the 10%</span>
              <div style={{ position: 'relative', width: '100%', maxWidth: 300, aspectRatio: '1 / 1' }}>
                <img src="/images/amazon-music/why-this-works-circle-bg.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                <div style={{ position: 'absolute', top: '28%', left: '28%', width: '44%', height: '44%', borderRadius: '50%', background: '#EFF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 8 }}>
                  <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 13.5, fontWeight: 700, lineHeight: '18.23px', color: '#525252', whiteSpace: 'pre-line' }}>{'Adaptive\nRecognition'}</span>
                </div>
                <CycleNode number="1" top="10%" left="50%" />
                <CycleNode number="2" top="37.64%" left="88.04%" />
                <CycleNode number="3" top="82.36%" left="73.5%" />
                <CycleNode number="4" top="82.36%" left="26.49%" />
                <CycleNode number="5" top="37.64%" left="11.96%" />
              </div>
              <span style={{ ...dm, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#525252', textAlign: 'center' }}>Benefits the 90%</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 0 }}>
              <StepItem number="1" title="Identify meaningful loyalty" caption="Behavioral signals reveal a strong artist relationship." />
              <StepItem number="2" title="Recognize the relationship" caption="The interface reflects what the listener has earned." />
              <StepItem number="3" title="Unlock more relevant experiences" caption="Adaptive UI reveals what matters most at this stage of fandom." />
              <StepItem number="4" title="Deepen the relationship" caption="Recognition encourages continued exploration and belonging." />
              <StepItem number="5" title="Strengthen loyalty" caption="Continued listening creates richer signals for future recognition." />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, marginTop: 6, borderTop: '1px solid #E4E7E7' }}>
                <img src="/images/amazon-music/icon-heart-solid.svg" alt="" width={28} height={26} style={{ flexShrink: 0 }} />
                <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 17, fontWeight: 700, color: '#4A77FF' }}>Start with superfans.<br />Compound across the listener base.</span>
              </div>
            </div>
          </div>
        </section>

        {/* RESULT */}
        <section id="result" className="fade-section" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Result" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#101314', margin: 0 }}>
              Fans feels recognized. What they didn&apos;t want to lose was control.
            </h2>
          </div>

          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252', margin: 0 }}>
              We tested our prototypes against the current Amazon Music app in ten moderated sessions with real fans.
            </p>

            <div style={{ width: '100%', background: '#FFFFFF', border: '1px solid #ECEEEE', borderRadius: 20, boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)', overflow: 'hidden' }}>
              <div className="am-result-table" style={{ display: 'grid', gridTemplateColumns: '220px 1.6fr 1.6fr' }}>
                <TableCell header>
                  <span style={{ ...dm, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A9391' }}>Surface</span>
                </TableCell>
                <TableCell header>
                  <span style={{ ...dm, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4A77FF' }}>Adaptive won on</span>
                </TableCell>
                <TableCell header lastCol>
                  <span style={{ ...dm, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A9391' }}>Current app / what still needs work</span>
                </TableCell>

                {RESULT_ROWS.map((row, i) => {
                  const lastRow = i === RESULT_ROWS.length - 1
                  return (
                    <Fragment key={row.surface}>
                      <TableCell lastRow={lastRow}>
                        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 16, fontWeight: 600, color: '#101314' }}>{row.surface}</span>
                      </TableCell>
                      <TableCell lastRow={lastRow}>
                        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 15.5, fontWeight: 300, lineHeight: '24.8px', color: '#2B3433' }}>{row.won}</span>
                      </TableCell>
                      <TableCell lastCol lastRow={lastRow}>
                        <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 15.5, fontWeight: 300, lineHeight: '24.8px', color: '#6C7675' }}>{row.current}</span>
                      </TableCell>
                    </Fragment>
                  )
                })}
              </div>
            </div>

            <div style={{ width: '100%', background: '#E4EAFF', borderRadius: 20, padding: '26px 30px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0 18px' }}>
              <span style={{ ...dm, letterSpacing: '0.01em', fontSize: 23, fontWeight: 700, color: '#4A77FF' }}>&quot;It knows me&quot;</span>
              <span style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#525252' }}>— recognition landed in 3 of 3 prototypes tested.</span>
            </div>
          </div>
        </section>

        {/* REFLECTION */}
        <section id="reflection" className="fade-section" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Reflection" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#101314', margin: 0 }}>
              Future Directions
            </h2>
          </div>

          <div className="am-reflection-row" style={{ width: '100%', maxWidth: 920, display: 'flex', gap: 24 }}>
            <InfoCard
              flex
              padding={36}
              gap={20}
              pill="What I’d done differently"
              heading="Testing the journey, not just a moment"
              body="We tested these decisions in short, separate sessions due to the project timeline. What I'd want next is a long-term study that validates the system as a whole. Recognition, belonging, a relationship that deepens; these only mean something over time. A short session can tell you if a screen makes sense in the moment; it can't tell you if the journey holds up."
            />
            <InfoCard
              flex
              padding={36}
              gap={20}
              pill="Next step"
              heading="Recognizing loyalty that started elsewhere"
              body="We want to target fans new to Amazon Music but not new to the artist. We proposed a fast track with a floor: detect strong intent (library import, immediate follow), start at Engaged rather than the stranger experience, but leave Superfan status earned through recent, sustained activity on the platform itself."
            />
          </div>
        </section>
      </main>
      </div>

      {/* Next Project */}
      <div
        className="cs-next-project-outer"
        onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
        style={{ borderTop: '1px solid #E5E5E5', padding: '61px 125px 60px' }}
      >
        <p style={{ ...dm, letterSpacing: '0.01em', fontSize: 36, fontWeight: 600, lineHeight: '42px', color: '#000000', marginBottom: 40, marginTop: 0 }}>Next Project</p>
        <Link
          to="/ahoku"
          className="cs-next-project-row"
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 48, textDecoration: 'none' }}
        >
          <div className="cs-next-project-img" style={{ width: 499, height: 315, flexShrink: 0, borderRadius: 20, overflow: 'hidden', boxShadow: '4px 4px 12px rgba(0,0,0,0.12)' }}>
            <video
              src="/videos/ant-metrics-thumbnail.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ ...dm, letterSpacing: '0.01em', fontSize: 24, fontWeight: 700, color: '#2D2D2D', margin: 0 }}>Ahoku Smart Homecare Device</h3>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', letterSpacing: '0.01em', color: '#2D2D2D', margin: 0 }}>
              Designed digital interface of a healthcare device for elders to help track and<br />manage health data.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Product Design', 'Healthcare'].map(tag => (
                <span key={tag} style={{ background: '#F3F3F3', borderRadius: 20, padding: '8px 24px', fontSize: 14, color: '#000000', fontFamily: 'Inter, sans-serif' }}>{tag}</span>
              ))}
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
