import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AhokuCaseStudy from './pages/AhokuCaseStudy'
import UiForAiCaseStudy from './pages/UiForAiCaseStudy'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ahoku" element={<AhokuCaseStudy />} />
        <Route path="/ui-for-ai" element={<UiForAiCaseStudy />} />
      </Routes>
    </BrowserRouter>
  )
}
