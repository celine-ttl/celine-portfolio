import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import AhokuCaseStudy from './pages/AhokuCaseStudy'
import UiForAiCaseStudy from './pages/UiForAiCaseStudy'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ahoku" element={<AhokuCaseStudy />} />
        <Route path="/ui-for-ai" element={<UiForAiCaseStudy />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
