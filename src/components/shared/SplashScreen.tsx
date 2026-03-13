import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  icon: React.ReactNode
  title: string
  duration?: number
  onComplete: () => void
}

export default function SplashScreen({ icon, title, duration = 1600, onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 500)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#050505' }}
        >
          {/* Ambient glow behind icon */}
          <motion.div
            className="absolute"
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(181,130,78,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Icon container — 260px as per master prompt */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
            style={{ width: 260, height: 260, marginTop: -60 }}
          >
            <div className="flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
              {icon}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 34,
              color: '#f5f0ea',
              marginTop: 8,
            }}
          >
            {title}
          </motion.h1>

          {/* Shimmer line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 h-[2px] rounded-full overflow-hidden"
            style={{ width: 80 }}
          >
            <motion.div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #b5824e, transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% center', '200% center'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
