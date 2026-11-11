import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import AhokuCaseStudy from './pages/AhokuCaseStudy'
import UiForAiCaseStudy from './pages/UiForAiCaseStudy'
import AmazonMusicCaseStudy from './pages/AmazonMusicCaseStudy'
import About from './pages/About'
import Playground from './pages/Playground'
import Chat from './pages/Chat'

const SITE = 'https://celinetseng.com'
const DEFAULT_DESCRIPTION = 'Celine Tseng is a product designer, with a Master of Human-Computer Interaction from Carnegie Mellon. Explore her work in AI, music and healthcare.'
const PAGE_META = {
  '/': { title: 'Celine Tseng | Product Designer', description: DEFAULT_DESCRIPTION },
  '/amazon-music': { title: 'Amazon Music: Designing Recognition | Celine Tseng', description: 'A capstone case study on an adaptive Amazon Music artist profile that recognizes loyal fans.' },
  '/ui-for-ai': { title: 'UI for AI: Conversation Flow | Celine Tseng', description: 'A case study on turning linear AI chats into a workspace where past responses can be saved and built on.' },
  '/ahoku': { title: 'ANT Health Device Redesign | Celine Tseng', description: 'A case study on redesigning the interface of a compact health monitoring device for independent seniors.' },
  '/about': { title: 'About | Celine Tseng', description: 'About Celine Tseng: her design philosophy, her journey, and what she does away from the screen.' },
  '/playground': { title: 'Playground | Celine Tseng', description: 'Small experiments and side projects by Celine Tseng.' },
  '/chat': { title: 'Chat with Mocha | Celine Tseng', description: "Ask Mocha, the pixel bear barista, about Celine's work and what she's like." },
}

// Gives every route its own title, description and canonical URL, so search engines treat the pages
// as different pages (and the home page as the front door) even though the site is a single-page app.
function RouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const meta = PAGE_META[path] || PAGE_META['/']
    document.title = meta.title
    const set = (selector, create, attr, value) => {
      let el = document.head.querySelector(selector)
      if (!el) { el = create(); document.head.appendChild(el) }
      el.setAttribute(attr, value)
    }
    const url = SITE + (path === '/' ? '/' : path)
    set('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', meta.description)
    set('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url)
    set('meta[property="og:title"]', () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:title'); return m }, 'content', meta.title)
    set('meta[property="og:description"]', () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:description'); return m }, 'content', meta.description)
    set('meta[property="og:url"]', () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:url'); return m }, 'content', url)
  }, [pathname])
  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteMeta />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ahoku" element={<AhokuCaseStudy />} />
        <Route path="/ui-for-ai" element={<UiForAiCaseStudy />} />
        <Route path="/amazon-music" element={<AmazonMusicCaseStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
