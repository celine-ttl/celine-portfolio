import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const dm = { fontFamily: 'DM Sans, sans-serif' }

const RESUME_URL = 'https://drive.google.com/file/d/1GNHe7o3-5EYDOh62fgcGVD88N6AN_Lh7/view?usp=sharing'

const activeClass = `text-[17px] leading-7 text-[#2D2D2D] font-bold transition-opacity`
const inactiveClass = `text-[17px] leading-7 text-[#2D2D2D] font-normal hover:opacity-70 transition-opacity`

function navClass({ isActive }) {
  return isActive ? activeClass : inactiveClass
}

export default function Nav({ fixed = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`bg-white w-full${fixed ? ' fixed top-0 left-0 right-0' : ''}`}
        style={{
          height: 80,
          boxShadow: menuOpen ? 'none' : '0 1px 0 rgba(0,0,0,0.08)',
          position: fixed ? undefined : 'relative',
          zIndex: 50,
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
          className="sm:hidden bg-white"
          style={{
            position: fixed ? 'fixed' : 'relative',
            top: fixed ? 80 : undefined,
            left: fixed ? 0 : undefined,
            right: fixed ? 0 : undefined,
            zIndex: 49,
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
