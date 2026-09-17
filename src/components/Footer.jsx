const dm = { fontFamily: 'DM Sans, sans-serif' }

function ArrowDiagonal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4A77FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Footer({ id }) {
  return (
    <footer id={id} className="w-full bg-[#F3F3F3]">
      <div className="site-footer-inner flex flex-col" style={{ maxWidth: 1280, margin: '0 auto', padding: '61px 40px 60px', gap: 70 }}>
        <div className="site-footer-top flex flex-col lg:flex-row justify-between items-start lg:items-center" style={{ gap: 32 }}>
          <div className="site-footer-identity flex items-center" style={{ gap: 32 }}>
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
        <div className="site-footer-bottom flex flex-col sm:flex-row justify-between items-start sm:items-center" style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24, gap: 16 }}>
          <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={dm}>
            Crafted with Cursor, Claude Code, and too much caffeine.
          </p>
          <div className="flex items-center" style={{ gap: 38 }}>
            <a href="https://www.linkedin.com/in/celine-tseng" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-70 transition-opacity">
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
  )
}
