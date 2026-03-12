import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'
import GrainOverlay from '../shared/GrainOverlay'

export default function MainLayout() {
  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      <GrainOverlay />
      <Header />
      <main className="pb-20 md:pb-0 min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
