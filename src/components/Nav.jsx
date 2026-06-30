import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const dm = { fontFamily: 'DM Sans, sans-serif' }

const RESUME_URL = 'https://drive.google.com/file/d/1GNHe7o3-5EYDOh62fgcGVD88N6AN_Lh7/view?usp=sharing'

const activeClass = `text-[17px] leading-7 text-[#000000] font-normal transition-opacity`
const inactiveClass = `text-[17px] leading-7 text-[#525252] font-normal hover:opacity-70 transition-opacity`

function navClass({ isActive }) {
  return isActive ? activeClass : inactiveClass
}

export default function Nav({ fixed = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const close = () => setMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 80 || currentY < lastScrollY.current) {
        setVisible(true)
      } else {
        setVisible(false)
        setMenuOpen(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Spacer keeps page layout intact when nav is fixed */}
      {!fixed && <div style={{ height: 80 }} />}

      <nav
        className="w-full"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: 50,
          boxShadow: 'none',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="flex items-center justify-between h-full" style={{ padding: '0 24px' }}>
          <Link to="/" onClick={() => { window.scrollTo(0, 0); close() }}>
            <img src="/images/logo-46ec0d.png" alt="Celine Tseng logo" width={116} height={51} className="object-fill" />
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center" style={{ gap: 52 }}>
            {isHome ? (
              <a href="#work" className={activeClass} style={dm}>Work</a>
            ) : (
              <NavLink to="/" end className={navClass} style={dm}>Work</NavLink>
            )}
            <NavLink to="/playground" className={navClass} style={dm}>Playground</NavLink>
            <NavLink to="/about" className={navClass} style={dm}>About</NavLink>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={inactiveClass}
              style={dm}
            >
              Resume
            </a>
          </div>

          {/* Hamburger button */}
          <button
            className="sm:hidden flex items-center justify-center"
            onClick={() => setMenuOpen(prev => !prev)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H21M3 12H21M3 18H21" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="sm:hidden"
          style={{
            position: 'fixed',
            top: 80,
            left: 0,
            right: 0,
            zIndex: 49,
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            padding: '24px 24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {isHome ? (
            <a href="#work" onClick={close} className={activeClass} style={dm}>Work</a>
          ) : (
            <NavLink to="/" end className={navClass} style={dm} onClick={close}>Work</NavLink>
          )}
          <NavLink to="/playground" className={navClass} style={dm} onClick={close}>Playground</NavLink>
          <NavLink to="/about" className={navClass} style={dm} onClick={close}>About</NavLink>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={inactiveClass}
            style={dm}
            onClick={close}
          >
            Resume
          </a>
        </div>
      )}
    </>
  )
}
