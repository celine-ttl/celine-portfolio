import { Link, NavLink } from 'react-router-dom'

const dm = { fontFamily: 'DM Sans, sans-serif' }

const hoverStyles = `
  .pg-card .pg-tags {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .pg-card:hover .pg-tags {
    opacity: 1;
  }
  .pg-card img {
    transition: transform 0.4s ease;
  }
  .pg-card:hover img {
    transform: scale(1.06);
  }
  .pg-card .pg-link {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .pg-card:hover .pg-link {
    opacity: 1;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .pg-layout {
      flex-direction: column !important;
      padding: 48px 24px !important;
      gap: 12px !important;
    }
    .pg-sidebar {
      position: static !important;
      width: 100% !important;
    }
    .pg-gallery {
      width: 100% !important;
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
    }
  }

  @media (max-width: 768px) {
    .pg-row {
      flex-direction: column !important;
    }
    .pg-row > div {
      width: 100% !important;
      flex-shrink: 1 !important;
      min-width: 0 !important;
    }
    .pg-row > div > .pg-card {
      width: 100% !important;
      height: 360px !important;
    }
  }

  @media (max-width: 639px) {
    .pg-layout {
      padding: 32px 20px !important;
    }
    .pg-footer-inner {
      padding: 40px 20px !important;
      gap: 40px !important;
    }
    .pg-footer-top {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 24px !important;
    }
    .pg-footer-identity {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 16px !important;
    }
    .pg-footer-identity h2 {
      font-size: 36px !important;
      line-height: 40px !important;
    }
    .pg-footer-identity img {
      width: 120px !important;
      height: 126px !important;
    }
    .pg-footer-bottom {
      flex-direction: column !important;
      align-items: flex-start !important;
    }
  }

  @media (max-width: 1200px) and (min-width: 640px) {
    .pg-footer-inner {
      padding: 48px 24px !important;
    }
  }
`

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalLink({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pg-link"
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', top: 12, right: 12,
        width: 40, height: 40,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10,
        textDecoration: 'none',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#202020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

function SidebarPill({ children, style }) {
  return (
    <span style={{
      position: 'absolute',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px 12px',
      background: '#fff',
      border: '2px solid #525252',
      borderRadius: 100,
      fontFamily: 'DM Sans, sans-serif',
      fontWeight: 700,
      fontSize: 16,
      color: '#525252',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {children}
    </span>
  )
}

function GlassTag({ children }) {
  return (
    <span style={{
      background: 'rgba(243,243,243,0.7)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      borderRadius: 20,
      padding: '7px 20px',
      fontFamily: 'Inter, sans-serif',
      fontSize: 13,
      fontWeight: 400,
      color: '#202020',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  )
}

function CardTitle({ children }) {
  return (
    <span style={{ ...dm, fontSize: 17, lineHeight: '27px', color: '#2D2D2D' }}>
      {children}
    </span>
  )
}

export default function Playground() {
  return (
    <>
      <style>{hoverStyles}</style>

      <Nav />

      {/* Main content */}
      <div className="pg-layout" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', display: 'flex', gap: 80, alignItems: 'flex-start' }}>

        {/* Left: heading + description */}
        <div className="pg-sidebar" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 32, paddingBottom: 40, position: 'sticky', top: 80 }}>
          <div className="pg-sidebar-heading" style={{ position: 'relative', minHeight: 160 }}>
            <h1 style={{ ...dm, fontWeight: 700, fontSize: 64, lineHeight: '64px', color: '#000', margin: 0, paddingTop: 24, paddingLeft: 15, maxWidth: 265 }}>
              Off The Menu
            </h1>
            <SidebarPill style={{ left: 0, top: 76, transform: 'rotate(-5deg)' }}>Code</SidebarPill>
            <SidebarPill style={{ left: 160, top: 7, transform: 'rotate(8deg)' }}>Branding</SidebarPill>
            <SidebarPill style={{ left: 173, top: 118, transform: 'rotate(-6deg)' }}>Design</SidebarPill>
          </div>
          <p style={{ ...dm, fontSize: 17, lineHeight: '27px', color: '#2D2D2D', margin: 0, paddingLeft: 15 }}>
            Here are some ideas I&apos;ve been brewing: an ever-growing collection of experiments in code, branding, design, and whatever sparks my curiosity next!
          </p>
        </div>

        {/* Right: card gallery */}
        <div className="pg-gallery" style={{ width: 887, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6, overflowX: 'auto' }}>

          {/* Row 1: AI-native Browser (600) + Bumble Party (263) */}
          <div className="pg-row" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <div className="pg-card" style={{ width: 600, height: 345, borderRadius: 12, overflow: 'hidden', position: 'relative', background: '#C8CFF2' }}>
                <ExternalLink href="https://uiforai.figma.site/ephemeral" />
                {/* Glass overlay */}
                <div style={{
                  position: 'absolute', top: 27, left: 77, width: 447, height: 291,
                  background: 'linear-gradient(214deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 97%), rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 8,
                  boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.12)',
                }} />
                {/* Prototype screenshot */}
                <div style={{ position: 'absolute', top: 37, left: 87, width: 427, height: 270, borderRadius: 8, overflow: 'hidden', boxShadow: '0px 4px 12px 0px rgba(0,0,0,0.12)' }}>
                  <img src="/images/playground/ai-browser-prototype-5d1b08.png" alt="AI-native Browser prototype" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                {/* Tags */}
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 12 }}>
                  <GlassTag>Vibe coding</GlassTag>
                  <GlassTag>AI design</GlassTag>
                </div>
              </div>
              <CardTitle>AI-native Browser</CardTitle>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <div className="pg-card" style={{ width: 263, height: 345, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                <img src="/images/playground/bumble-party-card.png" alt="Bumble Party" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 12 }}>
                  <GlassTag>Interaction design</GlassTag>
                </div>
              </div>
              <CardTitle>Bumble Party</CardTitle>
            </div>
          </div>

          {/* Row 2: Activity AI OS (320) + TSA Banner (fill ~543) */}
          <div className="pg-row" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <div className="pg-card" style={{ width: 320, height: 332, borderRadius: 13, overflow: 'hidden', position: 'relative' }}>
                <ExternalLink href="https://uiforai.figma.site/aios" />
                <img src="/images/playground/activity-ai-os.gif" alt="Activity Based AI OS" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 12 }}>
                  <GlassTag>Vibe coding</GlassTag>
                  <GlassTag>AI design</GlassTag>
                </div>
              </div>
              <CardTitle>Activity Based AI OS</CardTitle>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, minWidth: 0 }}>
              <div className="pg-card" style={{ height: 332, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                <img src="/images/playground/tsa-banner-card.png" alt="TSA Cultural Night Banner - Journey" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 12 }}>
                  <GlassTag>Illustration</GlassTag>
                  <GlassTag>Branding</GlassTag>
                </div>
              </div>
              <CardTitle>TSA Cultural Night Banner - Journey</CardTitle>
            </div>
          </div>

          {/* Row 3: Prompt DNA (619) + Drageng Show Poster (fill) */}
          <div className="pg-row" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
              <div className="pg-card" style={{ width: 619, height: 345, borderRadius: 11, overflow: 'hidden', position: 'relative', background: '#1B191E' }}>
                {/* Purple glow */}
                <div style={{
                  position: 'absolute', top: 29, left: 24, width: 572, height: 286,
                  background: 'radial-gradient(circle, rgba(162,96,225,0.84) 0%, rgba(89,52,123,0.84) 100%)',
                  filter: 'blur(10px)',
                }} />
                {/* GIF */}
                <div style={{ position: 'absolute', top: 45, left: 36, width: 547, height: 255, borderRadius: 11, overflow: 'hidden' }}>
                  <img src="/images/playground/prompt-dna.gif" alt="Prompt DNA" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                {/* Tags */}
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 11, display: 'flex', gap: 11 }}>
                  <GlassTag>Vibe coding</GlassTag>
                  <GlassTag>AI design</GlassTag>
                </div>
              </div>
              <CardTitle>Prompt DNA</CardTitle>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 0 }}>
              <div className="pg-card" style={{ height: 345, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                <img src="/images/playground/drageng-poster.png" alt="The Drageng Show Poster" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 12 }}>
                  <GlassTag>Branding</GlassTag>
                </div>
              </div>
              <CardTitle>The Drageng Show Poster</CardTitle>
            </div>
          </div>

          {/* Row 4: Figma VC (458) + Fig Build 2026 (fill) */}
          <div className="pg-row" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flexShrink: 0 }}>
              <div className="pg-card" style={{ width: 458, height: 294, borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
                <ExternalLink href="https://drive.google.com/file/d/19Djfi16PC5FWa7VbVkovA_UEY-PU3Beg/view?usp=sharing" />
                <img src="/images/playground/figma-vc.gif" alt="Figma Version Control" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 10, display: 'flex', gap: 10 }}>
                  <GlassTag>Creativity Tool</GlassTag>
                  <GlassTag>AI design</GlassTag>
                </div>
              </div>
              <CardTitle>Figma Version Control - AI Semantic Clustering</CardTitle>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
              <div className="pg-card" style={{ height: 296, borderRadius: 9, overflow: 'hidden', position: 'relative' }}>
                <ExternalLink href="https://devpost.com/software/vivid-increasing-life-luminosity" />
                <img src="/images/playground/figbuild-2ef47d.png" alt="Fig Build 2026" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="pg-tags" style={{ position: 'absolute', bottom: 12, left: 9, display: 'flex', gap: 9 }}>
                  <GlassTag>Vibe coding</GlassTag>
                </div>
              </div>
              <CardTitle>Vivid - Fig Build 2026</CardTitle>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#F3F3F3]">
        <div className="pg-footer-inner flex flex-col" style={{ maxWidth: 1280, margin: '0 auto', padding: '61px 40px 60px', gap: 70 }}>
          <div className="pg-footer-top flex flex-col lg:flex-row justify-between items-start lg:items-center" style={{ gap: 32 }}>
            <div className="pg-footer-identity flex items-center" style={{ gap: 32 }}>
              <div style={{ width: 235 }}>
                <h2 className="text-black text-[48px] leading-[48px]" style={{ ...dm, fontWeight: 800 }}>
                  Let&apos;s work together!
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
          <div className="pg-footer-bottom flex flex-col sm:flex-row justify-between items-start sm:items-center" style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24, gap: 16 }}>
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
