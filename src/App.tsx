import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Academy from './pages/Academy'
import Music from './pages/Music'
import Kitchen from './pages/Kitchen'
import Yettore from './pages/Yettore'
import PeulFier from './pages/PeulFier'
import PeulNation from './pages/PeulNation'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/admin/Dashboard'
import { useUserStore } from './stores/userStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isOnboarded = useUserStore((state) => state.isOnboarded)

  if (!isOnboarded) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

/* Root "/" shows Landing if not onboarded, Home (inside layout) if onboarded */
function RootRoute() {
  const isOnboarded = useUserStore((state) => state.isOnboarded)

  if (!isOnboarded) {
    return <Landing />
  }

  return <Navigate to="/home" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<RootRoute />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/admin" element={<Dashboard />} />

        {/* Protected routes inside MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
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
