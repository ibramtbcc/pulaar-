import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { tracks } from '../data/tracks'
import { IconPlay, IconPause, IconSkipNext, IconSkipPrev, IconBack, IconHeart } from '../components/shared/Icons'
import SplashScreen from '../components/shared/SplashScreen'
import { IconRadio } from '../components/shared/Icons'

export default function Music() {
  const navigate = useNavigate()
  const [showSplash, setShowSplash] = useState(true)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const track = tracks[current]

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p)
  }, [])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            nextTrack()
            return 0
          }
          return p + 0.5
        })
      }, track.durationSec * 5)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [playing, current])

  const nextTrack = () => {
    setProgress(0)
    if (shuffle) {
      setCurrent(Math.floor(Math.random() * tracks.length))
    } else {
      setCurrent((c) => (c + 1) % tracks.length)
    }
  }

  const prevTrack = () => {
    setProgress(0)
    setCurrent((c) => (c - 1 + tracks.length) % tracks.length)
  }

  const toggleLike = () => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(current)) next.delete(current)
      else next.add(current)
      return next
    })
  }

  const formatTime = (pct: number) => {
    const secs = Math.floor((pct / 100) * track.durationSec)
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (showSplash) {
    return (
      <SplashScreen
        icon={<IconRadio size={120} />}
        title="Pulaar Music"
        onComplete={() => setShowSplash(false)}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #1a150e 0%, #0c0b09 40%, #050505 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(181,130,78,0.08) 0%, transparent 60%)',
      }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-5 pt-4 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <IconBack size={20} />
          </button>
          <span style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)', fontWeight: 500 }}>
            {current + 1} / {tracks.length}
          </span>
          <div className="w-8" />
        </div>

        {/* Album art placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(181,130,78,0.15) 0%, rgba(12,11,9,0.9) 100%)`,
              border: '1px solid rgba(181,130,78,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <IconRadio size={80} />
          </motion.div>
        </div>

        {/* Track info */}
        <motion.div
          key={`info-${current}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-center"
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f5f0ea' }}>{track.title}</h2>
          <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginTop: 4 }}>{track.artist}</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-6">
          <div
            className="w-full rounded-full overflow-hidden cursor-pointer"
            style={{ height: 4, background: 'rgba(245,240,234,0.08)' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setProgress(((e.clientX - rect.left) / rect.width) * 100)
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #b5824e, #c49a62)',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span style={{ fontSize: 11, color: 'rgba(245,240,234,0.4)' }}>{formatTime(progress)}</span>
            <span style={{ fontSize: 11, color: 'rgba(245,240,234,0.4)' }}>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={() => setShuffle(!shuffle)}
            className="p-2 transition-opacity"
            style={{ opacity: shuffle ? 1 : 0.4 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5f0ea" strokeWidth="1.5">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
            </svg>
          </button>
          <button onClick={prevTrack} className="p-2 active:scale-95 transition-transform">
            <IconSkipPrev size={28} />
          </button>
          <button
            onClick={togglePlay}
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #b5824e, #9a6d3c)',
              boxShadow: '0 4px 20px rgba(181,130,78,0.4)',
            }}
          >
            {playing ? <IconPause size={32} /> : <IconPlay size={32} />}
          </button>
          <button onClick={nextTrack} className="p-2 active:scale-95 transition-transform">
            <IconSkipNext size={28} />
          </button>
          <button onClick={toggleLike} className="p-2 transition-opacity">
            <IconHeart size={20} filled={liked.has(current)} />
          </button>
        </div>
      </div>
    </div>
  )
}
