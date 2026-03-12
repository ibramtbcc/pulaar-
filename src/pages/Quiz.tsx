import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { categories, scorePhrases } from '../data/quizQuestions'
import { IconBack } from '../components/shared/Icons'

type Screen = 'categories' | 'question' | 'result'

export default function Quiz() {
  const navigate = useNavigate()
  const [screen, setScreen] = useState<Screen>('categories')
  const [catIndex, setCatIndex] = useState(0)
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [timer, setTimer] = useState(15)
  const timerRef = useRef<ReturnType<typeof setInterval>>()
  const startTimeRef = useRef(0)

  const cat = categories[catIndex]
  const question = cat?.questions[qIndex]
  const total = cat?.questions.length ?? 25
  const labels = ['A', 'B', 'C', 'D']

  const resetTimer = useCallback(() => {
    setTimer(15)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          setAnswered(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    startTimeRef.current = Date.now()
  }, [])

  const startCategory = (idx: number) => {
    setCatIndex(idx)
    setQIndex(0)
    setScore(0)
    setAnswered(false)
    setSelectedIdx(null)
    setScreen('question')
    resetTimer()
  }

  const pickAnswer = (idx: number) => {
    if (answered) return
    const elapsed = Date.now() - startTimeRef.current
    if (elapsed < 2000) return // anti-triche
    setSelectedIdx(idx)
    setAnswered(true)
    if (timerRef.current) clearInterval(timerRef.current)
    if (idx === question.a) setScore((s) => s + 1)
    setTimeout(() => {
      if (qIndex + 1 < total) {
        setQIndex((q) => q + 1)
        setAnswered(false)
        setSelectedIdx(null)
        resetTimer()
      } else {
        setScreen('result')
      }
    }, 1100)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const getPhrase = () => {
    return scorePhrases.find((p) => score >= p.min && score <= p.max)?.title ?? ''
  }

  if (screen === 'categories') {
    return (
      <div className="min-h-screen px-5 pt-6 pb-24">
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f5f0ea', marginBottom: 4 }}>
          Pulaar Quiz
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginBottom: 24 }}>
          Teste tes connaissances sur la culture peule
        </p>
        <div className="flex flex-col gap-3">
          {categories.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => startCategory(i)}
              className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all active:scale-[0.98]"
              style={{
                background: '#0c0b09',
                border: '0.5px solid #161410',
                boxShadow: '0 1px 0 rgba(255,255,255,0.008) inset',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(181,130,78,0.08)' }}
              >
                <span style={{ fontSize: 24, color: '#b5824e', fontWeight: 700 }}>
                  {c.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f5f0ea' }}>{c.name}</h3>
                <p style={{ fontSize: 13, color: 'rgba(245,240,234,0.4)', marginTop: 2 }}>
                  {c.namePl} · {c.questions.length} questions
                </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,234,0.3)" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  if (screen === 'result') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm rounded-3xl p-8 text-center relative overflow-hidden"
          style={{
            background: '#0c0b09',
            border: '1px solid rgba(181,130,78,0.15)',
            boxShadow: '0 0 60px rgba(181,130,78,0.1)',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: 14, color: '#b5824e', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}
          >
            {cat.name}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScoreCounter target={score} total={total} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ fontSize: 18, fontWeight: 600, color: '#f5f0ea', marginTop: 16 }}
          >
            {getPhrase()}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex gap-3 mt-8"
          >
            <button
              onClick={() => startCategory(catIndex)}
              className="flex-1 py-3.5 rounded-xl font-semibold transition-transform active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #b5824e, #9a6d3c)',
                color: '#050505',
                fontSize: 14,
              }}
            >
              Rejouer
            </button>
            <button
              onClick={() => setScreen('categories')}
              className="flex-1 py-3.5 rounded-xl font-semibold transition-transform active:scale-[0.97]"
              style={{
                background: 'rgba(245,240,234,0.06)',
                border: '1px solid rgba(245,240,234,0.1)',
                color: '#f5f0ea',
                fontSize: 14,
              }}
            >
              Categories
            </button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // Question screen
  return (
    <div className="min-h-screen flex flex-col px-5 pt-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setScreen('categories')} className="p-2 -ml-2">
          <IconBack size={20} />
        </button>
        <span style={{ fontSize: 13, color: 'rgba(245,240,234,0.5)', fontWeight: 500 }}>
          {qIndex + 1} / {total}
        </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: timer <= 5 ? '#ef4444' : '#b5824e' }}>
          {timer}s
        </span>
      </div>

      {/* Timer bar */}
      <div className="rounded-full overflow-hidden h-1 mb-8" style={{ background: 'rgba(245,240,234,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 linear"
          style={{
            width: `${(timer / 15) * 100}%`,
            background: timer <= 5
              ? 'linear-gradient(90deg, #ef4444, #dc2626)'
              : timer <= 10
              ? 'linear-gradient(90deg, #f59e0b, #d97706)'
              : 'linear-gradient(90deg, #b5824e, #c49a62)',
          }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col"
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f5f0ea', lineHeight: 1.4, marginBottom: 32 }}>
            {question.q}
          </h2>

          <div className="flex flex-col gap-3">
            {question.r.map((opt, i) => {
              let bg = 'rgba(245,240,234,0.04)'
              let border = '0.5px solid rgba(245,240,234,0.08)'
              if (answered && i === question.a) {
                bg = 'rgba(74,222,128,0.12)'
                border = '1px solid rgba(74,222,128,0.4)'
              } else if (answered && i === selectedIdx && i !== question.a) {
                bg = 'rgba(239,68,68,0.12)'
                border = '1px solid rgba(239,68,68,0.4)'
              }

              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => pickAnswer(i)}
                  disabled={answered}
                  className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                  style={{ background: bg, border }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: answered && i === question.a
                        ? 'rgba(74,222,128,0.2)'
                        : answered && i === selectedIdx
                        ? 'rgba(239,68,68,0.2)'
                        : 'rgba(245,240,234,0.06)',
                      fontSize: 14,
                      fontWeight: 700,
                      color: answered && i === question.a ? '#4ade80' : answered && i === selectedIdx ? '#ef4444' : '#b5824e',
                    }}
                  >
                    {labels[i]}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#f5f0ea' }}>{opt}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ScoreCounter({ target, total }: { target: number; total: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const dur = 1800
    function animate(now: number) {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = `${Math.round(eased * target)}/${total}`
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, total])
  return (
    <span ref={ref} style={{ fontSize: 64, fontWeight: 900, color: '#f5f0ea', lineHeight: 1 }}>
      0/{total}
    </span>
  )
}
