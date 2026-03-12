import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, scorePhrases } from '../data/quizQuestions'
import { IconBack } from '../components/shared/Icons'
import ScrollReveal from '../components/shared/ScrollReveal'

type Screen = 'categories' | 'question' | 'result'

export default function Quiz() {
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
    if (elapsed < 2000) return
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
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const getPhrase = () => scorePhrases.find((p) => score >= p.min && score <= p.max)?.title ?? ''

  /* ═══ CATEGORIES ═══ */
  if (screen === 'categories') {
    return (
      <div className="min-h-screen">
        {/* Hero */}
        <section className="section-padding pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="content-max">
            <div className="amber-line" />
            <h1 className="text-hero">Pulaar Quiz</h1>
            <p className="text-body mt-3 max-w-lg">
              Teste tes connaissances sur la culture, la langue, la cuisine et les valeurs du peuple Peul.
            </p>
          </div>
        </section>

        <section className="section-padding pb-24 md:pb-16">
          <div className="content-max">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {categories.map((c, i) => (
                <ScrollReveal key={c.id} delay={i * 0.08}>
                  <button
                    onClick={() => startCategory(i)}
                    className="surface-card card-hover w-full flex items-center gap-5 p-6 md:p-7 text-left group"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(181,130,78,0.08)' }}
                    >
                      <span className="text-2xl font-bold" style={{ color: '#b5824e' }}>
                        {c.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-h3 group-hover:text-[#b5824e] transition-colors duration-300">{c.name}</h3>
                      <p className="text-small mt-1">{c.namePl} · {c.questions.length} questions</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,234,0.2)" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  /* ═══ RESULT ═══ */
  if (screen === 'result') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center section-padding">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
          style={{
            background: '#0c0b09',
            border: '1px solid rgba(181,130,78,0.15)',
            boxShadow: '0 0 80px rgba(181,130,78,0.08)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] opacity-20"
            style={{ background: 'radial-gradient(ellipse, #b5824e, transparent 70%)' }} />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-label relative z-10"
          >
            {cat.name}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <ScoreCounter target={score} total={total} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-h3 mt-4 relative z-10"
          >
            {getPhrase()}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex gap-3 mt-8 relative z-10"
          >
            <button onClick={() => startCategory(catIndex)} className="btn-primary flex-1">Rejouer</button>
            <button onClick={() => setScreen('categories')} className="btn-outline flex-1">Categories</button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  /* ═══ QUESTION ═══ */
  return (
    <div className="min-h-screen flex flex-col section-padding pt-4 pb-24 md:pb-8">
      <div className="content-max w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen('categories')} className="p-2 -ml-2 hover:opacity-70 transition-opacity">
            <IconBack size={20} />
          </button>
          <span className="text-small font-medium">{qIndex + 1} / {total}</span>
          <span className="text-sm font-bold" style={{ color: timer <= 5 ? '#ef4444' : '#b5824e' }}>
            {timer}s
          </span>
        </div>

        {/* Timer bar */}
        <div className="rounded-full overflow-hidden h-1 mb-8" style={{ background: 'rgba(245,240,234,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000 linear"
            style={{
              width: `${(timer / 15) * 100}%`,
              background: timer <= 5 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : timer <= 10 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #b5824e, #c49a62)',
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
            <h2 className="text-h2 mb-8 md:mb-10" style={{ lineHeight: 1.4 }}>
              {question.q}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.r.map((opt, i) => {
                let bg = 'rgba(245,240,234,0.04)'
                let border = '0.5px solid rgba(245,240,234,0.08)'
                if (answered && i === question.a) {
                  bg = 'rgba(74,222,128,0.12)'; border = '1px solid rgba(74,222,128,0.4)'
                } else if (answered && i === selectedIdx && i !== question.a) {
                  bg = 'rgba(239,68,68,0.12)'; border = '1px solid rgba(239,68,68,0.4)'
                }
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => pickAnswer(i)}
                    disabled={answered}
                    className="flex items-center gap-4 p-4 md:p-5 rounded-2xl text-left transition-all hover:bg-[rgba(245,240,234,0.06)] active:scale-[0.98]"
                    style={{ background: bg, border }}
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{
                        background: answered && i === question.a ? 'rgba(74,222,128,0.2)' : answered && i === selectedIdx ? 'rgba(239,68,68,0.2)' : 'rgba(245,240,234,0.06)',
                        color: answered && i === question.a ? '#4ade80' : answered && i === selectedIdx ? '#ef4444' : '#b5824e',
                      }}
                    >
                      {labels[i]}
                    </span>
                    <span className="text-[15px] font-medium" style={{ color: '#f5f0ea' }}>{opt}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
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
  return <span ref={ref} className="block text-6xl md:text-7xl font-black mt-4" style={{ color: '#f5f0ea', lineHeight: 1 }}>0/{total}</span>
}
