import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import SyncedScrollDemo from '../components/SyncedScrollDemo'

const dm = { fontFamily: 'DM Sans, sans-serif' }

const NAV_SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution Highlights' },
  { id: 'research', label: 'Research' },
  { id: 'solution-system', label: 'System' },
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
      {heading && <span style={{ ...dm, fontSize: 20, fontWeight: 500, color: '#101314' }}>{heading}</span>}
      <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>{body}</p>
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
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap' }}>I&apos;ve Seen It</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#A6A6A6', whiteSpace: 'nowrap' }}>Olivia Dean • 1,423,456,789</span>
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
      <span style={{ ...dm, fontSize: 14, color: '#ABABAB' }}>GIF placeholder</span>
    </div>
  )
}

function SolutionBlock({ caption, heading, body, flex, gifSrc, media }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, ...(flex ? { flex: 1, minWidth: 0 } : {}) }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#979797' }}>{caption}</span>
          <span style={{ ...dm, fontSize: 24, fontWeight: 500, lineHeight: '42px', color: '#000000' }}>{heading}</span>
        </div>
        <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>{body}</p>
      </div>
      {media
        ? media
        : gifSrc
          ? <img src={gifSrc} alt="" style={{ width: '100%', height: 600, objectFit: 'cover', borderRadius: 24, display: 'block', flexShrink: 0 }} />
          : <GifPlaceholder height={600} />}
    </div>
  )
}

function ResearchCard({ caption, heading, body, highlight }) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14, background: '#FFFFFF', border: '1px solid #ECEEEE', borderRadius: 20, boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)', padding: '30px 24px' }}>
      <span style={{ ...dm, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#979797' }}>{caption}</span>
      <span style={{ ...dm, fontSize: 20, fontWeight: 600, color: '#2B3433', whiteSpace: 'pre-line' }}>{heading}</span>
      {highlight ? (
        <p style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#525252', margin: 0 }}>
          <mark style={{ background: '#E4EAFF', color: 'inherit', borderRadius: 4, padding: '1px 4px' }}>69% said mood and context drive their taste</mark>, context gets lost at the transfer.
        </p>
      ) : (
        <p style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#525252', margin: 0 }}>{body}</p>
      )}
    </div>
  )
}

function ChecklistItem({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ ...dm, fontSize: 13.5, fontWeight: 700, color: '#B8BFBE' }}>○</span>
      <span style={{ ...dm, fontSize: 17, fontWeight: 600, lineHeight: '27px', color: '#000000' }}>{text}</span>
    </div>
  )
}

function ScoreDot({ state, color }) {
  const isFull = state === 'full'
  const isHalf = state === 'half'
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
      <circle cx="8" cy="8" r="6.25" fill={isFull ? color : 'none'} stroke={color} strokeWidth={isFull ? '1.5' : '1'} />
      {isHalf && <path d="M8 1.75 A6.25 6.25 0 0 1 8 14.25 Z" fill={color} />}
    </svg>
  )
}

