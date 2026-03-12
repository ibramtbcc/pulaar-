import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import GrainOverlay from '../shared/GrainOverlay'

export default function MainLayout() {
  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      <GrainOverlay />
      <Sidebar />
      <main className="lg:ml-[240px] pb-20 lg:pb-0 min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
