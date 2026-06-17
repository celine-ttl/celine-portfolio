import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const dm = { fontFamily: 'DM Sans, sans-serif' }
const ep = { fontFamily: 'Epilogue, sans-serif' }

const NAV_SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'problem-space', label: 'Problem' },
  { id: 'user-research', label: 'Research' },
  { id: 'solution-1', label: 'Solution' },
  { id: 'results', label: 'Results' },
  { id: 'reflection', label: 'Reflection' },
]

function SideNav({ visible, active }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 200,
        right: 40,
        display: 'flex',
        flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(16px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 40,
      }}
    >
      {NAV_SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', padding: 0 }}
            onClick={e => {
              e.preventDefault()
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {/* Continuous line segment — thicker + black when active */}
            <div style={{ width: 12, display: 'flex', justifyContent: 'center', alignSelf: 'stretch', flexShrink: 0 }}>
              <div
                style={{
                  width: isActive ? 3 : 1,
                  alignSelf: 'stretch',
                  background: isActive ? '#000000' : '#EBEBEB',
                  transition: 'width 0.25s ease, background 0.25s ease',
                }}
              />
            </div>
            <span
              style={{
                ...dm,
                marginLeft: 10,
                fontSize: 12,
                lineHeight: '20px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#000000' : '#999999',
                transition: 'color 0.25s ease, font-weight 0.25s ease',
                whiteSpace: 'nowrap',
                padding: '5px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {s.label}
            </span>
          </a>
        )
      })}
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

function Pill({ text }) {
  return (
    <div className="flex flex-row justify-center items-center w-fit rounded-full text-white text-[17px] font-semibold leading-[27px]" style={{ ...dm, background: '#4A77FF', padding: '0 24px' }}>
      {text}
    </div>
  )
}

function CalloutCard({ pill, body }) {
  return (
    <div className="flex flex-col gap-[10px] rounded-[24px] bg-white" style={{ padding: 24, boxShadow: '4px 4px 18px 0px rgba(0,0,0,0.1), -4px -4px 18px 0px rgba(0,0,0,0.1)' }}>
      <Pill text={pill} />
      <p className="text-[17px] font-semibold leading-[27px] text-black" style={dm}>{body}</p>
    </div>
  )
}

function SectionLabel({ text }) {
  return (
    <p className="text-[16px] font-normal leading-[42px] uppercase text-[#979797]" style={{ ...dm, letterSpacing: '0.05em' }}>{text}</p>
  )
}

export default function AhokuCaseStudy() {
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('context')
  const heroRef = useRef(null)
  const nextProjectRef = useRef(null)

  // Show side nav after hero scrolls out, hide when next project is reached
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    const nextObserver = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (heroRef.current) heroObserver.observe(heroRef.current)
    if (nextProjectRef.current) nextObserver.observe(nextProjectRef.current)
    return () => { heroObserver.disconnect(); nextObserver.disconnect() }
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

  // Track active section
  useEffect(() => {
    const sectionMap = {
      'key-insights': 'user-research',
      'solution-2': 'solution-1',
      'solution-3': 'solution-1',
    }
    const allSectionIds = ['context', 'problem-space', 'user-research', 'key-insights', 'solution-1', 'solution-2', 'solution-3', 'results', 'reflection']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveSection(sectionMap[id] ?? id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    allSectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
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
          <div className="flex items-center" style={{ gap: 52 }}>
            <Link to="/#work" className="text-[#2D2D2D] text-[17px] font-normal leading-7 hover:opacity-70 transition-opacity" style={dm}>Work</Link>
            <Link to="/#about" className="text-[#2D2D2D] text-[17px] font-normal leading-7 hover:opacity-70 transition-opacity" style={dm}>About</Link>
            <Link to="/#contact" className="text-[#2D2D2D] text-[17px] font-normal leading-7 hover:opacity-70 transition-opacity" style={dm}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero background image */}
      <div ref={heroRef} style={{ marginTop: 80 }}>
        <img src="/images/ahoku/hero-bg.png" alt="" className="w-full object-cover" style={{ height: 560 }} />
      </div>

      {/* Case study hero */}
      <div className="flex justify-center" style={{ background: '#FFFFFF', padding: 40 }}>
        <div className="flex flex-col gap-[32px]" style={{ width: 800, padding: '40px 0' }}>
          <div className="flex flex-col gap-[16px]">
            <h1 className="text-[48px] font-bold leading-[60px] text-black" style={dm}>ANT Health Device Redesign</h1>
            <p className="text-[17px] font-light leading-[27px] text-[#2D2D2D]" style={dm}>
              Redesigning a health monitoring device for independent seniors—making it truly intuitive and empowering.
            </p>
          </div>
          {/* Metadata row */}
          <div className="flex justify-between rounded-[24px]" style={{ background: '#F3F3F3', padding: 24 }}>
            {[
              { label: 'Role', values: ['Product Designer'] },
              { label: 'Timeline', values: ['Aug 2025 -', 'Dec 2025'] },
              { label: 'Team', values: ['1 Designer (me!)', '3 Engineers'] },
              { label: 'Tools', values: ['Figma', 'User Research'] },
            ].map(({ label, values }) => (
              <div key={label} className="flex flex-col gap-[8px]" style={{ width: 160 }}>
                <span className="text-[14px] font-black uppercase text-[#4A77FF]" style={{ ...dm, letterSpacing: '0.05em', lineHeight: '21px' }}>{label}</span>
                <div className="flex flex-col">
                  {values.map(v => (
                    <span key={v} className="text-[17px] font-light leading-[27px] text-[#2D2D2D]" style={dm}>{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main>
        {/* CONTEXT */}
        <section id="context" className="flex flex-col items-center bg-white" style={{ position: 'relative', padding: '60px 55px', gap: 24, overflow: 'visible' }}>
          {/* Decorative ANT device image — absolutely positioned per Figma */}
          <img
            src="/images/ahoku/ant-device.png"
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', left: -69, top: 172, width: 254, height: 229, objectFit: 'contain', pointerEvents: 'none' }}
          />
          <div className="flex flex-col gap-[32px] fade-section" style={{ width: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Context" />
              {/* Two-column row: title left, body right */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, width: 800 }}>
              <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={{ ...dm, flex: 1 }}>
                A device built for independence — that was quietly working against it.
              </h2>
              <div style={{ width: 446 }}>
                <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
                  The ANT health device was designed for seniors who live independently, people who want to manage health on their own terms without relying on a caregiver. But in practice, rather than feeling capable, many ended up asking for help when using the device.
                  <br /><br />
                  This lead me to the main challenge of this project:
                </p>
              </div>
            </div>
            </div>
            {/* Callout card — full width below the row */}
            <CalloutCard
              pill="Challenge"
              body="How might we design a healthcare device interface that empowers elderly users to independently manage their health while providing peace of mind to their caregivers?"
            />
          </div>
        </section>

        {/* PROBLEM SPACE */}
        <section id="problem-space" className="flex flex-col items-center bg-white" style={{ padding: '80px 40px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Problem Space" />
              <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>
                If elderly users can't log independently, caregivers lose visibility, medical teams lose trust, and the device loses its purpose.
              </h2>
            </div>
            <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
              The ANT device sits at the center of a three-way relationship. When elderly users log consistently, caregivers stay informed and medical teams can make confident care decisions. When the interface gets in the way, they stop logging, and that entire chain breaks down.
            </p>
            <img
              src="/images/ahoku/problem-diagram.png"
              alt="Three-way relationship diagram"
              className="w-full rounded-[16px]"
              style={{ height: 365, objectFit: 'contain' }}
            />
          </div>
        </section>

        {/* USER RESEARCH */}
        <section id="user-research" className="flex flex-col items-center bg-white" style={{ padding: '80px 40px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="User Research" />
              <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>Understanding the problem</h2>
            </div>
            <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
              To understand why users were disengaging, I interviewed 15 elderly users who used the device for a month. What I heard wasn't just about usability, it was more personal. After synthesizing the research, four patterns came up across almost every conversation:
            </p>
            {/* 4 insight cards */}
            <div className="grid grid-cols-2 gap-[24px]">
              {[
                { heading: 'Information overload:', body: 'The device tracked dozens of metrics, but users only needed 2–3 relevant to their conditions.' },
                { heading: 'Inputs that were hard to complete:', body: "Both manual entry and automatic device pairing were difficult enough that users regularly couldn't finish what they started and often stopped trying." },
                { heading: 'No personalization:', body: 'Nothing about the experience reflected their individual needs.' },
                { heading: 'A visual design that added friction:', body: 'Small tap targets, low contrast, and dense layouts made even basic navigation stressful.' },
              ].map(({ heading, body }) => (
                <div key={heading} className="flex flex-col gap-[8px] rounded-[24px]" style={{ background: '#F3F3F3', padding: 24 }}>
                  <p className="text-[17px] font-extrabold leading-[27px] text-[#4A77FF]" style={dm}>{heading}</p>
                  <p className="text-[14px] font-light leading-[24px] text-[#525252]" style={dm}>{body}</p>
                </div>
              ))}
            </div>
            <CalloutCard
              pill="Key takeaway"
              body="Elders didn't want help. They wanted to feel capable. The design made that difficult."
            />
            <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
              Example of the original Health Book Dashboard design:
            </p>
            <img
              src="/images/ahoku/original-dashboard.png"
              alt="Original Health Book Dashboard"
              className="w-full rounded-[16px]"
              style={{ height: 422, objectFit: 'cover', boxShadow: '5px 5px 12px 0px rgba(0,0,0,0.12), -4px -4px 12px 0px rgba(82,82,82,0.12)' }}
            />
          </div>
        </section>

        {/* KEY INSIGHTS */}
        <section id="key-insights" className="flex flex-col items-center" style={{ padding: '80px 40px', gap: 24, background: '#F8F8F8' }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Key Insights" />
              <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>
                Two patterns kept surfacing: too much to see, and too hard to connect.
              </h2>
            </div>
            {/* Insight 1 */}
            <div className="flex flex-col gap-[16px] rounded-[20px]" style={{ padding: 32 }}>
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center justify-center rounded-full text-[#4A77FF] text-[24px] font-semibold flex-shrink-0" style={{ width: 52, height: 52, background: 'rgba(137,197,234,0.35)' }}>1</div>
                <h3 className="text-[24px] font-semibold leading-[27px] text-[#525252]" style={dm}>Showing everything meant nothing stood out</h3>
              </div>
              <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
                The ANT device contain dozens of trackable metrics, detailed trend analysis, and broad device compatibility. But most of them were not used, simply the 2-3 metrics that tied to their specific conditions.
              </p>
              <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
                All that capability, displayed at once with equal prominence, created a dense screen that users struggled to find the two things they came for.
              </p>
            </div>
            {/* Insight 2 */}
            <div className="flex flex-col gap-[16px] rounded-[20px]" style={{ padding: 32 }}>
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center justify-center rounded-full text-[#4A77FF] text-[24px] font-semibold flex-shrink-0" style={{ width: 52, height: 52, background: 'rgba(137,197,234,0.35)' }}>2</div>
                <h3 className="text-[24px] font-semibold leading-[27px] text-[#525252]" style={dm}>A device for independent living was creating dependence</h3>
              </div>
              <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
                When I asked users why they weren't syncing their wearables, many had simply given up — or were waiting for a family member to visit and help. Behavioral data confirmed it: <strong>80% abandoned the pairing process midway.</strong>
              </p>
              <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
                A device built for independent living was making people dependent on others just to use it.
              </p>
            </div>
            <CalloutCard
              pill="Solution"
              body="Strip back what wasn't needed, and make what remained effortless: automated where possible, and simple enough to do alone when it wasn't."
            />
          </div>
        </section>

        {/* SOLUTION 1 */}
        <section id="solution-1" className="flex flex-col items-center bg-white" style={{ padding: '80px 40px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Solution Highlights" />
              <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>Solution 1: Personalized Dashboard</h2>
            </div>
            <p className="text-[24px] font-bold italic leading-[36px] text-[#4A77FF]" style={dm}>
              "If users only care about 2–3 metrics, why show them everything?"
            </p>
            <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
              I designed a customizable dashboard where users select their priority metrics. Their top three appear prominently every time they open the device, with everything else accessible by scrolling. Instead of opening the device and scanning through a cluttered screen, users arrive directly at what they came for. That shift—from searching to arriving—makes the experience feel calmer and more in their control.
            </p>
            <img
              src="/images/ahoku/solution-1.gif"
              alt="Personalized dashboard redesign"
              className="w-full"
              style={{ borderRadius: 28, boxShadow: '0px 12px 12px 0px rgba(0,0,0,0.12)', height: 450, objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* SOLUTION 2 */}
        <section id="solution-2" className="flex flex-col items-center bg-white" style={{ padding: '80px 40px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>Solution 2: Automatic Input</h2>
            <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
              The original flow required users to manually navigate between two devices, which causes confusion and easy to get wrong.{' '}
              <strong>The redesign makes it hands-free.</strong>{' '}
              Users simply place their measurement device near the ANT: the device automatically detects it, tracks the measurement in progress, and records the result. A live status indicator on the screen guides users through each stage, so the experience feels seamless across both devices.
            </p>
            <img
              src="/images/ahoku/solution-2.gif"
              alt="Automatic input flow"
              className="w-full"
              style={{ borderRadius: 28, boxShadow: '0px 12px 12px 0px rgba(0,0,0,0.12)', height: 450, objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* SOLUTION 3 */}
        <section id="solution-3" className="flex flex-col items-center bg-white" style={{ padding: '80px 40px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>Solution 3: Manual Input</h2>
            <p className="text-[24px] font-bold leading-[36px] text-[#4A77FF]" style={dm}>
              "Small buttons, a crowded layout, a notes field no one ever used."
            </p>
            <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>
              For times when automatic input isn't available, users can log data manually. But the original manual flow had its own friction points: easy-to-mis-tap buttons, a number pad with awkward placement, and a notes field almost no one used taking up prime screen space.
              <br /><br />
              I enlarged tap targets, repositioned and scaled up the number pad, and a scrollable note field. On a constrained screen, these refinements directly impact whether elderly users can complete entries accurately and independently.
            </p>
            <img
              src="/images/ahoku/solution-3.gif"
              alt="Manual input flow redesign"
              className="w-full"
              style={{ borderRadius: 28, boxShadow: '0px 12px 12px 0px rgba(0,0,0,0.12)', height: 450, objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="flex flex-col items-center bg-white" style={{ padding: '80px 40px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Results" />
              <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>
                From 80% abandonment to 95% success. From confusion to confidence.
              </h2>
            </div>
            <p className="text-[17px] font-light leading-[27px] text-[#2D2D2D]" style={dm}>
              To validate the redesign, I tested with 25 elderly users — 15 from the original research group and 10 new participants. The results confirmed that simplifying the flows and personalizing the experience had a direct impact on users' ability to manage their health independently.
            </p>
            <div className="rounded-[24px] bg-white" style={{ padding: 24, boxShadow: '4px 4px 12px 0px rgba(0,0,0,0.12), -4px -4px 12px 0px rgba(0,0,0,0.12)' }}>
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #525252' }}>
                    {['Metric', 'Before', 'After'].map(h => (
                      <th key={h} className="text-left text-[17px] font-bold text-[#525252] pb-[12px]" style={dm}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'Device pairing completion rate', before: '20%', after: '95%' },
                    { metric: 'Users completing setup independently', before: '—', after: '100% (15/15)' },
                    { metric: 'User sentiment on visual design', before: '"Cold, outdated"', after: '"Warm, modern, professional"' },
                  ].map(({ metric, before, after }, i, arr) => (
                    <tr key={metric} style={{ borderBottom: i < arr.length - 1 ? '1px solid #E5E5E5' : 'none' }}>
                      <td className="text-[17px] font-normal text-black py-[14px] pr-[24px]" style={dm}>{metric}</td>
                      <td className="text-[17px] font-normal text-black py-[14px] pr-[24px]" style={dm}>{before}</td>
                      <td className="text-[17px] font-bold text-[#4A77FF] py-[14px]" style={dm}>{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* REFLECTION */}
        <section id="reflection" className="flex flex-col items-center bg-white" style={{ padding: '80px 40px', gap: 24 }}>
          <div className="flex flex-col gap-[24px] fade-section" style={{ width: 800 }}>
            <div className="flex flex-col gap-[10px]">
              <SectionLabel text="Reflection" />
              <h2 className="text-[28px] font-semibold leading-[42px] text-black" style={dm}>What I would've done differently.</h2>
            </div>
            <div className="grid grid-cols-2 gap-[24px]">
              {[
                {
                  pill: "What I'd done differently",
                  heading: 'Testing with\nnew ANT users',
                  body1: 'All research participants had prior experience with the device.',
                  body2: 'Including first-time users would have surfaced onboarding friction points that existing users had already unconsciously adapted to, and likely led to a more complete understanding of the experience from the start.',
                },
                {
                  pill: 'Next step',
                  heading: 'Designing for the\nfull ecosystem',
                  body1: 'Even I designed the alert notifications for abnormal readings, but the caregiver and medical team experience needs more depth.',
                  body2: 'The next step is understanding how they currently process health updates, and designing an alert system that surfaces critical information without becoming noise they learn to dismiss.',
                },
              ].map(({ pill, heading, body1, body2 }) => (
                <div key={pill} className="flex flex-col gap-[16px] bg-white rounded-[24px]" style={{ padding: 24, boxShadow: '4px 4px 18px 0px rgba(0,0,0,0.1), -4px -4px 18px 0px rgba(0,0,0,0.1)' }}>
                  <Pill text={pill} />
                  <h3 className="text-[24px] font-bold text-black whitespace-pre-line" style={dm}>{heading}</h3>
                  <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>{body1}</p>
                  <p className="text-[17px] font-light leading-[27px] text-[#525252]" style={dm}>{body2}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Next Project */}
      <div ref={nextProjectRef} style={{ borderTop: '1px solid #E5E5E5', padding: '61px 125px 60px' }}>
        <p className="text-[36px] font-semibold leading-[42px] text-black" style={{ ...dm, marginBottom: 40 }}>Next Project</p>
        <div className="flex items-center gap-[48px]">
          <img
            src="/images/ahoku/next-project.png"
            alt="Re-imagining UI for AI"
            className="object-cover rounded-[20px] flex-shrink-0"
            style={{ width: 499, height: 315, boxShadow: '4px 4px 12px rgba(0,0,0,0.12)' }}
          />
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-[24px] font-semibold leading-[30px] text-[#2D2D2D]" style={dm}>Re-imagining UI for AI</h3>
            <p className="text-[17px] font-light leading-[27px] text-[#2D2D2D]" style={dm}>
              Tackling the conversation flow problem with current chatbot design of AI.
            </p>
            <div className="flex gap-[10px]">
              {['Website Design', 'Re-branding'].map(tag => (
                <span key={tag} className="text-[14px] text-black rounded-[20px]" style={{ background: '#F3F3F3', padding: '8px 24px', fontFamily: 'Inter, sans-serif' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#F3F3F3]">
        <div className="flex flex-col" style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 125px 70px', gap: 70 }}>
          <div className="flex justify-between items-end">
            <div style={{ width: 320 }}>
              <h2 className="text-black text-[60px] leading-[62px]" style={{ ...dm, fontWeight: 800 }}>
                Let&apos;s work together!
              </h2>
            </div>
            <div className="flex items-end" style={{ gap: 32 }}>
              <p className="text-[#2D2D2D] text-[17px] font-normal leading-[27px]" style={{ ...dm, width: 447 }}>
                I&apos;m currently available for new work.
                <br />Feel free to grab a virtual coffee with me via{' '}
                <a href="mailto:celine900423lu@gmail.com" className="underline hover:opacity-70 transition-opacity">email</a>!
              </p>
              <img src="/images/footer-portrait-303597.png" alt="Celine portrait" className="object-cover flex-shrink-0" style={{ width: 176, height: 185 }} />
            </div>
          </div>
          <div className="flex justify-between items-center" style={{ borderTop: '1px solid rgba(0,0,0,0.2)', paddingTop: 24 }}>
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
