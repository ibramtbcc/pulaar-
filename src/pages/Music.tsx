import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { tracks } from '../data/tracks'
import { IconPlay, IconPause, IconSkipNext, IconSkipPrev, IconBack, IconHeart, IconRadio } from '../components/shared/Icons'
import SplashScreen from '../components/shared/SplashScreen'
import { useIsTablet } from '../hooks/useMediaQuery'
import icons from '../data/icons.json'

const ic = icons as Record<string, string>

/* Inline SVG icons for shuffle, repeat */
function IconShuffle({ size = 20, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={active ? '#b5824e' : '#f5f0ea'} strokeWidth="1.5">
      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  )
}

function IconRepeat({ size = 20, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={active ? '#b5824e' : '#f5f0ea'} strokeWidth="1.5">
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

/* Pulsing glow keyframes injected once */
const glowStyle = `
@keyframes albumPulseGlow {
  0%, 100% { box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 20px rgba(181,130,78,0.08); }
  50% { box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(181,130,78,0.2), 0 0 60px rgba(181,130,78,0.08); }
}
@keyframes albumIdleGlow {
  0%, 100% { box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 10px rgba(181,130,78,0.04); }
}
`

export default function Music() {
  const navigate = useNavigate()
  const isTablet = useIsTablet()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const track = tracks[current]

  const togglePlay = useCallback(() => setPlaying((p) => !p), [])

  const nextTrack = useCallback(() => {
    setProgress(0)
    if (repeat) {
      // restart same track
      setPlaying(true)
    } else {
      setCurrent(shuffle ? Math.floor(Math.random() * tracks.length) : (c) => (c + 1) % tracks.length)
    }
  }, [shuffle, repeat])

  const prevTrack = () => { setProgress(0); setCurrent((c) => (c - 1 + tracks.length) % tracks.length) }
  const toggleLike = () => { setLiked((prev) => { const n = new Set(prev); if (n.has(current)) n.delete(current); else n.add(current); return n }) }

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => { if (p >= 100) { nextTrack(); return 0 }; return p + 0.5 })
      }, track.durationSec * 5)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, current, nextTrack])

  const formatTime = (pct: number) => {
    const secs = Math.floor((pct / 100) * track.durationSec)
    return `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`
  }

  if (showSplash) return <SplashScreen icon={<img src={ic.radio} alt="" className="w-[120px] h-[120px] object-contain" />} title="Pulaar Music" onComplete={() => setShowSplash(false)} />

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Inject glow animation */}
      <style>{glowStyle}</style>

      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #1a150e 0%, #0c0b09 40%, #050505 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(181,130,78,0.08) 0%, transparent 60%)' }} />

      <div className="relative z-10 section-padding pt-6 md:pt-12 pb-24 md:pb-16">
        <div className="content-max">

          {/* Now Playing mini bar */}
          {playing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-6"
              style={{ background: 'rgba(181,130,78,0.08)', border: '1px solid rgba(181,130,78,0.12)' }}
            >
              {/* Playing indicator bars */}
              <div className="flex items-end gap-0.5 h-3">
                {[1, 2, 3].map((b) => (
                  <motion.div
                    key={b}
                    className="w-0.5 rounded-full"
                    style={{ background: '#b5824e' }}
                    animate={{ height: ['3px', '10px', '3px'] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: b * 0.12 }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium" style={{ color: '#b5824e' }}>En cours de lecture</span>
              <span className="text-xs font-medium ml-1" style={{ color: 'rgba(245,240,234,0.5)' }}>
                {track.title} - {track.artist}
              </span>
            </motion.div>
          )}

          {/* Desktop: side-by-side layout */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            {/* Left: Player */}
            <div className="flex-1 flex flex-col items-center">
              {/* Back + counter (mobile) */}
              <div className="flex items-center justify-between w-full mb-8 lg:hidden">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2"><IconBack size={20} /></button>
                <span className="text-small font-medium">{current + 1} / {tracks.length}</span>
                <div className="w-8" />
              </div>

              {/* Album art with pulsing border glow */}
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl relative overflow-hidden"
                style={{
                  border: playing ? '1px solid rgba(181,130,78,0.25)' : '1px solid rgba(181,130,78,0.1)',
                  animation: playing ? 'albumPulseGlow 3s ease-in-out infinite' : 'none',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                }}
              >
                {/* Dynamic gradient that shifts per track */}
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(${135 + current * 25}deg, rgba(181,130,78,${0.15 + (current % 3) * 0.05}) 0%, rgba(${80 + current * 10},${60 + current * 8},${30 + current * 5},0.2) 50%, rgba(12,11,9,0.95) 100%)`,
                }} />
                {/* Geometric pattern overlay */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(181,130,78,0.5) 20px, rgba(181,130,78,0.5) 21px)`,
                }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <IconRadio size={48} />
                  <p className="text-xs font-semibold mt-3 uppercase tracking-widest" style={{ color: 'rgba(245,240,234,0.3)' }}>
                    {track.artist.split(' ')[0]}
                  </p>
                </div>
                {/* Animated equalizer at bottom when playing */}
                {playing && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-6">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
                      <motion.div
                        key={b}
                        className="w-1 rounded-full"
                        style={{ background: 'rgba(181,130,78,0.6)' }}
                        animate={{ height: ['4px', `${12 + Math.random() * 12}px`, '4px'] }}
                        transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: b * 0.08 }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Track info */}
              <motion.div key={`info-${current}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
                <h2 className="text-h2">{track.title}</h2>
                <p className="text-body mt-1">{track.artist}</p>
              </motion.div>

              {/* Progress */}
              <div className="mt-6 w-full max-w-sm">
                <div className="w-full rounded-full overflow-hidden cursor-pointer" style={{ height: 4, background: 'rgba(245,240,234,0.08)' }}
                  onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - rect.left) / rect.width) * 100) }}>
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #b5824e, #c49a62)' }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs" style={{ color: 'rgba(245,240,234,0.4)' }}>{formatTime(progress)}</span>
                  <span className="text-xs" style={{ color: 'rgba(245,240,234,0.4)' }}>{track.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-5 mt-6">
                <button
                  onClick={() => setShuffle(!shuffle)}
                  className="p-2 hover:scale-110"
                  style={{ opacity: shuffle ? 1 : 0.4, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <IconShuffle size={20} active={shuffle} />
                </button>
                <button onClick={prevTrack} className="p-2 hover:scale-110 active:scale-95 transition-transform"><IconSkipPrev size={28} /></button>
                <button onClick={togglePlay} className="w-[72px] h-[72px] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #b5824e, #9a6d3c)', boxShadow: '0 4px 20px rgba(181,130,78,0.4)' }}>
                  {playing ? <IconPause size={32} /> : <IconPlay size={32} />}
                </button>
                <button onClick={nextTrack} className="p-2 hover:scale-110 active:scale-95 transition-transform"><IconSkipNext size={28} /></button>
                <button
                  onClick={() => setRepeat(!repeat)}
                  className="p-2 hover:scale-110"
                  style={{ opacity: repeat ? 1 : 0.4, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <IconRepeat size={20} active={repeat} />
                </button>
              </div>

              {/* Like button below controls */}
              <button onClick={toggleLike} className="mt-4 p-2 hover:scale-110 transition-transform">
                <IconHeart size={22} filled={liked.has(current)} />
              </button>
            </div>

            {/* Right: Playlist */}
            <div className="w-full lg:w-[380px] mt-10 lg:mt-4">
              <h3 className="text-label mb-4">Playlist</h3>
              <div className="flex flex-col gap-1">
                {tracks.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setProgress(0) }}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-left group/item"
                    style={{
                      background: i === current ? 'rgba(181,130,78,0.08)' : 'transparent',
                      borderLeft: i === current ? '4px solid #b5824e' : '4px solid transparent',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      if (i !== current) {
                        e.currentTarget.style.background = 'rgba(245,240,234,0.04)'
                        e.currentTarget.style.borderLeft = '4px solid rgba(181,130,78,0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (i !== current) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderLeft = '4px solid transparent'
                      }
                    }}
                  >
                    <span className="text-xs font-bold w-5 text-center" style={{ color: i === current ? '#b5824e' : 'rgba(245,240,234,0.3)' }}>{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: i === current ? '#b5824e' : '#f5f0ea' }}>{t.title}</p>
                      <p className="text-xs truncate" style={{ color: 'rgba(245,240,234,0.4)' }}>{t.artist}</p>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(245,240,234,0.3)' }}>{t.duration}</span>
                    {i === current && playing && (
                      <div className="flex items-end gap-0.5 h-3">
                        {[1, 2, 3].map((b) => (
                          <motion.div key={b} className="w-0.5 rounded-full" style={{ background: '#b5824e' }}
                            animate={{ height: ['4px', '12px', '4px'] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.15 }} />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