function ConceptCard({ number, title, body, criteria, winner, dark }) {
  const bg = dark ? '#525252' : '#FFFFFF'
  const border = dark ? '#525252' : '#ECEEEE'
  const shadow = dark ? '0px 14px 34px 0px rgba(0,0,0,0.16)' : '0px 2px 16px 0px rgba(16,22,23,0.04)'
  const titleColor = dark ? '#F4F6FF' : '#101314'
  const bodyColor = dark ? '#E4E7F0' : '#55605F'
  const dividerColor = dark ? 'rgba(255,255,255,0.14)' : '#F0F2F2'
  const labelColor = dark ? '#DDE0EA' : '#6C7675'

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20, background: bg, border: `1px solid ${border}`, borderRadius: 20, boxShadow: shadow, padding: '30px 24px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ ...dm, fontSize: 64, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.08em', color: 'rgba(137,197,234,0.3)' }}>{number}</span>
        {winner && (
          <span style={{ ...dm, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', background: '#4A77FF', borderRadius: 20, padding: '4px 10px' }}>Winner</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <span style={{ ...dm, fontSize: 18.5, fontWeight: 600, color: titleColor }}>{title}</span>
        <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '22px', color: bodyColor, margin: 0 }}>{body}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 20, borderTop: `1px solid ${dividerColor}` }}>
        {criteria.map(({ label, state, symbolColor }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ ...dm, fontSize: 13.5, color: labelColor }}>{label}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, flexShrink: 0 }}>
              <ScoreDot state={state} color={symbolColor} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NeedRow({ label, caption, chips }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: 24, paddingBottom: 12 }}>
      <div style={{ width: 112, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <span style={{ ...dm, fontSize: 17, fontWeight: 600, color: '#525252' }}>{label}</span>
        <span style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252' }}>{caption}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
        {chips.map((chip, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '20px 12px', borderRadius: 8, background: `rgba(74,119,255,${chip.opacity})` }}>
            {chip.text && <span style={{ ...dm, fontSize: 14, fontWeight: 600, color: '#525252' }}>{chip.text}</span>}
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
      <span style={{ ...dm, fontSize: 9, lineHeight: '11.7px', fontWeight: s.weight, color: s.color }}>{text}</span>
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
          <span style={{ ...dm, fontSize: 9.5, fontWeight: 600, color: '#FFFFFF' }}>Header</span>
        </div>
        {blocks.map((b, i) => <MockupBlock key={i} {...b} />)}
        <div style={{ background: '#000000', borderRadius: 8, padding: '11px 8px', textAlign: 'center', marginTop: 2 }}>
          <span style={{ ...dm, fontSize: 9.5, fontWeight: 300, color: '#9A9A9A' }}>Nav bar</span>
        </div>
      </button>
    </div>
  )
}

function RuleLegend({ label, top, bottom }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 80, flexShrink: 0, alignSelf: 'stretch' }}>
      <span style={{ ...dm, fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#979797' }}>{label}</span>
      <span style={{ ...dm, fontSize: 14, fontWeight: 500, color: '#4A77FF' }}>{top}</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div style={{ width: 0, flex: 1, borderLeft: '1px solid #4A77FF' }} />
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6L11 1" stroke="#4A77FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ ...dm, fontSize: 14, fontWeight: 500, color: '#4A77FF' }}>{bottom}</span>
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
        <span style={{ ...dm, fontSize: 14, color: '#ABABAB' }}>Rationale content coming soon</span>
      </div>
    )
  }
  return (
    <div style={{ width: '100%', background: '#F4F7F7', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeInUp 0.4s ease-out both' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ ...dm, fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D998AD' }}>{data.eyebrow}</span>
        <span style={{ ...dm, fontSize: 24, fontWeight: 400, color: '#000000', whiteSpace: 'pre-line' }}>{data.heading}</span>
        <p style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252', margin: 0 }}>{data.body}</p>
      </div>
      <div className="am-decision1-blocks" style={{ display: 'flex', justifyContent: 'center', gap: 36, padding: '24px 0' }}>
        {data.blocks.map((b, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1, minWidth: 0 }}>
            <img src={b.image} alt={b.title} style={{ width: '100%', height: 297, objectFit: 'cover', borderRadius: 24, display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ ...dm, fontSize: 17, fontWeight: 500, color: '#000000' }}>{b.title}</span>
              <span style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252' }}>{b.caption}</span>
            </div>
          </div>
        ))}
      </div>
      {data.stat && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid #D9D9D9' }}>
          <span style={{ ...dm, fontSize: 32, fontWeight: 500, lineHeight: '32px', color: '#4A77FF', flexShrink: 0 }}>{data.stat.value}</span>
          <span style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#525252' }}>{data.stat.caption}</span>
        </div>
      )}
    </div>
  )
}

