import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Academy from './pages/Academy'
import Music from './pages/Music'
import Kitchen from './pages/Kitchen'
import Yettore from './pages/Yettore'
import PeulFier from './pages/PeulFier'
import PeulNation from './pages/PeulNation'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/admin/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/music" element={<Music />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/yettore" element={<Yettore />} />
          <Route path="/peul-fier" element={<PeulFier />} />
          <Route path="/peulnation" element={<PeulNation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