function CycleNode({ number, top, left }) {
  return (
    <div style={{ position: 'absolute', top, left, transform: 'translate(-50%, -50%)', width: 42, height: 42, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #C6D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ ...dm, fontSize: 17, fontWeight: 600, color: '#4A77FF' }}>{number}</span>
    </div>
  )
}

function StepItem({ number, title, caption }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #C6D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ ...dm, fontSize: 14, fontWeight: 600, color: '#4A77FF' }}>{number}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ ...dm, fontSize: 17, fontWeight: 600, lineHeight: '22px', color: '#525252' }}>{title}</span>
        <span style={{ ...dm, fontSize: 14, fontWeight: 300, lineHeight: '22px', color: '#6C7675' }}>{caption}</span>
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

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AmazonMusicCaseStudy() {
  const [decision1Tier, setDecision1Tier] = useState('new')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('context')

  useEffect(() => {
    const sectionMap = {
      'direction': 'solution-system',
      'problem-statement': 'solution-system',
      'decision-2': 'decision-1',
      'decision-3': 'decision-1',
    }
    const allIds = ['context', 'problem', 'solution', 'research', 'direction', 'problem-statement', 'solution-system', 'decision-1', 'decision-2', 'decision-3', 'why-this-works', 'result', 'reflection']
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
        section.fade-section > div {
          margin-left: 225px;
        }
        @media (max-width: 1200px) {
          .cs-sidenav { display: none !important; }
          section.fade-section > div {
            margin-left: 0;
          }
        }
      `}</style>
      <Nav fixed />

      {/* Case study hero */}
      <div className="cs-hero-outer" style={{ marginTop: 80, background: '#FFFFFF', display: 'flex', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 1080, display: 'flex', flexDirection: 'column', gap: 32, padding: '40px 0' }}>
          {/* Top row: text + image */}
          <div className="cs-hero-row" style={{ display: 'flex', flexDirection: 'row', gap: 48, alignItems: 'center' }}>
            {/* Left: text column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h1 style={{ ...dm, fontSize: 52, fontWeight: 800, lineHeight: '54px', letterSpacing: '-0.0288em', color: '#101314', margin: 0 }}>
                Adaptive UI for<br />Amazon Music
              </h1>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                Led end-to-end design on a 7-month capstone reimagining a recognition system that reshapes in app experience as a listener's relationship with an artist deepens.
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
            <div className="cs-hero-image" style={{ width: 559, height: 370, flexShrink: 0 }}>
              <img src="/images/amazon-music/hero.png" alt="Amazon Music preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 17, display: 'block' }} />
            </div>
          </div>
          {/* Metadata row */}
          <div className="cs-metadata" style={{ background: '#F3F3F3', borderRadius: 24, padding: '24px 72px', display: 'flex', justifyContent: 'space-between' }}>
            {[
              { label: 'Role', values: ['Product Designer'] },
              { label: 'Timeline', values: ['Jan 2026 -', 'Aug 2026'] },
              { label: 'Team', values: ['2 Design Lead (me!)', '2 Technical Lead', '1 Product Manager'] },
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
        {/* CONTEXT */}
        <section id="context" className="fade-section" style={{ background: '#FFFFFF', padding: '60px 55px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Context" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#000000', margin: 0 }}>
              The music was all there. The connection wasn&apos;t.
            </h2>
          </div>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              By 2026, distribution of content had stopped being the differentiator for music streaming platforms. The market had matured past &quot;does it have the song&quot; into &quot;does it understand me.&quot; Users and creators want more than just playback.
            </p>
            <img src="/images/amazon-music/context-timeline.png" alt="Timeline: Retail Foundation, Alexa & Echo, HD Lossless / 100M+ Catalog, Distribution: Solved. The remaining gap: it's human, not technical." style={{ width: '100%', display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0, flex: 1 }}>
                In our MHCI capstone project at Carnegie Mellon, Amazon Music brought us a challenge:{' '}
                <strong style={{ fontWeight: 600, color: '#000000' }}>evolve the platform from consumption-centric to an ecosystem that fosters real intimacy between creators and listeners</strong>.
              </p>
              <div style={{ width: 576, flexShrink: 0 }}>
                <InfoCard
                  pill="My Role"
                  body="As the design lead, I owned the Artist Profile end to end, including the Music tab and the You & Artist tab, the two surfaces that carry most of the tier logic in this case study, while directing how all the work rolled up into one coherent system."
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="fade-section" style={{ background: '#FFFFFF', padding: '60px 55px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 920, background: '#2E2E2E', borderRadius: 24, padding: '76px 80px 68px', display: 'flex', flexDirection: 'column', gap: 48, overflow: 'hidden' }}>
            <img src="/images/amazon-music/problem-bg-decoration.svg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: 1194, height: 745, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <SectionLabel text="Problem" color="#B9C9FF" />
                <h2 style={{ ...dm, fontSize: 36, fontWeight: 500, lineHeight: '1.2em', color: '#FFFFFF', margin: 0, whiteSpace: 'pre-line' }}>
                  {"You've heard this song 3,200 times.\nThe app still treats you like you just met."}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#FFFFFF', margin: 0 }}>
                  Streaming holds years of listening history and reflects almost none of it back. A fan with 3,200 plays sees the same interface as someone hearing the song for the first time. On the Amazon music app, loyalty exists in memory but invisible to the platform that&apos;s supposed to know you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="am-track-row" style={{ display: 'flex', gap: 24 }}>
                    <TrackCard label="First Listen • Today" />
                    <TrackCard label="3,200 Plays • 10 Years" />
                  </div>
                  <p style={{ ...dm, fontSize: 15.5, color: '#B4B4B4', textAlign: 'center', margin: 0 }}>
                    Same layout, same modules, same order, regardless of ten years of listening history.
                  </p>
                </div>
              </div>
            </div>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#FFFFFF', margin: 0, position: 'relative' }}>
              We didn&apos;t know yet if this was a narrow interface gap, or a symptom of the bigger thing Amazon Music had asked us to find:{' '}
              <strong style={{ fontWeight: 600, color: '#FFFFFF' }}>what real intimacy between creators and listeners would require</strong>.
            </p>
          </div>
        </section>

        {/* SOLUTION HIGHLIGHTS */}
        <section id="solution" className="fade-section" style={{ background: '#FFFFFF', padding: '60px 55px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Solution highlights" />
            <h2 style={{ ...dm, fontSize: 36, fontWeight: 500, lineHeight: '1.2em', letterSpacing: '0.015em', color: '#000000', margin: 0 }}>
              The same page adapts across three tiers, changing what&apos;s shown as recognition builds.
            </h2>
          </div>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 48 }}>
            <SolutionBlock
              caption="Reordered, not rebuilt"
              heading="One page, reorganized for what each listener needs"
              body="New listeners get modules that orient them to the artist. Engaged listeners get modules for exploring deeper. Superfans get modules built around their own history with it."
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
                caption="Recognized over time"
                heading="Guiding recognition, not just content"
                body="From an artist a listener just met, to a following, to a superfan the platform has actually noticed."
                gifSrc="/images/amazon-music/solution-2.gif"
              />
              <SolutionBlock
                flex
                caption="A tab that has to be earned"
                heading="Turning history into a relationship"
                body="You & Artist doesn't exist for new listeners. By superfan, it's a full timeline of the relationship, not the catalog."
                gifSrc="/images/amazon-music/solution-3.gif"
              />
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="fade-section" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920 }}>
            <SectionLabel text="Research" />
            <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#000000', margin: 0 }}>
              The missing piece wasn&apos;t more features. It was recognition.
            </h2>
          </div>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              We spent 15 weeks to run three research methods in parallel to find what&apos;s missing. By using affinity diagramming to synthesize the results, the findings converged into a main insight and a constraint.
            </p>
            <div className="am-research-row" style={{ display: 'flex', gap: 22 }}>
              <ResearchCard
                caption="SURVEY · 85 RESPONDENTS"
                heading={'Recognition, \nnot social features'}
                body="Listeners don't want streaming to replicate social media."
              />
              <ResearchCard
                caption="LISTENER INTERVIEWS · 30 SESH"
                heading="The app forgets why a song mattered"
                highlight
              />
              <ResearchCard
                caption="CREATOR INTERVIEWS · 12 ARTISTS"
                heading="Streaming metrics don't show real fans"
                body="Creators build trust through live events. Streaming data felt useless and misleading."
              />
            </div>
            <img src="/images/amazon-music/research-connector.svg" alt="" style={{ width: '100%', height: 96, display: 'block', marginTop: -16, marginBottom: -16 }} />
            <div className="am-constraint-row" style={{ display: 'flex', gap: 26 }}>
              <div style={{ width: 292, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16, background: '#EFF3FF', border: '1px solid #D5DEFF', borderRadius: 20, padding: '30px 27px' }}>
                <span style={{ ...dm, fontSize: 12, fontWeight: 700, letterSpacing: '0.115em', color: '#2F55CC', textAlign: 'center' }}>CONSTRAINT</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ ...dm, fontSize: 20, fontWeight: 600, color: '#101314', textAlign: 'center' }}>Never performed for other people.</span>
                  <span style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#55605F', textAlign: 'center', whiteSpace: 'pre-line' }}>
                    {'Recognition can’t\ncome from exposure.'}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center', background: '#525252', borderRadius: 20, padding: '30px 34px' }}>
                <span style={{ ...dm, fontSize: 12, fontWeight: 700, letterSpacing: '0.115em', color: '#B9C9FF', textAlign: 'center' }}>THE GAP TO CLOSE</span>
                <span style={{ ...dm, fontSize: 20, fontWeight: 600, color: '#FFFFFF', textAlign: 'center', whiteSpace: 'pre-line' }}>
                  {'Not better recommendations or a missing feature. \nThe platform never captured\nwhat actually mattered.'}
                </span>
                <span style={{ ...dm, fontSize: 14, fontWeight: 400, lineHeight: '22px', color: '#DCDCDC', textAlign: 'center' }}>
                  A fan&apos;s history, a creator&apos;s trust isn&apos;t reflected on the platform.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CHOOSING A DIRECTION */}
        <section id="direction" className="fade-section" style={{ background: '#F8F8F8', padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <h2 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.015em', color: '#000000', margin: 0 }}>
                Choosing a direction
              </h2>
              <div className="am-direction-intro" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0, flex: 1 }}>
                  Knowing where connection belonged didn&apos;t tell us how to build it. We carried three directions forward and scored each against the same three questions:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                  <ChecklistItem text="Would it move Amazon Music?" />
                  <ChecklistItem text="Can the ecosystem carry it?" />
                  <ChecklistItem text="How strongly did our own research point here?" />
                </div>
              </div>
            </div>
            <div className="am-direction-row" style={{ display: 'flex', gap: 22 }}>
              <ConceptCard
                number="01"
                title="Shared Context"
                body="Restore the context a song had when it was discovered. Real listener interest, but artist value stayed indirect and cold-start content refresh was expensive."
                criteria={[
                  { label: 'Moves Amazon Music', state: 'empty', symbolColor: '#D9DCDC' },
                  { label: 'Ecosystem can carry it', state: 'empty', symbolColor: '#D9DCDC' },
                  { label: 'Evidence points here', state: 'half', symbolColor: '#4A77FF' },
                ]}
              />
              <ConceptCard
                number="02"
                title="Creator Feedback"
                body="Low-stakes sandboxes rewarding participation over algorithmic optimization. Strong creator signal, weak listener signal, needed simultaneous creator and fan adoption."
                criteria={[
                  { label: 'Moves Amazon Music', state: 'half', symbolColor: '#4A77FF' },
                  { label: 'Ecosystem can carry it', state: 'empty', symbolColor: '#D9DCDC' },
                  { label: 'Evidence points here', state: 'empty', symbolColor: '#D9DCDC' },
                ]}
              />
              <ConceptCard
                number="03"
                title="Recognized Listening"
                body="Make loyal fans feel seen through the listening experience itself, can be extended to Alexa instead of requiring new infrastructure, and superfan loyalty is where retention concentrates."
                winner
                dark
                criteria={[
                  { label: 'Moves Amazon Music', state: 'full', symbolColor: '#B9C9FF' },
                  { label: 'Ecosystem can carry it', state: 'full', symbolColor: '#B9C9FF' },
                  { label: 'Evidence points here', state: 'full', symbolColor: '#B9C9FF' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* PROBLEM STATEMENT */}
        <section id="problem-statement" className="fade-section" style={{ background: '#2E2E2E', padding: '80px 40px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Pill text="Problem Statement" />
            <div className="am-problem-statement-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 507, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <span style={{ ...dm, fontSize: 36, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '0.05em', color: '#FFFFFF' }}>
                  Amazon Music can make loyal fans feel seen and part of an artist&apos;s tribe.
                </span>
                <span style={{ ...dm, fontSize: 24, fontWeight: 600, letterSpacing: '0.05em', color: '#B9C9FF', whiteSpace: 'pre-line' }}>
                  {'Through listening experience itself.  \nNot a social layer.'}
                </span>
              </div>
              <p style={{ ...dm, fontSize: 17, fontWeight: 200, lineHeight: '27px', letterSpacing: '0.05em', color: '#FFFFFF', opacity: 0.7, width: 275, flexShrink: 0, margin: 0 }}>
                Choosing this direction meant setting the creator research aside for this phase. If this system extends to the creator side later, that research is where it starts.
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION SYSTEM */}
        <section id="solution-system" className="fade-section" style={{ background: '#FFFFFF', padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionLabel text="Solution system" />
            <h2 style={{ ...dm, fontSize: 42, fontWeight: 500, lineHeight: '1.2em', letterSpacing: '0.05em', color: '#000000', margin: 0 }}>
              The catalog stays the same. The interface changes based on how well it knows you.
            </h2>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
              We designed an <strong style={{ fontWeight: 500, color: '#000000' }}>adaptive UI</strong> for the Amazon Music app, a system that reads a listener&apos;s relationship with one artist and adapts the page as it grows.
            </p>
          </div>

          {/* Three Tier System */}
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24, marginTop: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ ...dm, fontSize: 17, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4A77FF' }}>
                The structure: Three Tier System
              </span>
              <div className="am-tier-title-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0, flex: 1, whiteSpace: 'pre-line' }}>
                  {'Three tiers are determined\nby user behavior, per artist.'}
                </h3>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0, flex: 1 }}>
                  We chose three because an adaptive interface only works if it stays familiar between adaptations, and three was the fewest that still mapped the need layers.
                </p>
              </div>
            </div>
            <img src="/images/amazon-music/three-tier-system.png" alt="Three tier system: New Listener, Engaged Listener, and Superfan, promoted based on listening behavior" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* Need Layer System */}
          <div style={{ width: '100%', maxWidth: 920, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ ...dm, fontSize: 17, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4A77FF' }}>
                Blueprint: Need Layer system
              </span>
              <div className="am-tier-title-row" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0, flex: 1, whiteSpace: 'pre-line' }}>
                  {'User needs are layered \ninstead of scattered.'}
                </h3>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0, flex: 1 }}>
                  Research surfaced three layers of needs from the users, functional comes first, identity second, and social last.
                </p>
              </div>
            </div>
            <div style={{ width: '100%', background: '#FFFFFF', border: '1px solid #ECEEEE', borderRadius: 24, boxShadow: '0px 2px 16px 0px rgba(16,22,23,0.05)', padding: '36px 36px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <NeedRow
                label="Social"
                caption="Belonging"
                chips={[
                  { text: '', opacity: 0 },
                  { text: 'I’m learning', opacity: 0.25 },
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 42, paddingTop: 16, borderTop: '1px solid #D9D9D9' }}>
                <span style={{ ...dm, fontSize: 17, fontWeight: 600, color: '#525252', width: 104, flexShrink: 0 }}>Three Tiers</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
                  {['New Listener', 'Engaged', 'Superfan'].map(t => (
                    <span key={t} style={{ ...dm, fontSize: 17, fontWeight: 600, textTransform: 'uppercase', color: '#000000', textAlign: 'center', flex: 1 }}>{t}</span>
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
              <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
                Content leads with the general, then flips to personal
              </h3>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                The more the system knows about users&apos; taste in this artist, the more it assumes. No data means no assumptions, meaning prioritizing general content first. Rich data means personalized leads.
              </p>
            </div>

            {/* Interactive architecture diagram */}
            <div style={{ width: '100%', marginTop: 8 }}>
              <p style={{ ...dm, fontSize: 17, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#979797', margin: '0 0 32px' }}>
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
              <p style={{ ...dm, fontSize: 14, fontWeight: 300, color: '#979797', textAlign: 'right', margin: 0, padding: '12px 0', borderTop: '1px solid #F0F2F2', marginTop: 24 }}>
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
              <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
                The header is the first point of recognition
              </h3>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                As a listener&apos;s relationship with an artist deepens, the header itself evolves to recognize the connection.
              </p>
            </div>

            <img src="/images/amazon-music/design-decision-2.png" alt="Header mockups across New Listener, Engaged Listener, and Superfan tiers" style={{ width: '100%', display: 'block', borderRadius: 24 }} />

            <div style={{ width: '100%', background: '#FFFFFF', borderRadius: 24, padding: '12px 24px 24px', display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <span style={{ ...dm, fontSize: 48, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.05em', color: '#4A77FF', flexShrink: 0 }}>5/5</span>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                  testing participants named this the first thing that made them feel recognized
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <img src="/images/amazon-music/icon-quote.svg" alt="" width={50} height={50} style={{ flexShrink: 0 }} />
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', fontStyle: 'italic', margin: 0 }}>
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
              <h3 style={{ ...dm, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: '#000000', margin: 0 }}>
                The tab doesn&apos;t exist until there&apos;s a relationship to reflect
              </h3>
              <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                For superfans, artists are woven into memory, not just listening habits. The page reorganizes into eras of users&apos; journey rather than artists&apos; release. It stops being a page about the artist, but about what the artists mean to them.
              </p>
            </div>

            <img src="/images/amazon-music/design-decision-3.png" alt="Superfan artist profile with Era Clustering, Superfan Card, and Narrative Framing annotations" style={{ width: '100%', display: 'block', borderRadius: 24 }} />

            <div style={{ width: '100%', background: '#FFFFFF', borderRadius: 24, padding: '12px 24px 24px', display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <span style={{ ...dm, fontSize: 48, fontWeight: 500, lineHeight: '42px', letterSpacing: '0.05em', color: '#4A77FF', flexShrink: 0 }}>96%</span>
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
                  of survey respondents said they connect to music through mood, memory, or a part of themselves
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                <img src="/images/amazon-music/icon-quote.svg" alt="" width={47} height={47} style={{ flexShrink: 0 }} />
                <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', fontStyle: 'italic', margin: 0 }}>
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
                  <span style={{ ...dm, fontSize: 13.5, fontWeight: 700, lineHeight: '18.23px', color: '#525252', whiteSpace: 'pre-line' }}>{'Adaptive\nRecognition'}</span>
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
                <span style={{ ...dm, fontSize: 17, fontWeight: 700, color: '#4A77FF' }}>Start with superfans.<br />Compound across the listener base.</span>
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
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252', margin: 0 }}>
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
                        <span style={{ ...dm, fontSize: 16, fontWeight: 600, color: '#101314' }}>{row.surface}</span>
                      </TableCell>
                      <TableCell lastRow={lastRow}>
                        <span style={{ ...dm, fontSize: 15.5, fontWeight: 300, lineHeight: '24.8px', color: '#2B3433' }}>{row.won}</span>
                      </TableCell>
                      <TableCell lastCol lastRow={lastRow}>
                        <span style={{ ...dm, fontSize: 15.5, fontWeight: 300, lineHeight: '24.8px', color: '#6C7675' }}>{row.current}</span>
                      </TableCell>
                    </Fragment>
                  )
                })}
              </div>
            </div>

            <div style={{ width: '100%', background: '#E4EAFF', borderRadius: 20, padding: '26px 30px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0 18px' }}>
              <span style={{ ...dm, fontSize: 23, fontWeight: 700, color: '#4A77FF' }}>&quot;It knows me&quot;</span>
              <span style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#525252' }}>— recognition landed in 3 of 3 prototypes tested.</span>
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

      {/* Next Project */}
      <div
        className="cs-next-project-outer"
        onMouseMove={e => setCursorPos({ x: e.clientX, y: e.clientY })}
        style={{ borderTop: '1px solid #E5E5E5', padding: '61px 125px 60px' }}
      >
        <p style={{ ...dm, fontSize: 36, fontWeight: 600, lineHeight: '42px', color: '#000000', marginBottom: 40, marginTop: 0 }}>Next Project</p>
        <Link
          to="/ahoku"
          className="cs-next-project-row"
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 48, textDecoration: 'none' }}
        >
          <div className="cs-next-project-img" style={{ width: 499, height: 315, flexShrink: 0, borderRadius: 20, overflow: 'hidden', boxShadow: '4px 4px 12px rgba(0,0,0,0.12)' }}>
            <img src="/images/work-card-1.png" alt="Ahoku Smart Homecare Device" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ ...dm, fontSize: 24, fontWeight: 700, color: '#2D2D2D', margin: 0 }}>Ahoku Smart Homecare Device</h3>
            <p style={{ ...dm, fontSize: 17, fontWeight: 300, lineHeight: '27px', color: '#2D2D2D', margin: 0 }}>
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

      {/* Footer */}
      <footer className="w-full bg-[#F3F3F3]">
        <div className="cs-footer-inner" style={{ padding: '61px 125px 60px', display: 'flex', flexDirection: 'column', gap: 70 }}>
          <div className="cs-footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div style={{ width: 235 }}>
              <h2 style={{ ...dm, fontSize: 60, fontWeight: 800, lineHeight: '62px', color: '#000000', margin: 0 }}>Let&apos;s work together!</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'end', gap: 32 }}>
              <p style={{ ...dm, fontSize: 17, fontWeight: 400, lineHeight: '27px', color: '#2D2D2D', maxWidth: 447, margin: 0 }}>
                I&apos;m currently available for new work.
                <br />Feel free to grab a virtual coffee with me via{' '}
                <a href="mailto:celine900423lu@gmail.com" className="underline hover:opacity-70 transition-opacity">email</a>!
              </p>
              <img src="/images/footer-portrait-303597.png" alt="Celine portrait" style={{ width: 176, height: 185, objectFit: 'cover', flexShrink: 0 }} />
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
