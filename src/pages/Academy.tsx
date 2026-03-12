import { useState } from 'react'
import { motion } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconBook, IconBack } from '../components/shared/Icons'
import ScrollReveal from '../components/shared/ScrollReveal'
import { useIsTablet } from '../hooks/useMediaQuery'

const lessons = {
  debutant: [
    { id: 1, title: 'Les salutations de base', status: 'completed', progress: 100, vocab: [
      { pl: 'A salminama', phon: 'a sal-mi-na-ma', fr: 'Bonjour (reponse)' },
      { pl: 'Jam waali', phon: 'djam waa-li', fr: 'Bonjour (matin)' },
      { pl: 'Jam hiiri', phon: 'djam hii-ri', fr: 'Bonsoir' },
      { pl: 'On jaaraama', phon: 'on djaa-raa-ma', fr: 'Bonjour (respect)' },
      { pl: 'A wali jam', phon: 'a wa-li djam', fr: 'Bonne nuit' },
      { pl: 'Tanaala', phon: 'ta-naa-la', fr: 'Pas de probleme' },
    ]},
    { id: 2, title: 'Se presenter', status: 'completed', progress: 100, vocab: [
      { pl: 'Ko honno wiyetee maa?', phon: 'ko hon-no wi-ye-tee maa', fr: 'Comment tu t\'appelles ?' },
      { pl: 'Miin wiyetee am ko...', phon: 'miin wi-ye-tee am ko', fr: 'Je m\'appelle...' },
      { pl: 'Hol to njokkaa?', phon: 'hol to ndjo-kaa', fr: 'D\'ou viens-tu ?' },
      { pl: 'Mi jeyaa ko...', phon: 'mi dje-yaa ko', fr: 'Je viens de...' },
    ]},
    { id: 3, title: 'La famille', status: 'in_progress', progress: 45, vocab: [
      { pl: 'Baaba', phon: 'baa-ba', fr: 'Pere' },
      { pl: 'Neene', phon: 'nee-ne', fr: 'Mere' },
      { pl: 'Mawniyo', phon: 'maw-ni-yo', fr: 'Grand frere/soeur' },
      { pl: 'Minyiyo', phon: 'min-yi-yo', fr: 'Petit frere/soeur' },
      { pl: 'Bingel', phon: 'bin-gel', fr: 'Bebe' },
      { pl: 'Taaniraawo', phon: 'taa-ni-raa-wo', fr: 'Petit-fils/fille' },
    ]},
    { id: 4, title: 'Les chiffres 1-10', status: 'locked', progress: 0, vocab: [
      { pl: "Go'o", phon: "go-o", fr: '1' }, { pl: 'Didi', phon: 'di-di', fr: '2' },
      { pl: 'Tati', phon: 'ta-ti', fr: '3' }, { pl: 'Nay', phon: 'nay', fr: '4' },
      { pl: 'Jowi', phon: 'djo-wi', fr: '5' },
    ]},
    { id: 5, title: 'Les couleurs', status: 'locked', progress: 0, vocab: [] },
    { id: 6, title: 'Le corps humain', status: 'locked', progress: 0, vocab: [] },
    { id: 7, title: 'La nourriture', status: 'locked', progress: 0, vocab: [] },
    { id: 8, title: 'Les animaux', status: 'locked', progress: 0, vocab: [] },
  ],
  intermediaire: [
    { id: 9, title: 'Conversations quotidiennes', status: 'locked', progress: 0, vocab: [] },
    { id: 10, title: 'Au marche', status: 'locked', progress: 0, vocab: [] },
    { id: 11, title: 'Les emotions', status: 'locked', progress: 0, vocab: [] },
  ],
  courant: [
    { id: 12, title: 'Proverbes et sagesse', status: 'locked', progress: 0, vocab: [] },
    { id: 13, title: 'Histoires traditionnelles', status: 'locked', progress: 0, vocab: [] },
  ],
}

type Level = 'debutant' | 'intermediaire' | 'courant'

export default function Academy() {
  const isTablet = useIsTablet()
  const [showSplash, setShowSplash] = useState(!isTablet)
  const [level, setLevel] = useState<Level>('debutant')
  const [openLesson, setOpenLesson] = useState<number | null>(null)

  const currentLessons = lessons[level]
  const lessonData = openLesson !== null ? Object.values(lessons).flat().find((l) => l.id === openLesson) : null

  if (showSplash) {
    return <SplashScreen icon={<IconBook size={120} />} title="Pulaar Academy" onComplete={() => setShowSplash(false)} />
  }

  /* ═══ LESSON DETAIL ═══ */
  if (lessonData && lessonData.vocab.length > 0) {
    return (
      <div className="min-h-screen section-padding pt-6 md:pt-12 pb-24 md:pb-16">
        <div className="content-max max-w-4xl">
          <button onClick={() => setOpenLesson(null)} className="flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity">
            <IconBack size={18} />
            <span className="text-small">Retour</span>
          </button>

          <div className="amber-line" />
          <h2 className="text-hero">Lecon {lessonData.id}</h2>
          <h3 className="text-h3 mt-2" style={{ color: '#b5824e' }}>{lessonData.title}</h3>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {lessonData.vocab.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="surface-card card-hover p-5 md:p-6">
                  <p className="text-h3">{v.pl}</p>
                  <p className="text-sm mt-1.5" style={{ color: '#b5824e' }}>{v.phon}</p>
                  <p className="text-body mt-3">{v.fr}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <button className="btn-primary w-full md:w-auto mt-10">
            Terminer la lecon (+15 pts)
          </button>
        </div>
      </div>
    )
  }

  /* ═══ LESSON LIST ═══ */
  return (
    <div className="min-h-screen">
      <section className="section-padding pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="content-max">
          <div className="amber-line" />
          <h1 className="text-hero">Pulaar Academy</h1>
          <p className="text-body mt-3 max-w-lg">Apprends le pulaar a ton rythme, du debutant au courant.</p>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-16">
        <div className="content-max">
          {/* Level tabs */}
          <div className="flex gap-2 mb-8">
            {(['debutant', 'intermediaire', 'courant'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className="px-5 py-3 rounded-xl transition-all text-sm font-semibold capitalize"
                style={{
                  background: level === l ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
                  border: level === l ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
                  color: level === l ? '#b5824e' : 'rgba(245,240,234,0.5)',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {currentLessons.map((lesson, i) => (
              <ScrollReveal key={lesson.id} delay={i * 0.06}>
                <button
                  onClick={() => lesson.status !== 'locked' && setOpenLesson(lesson.id)}
                  disabled={lesson.status === 'locked'}
                  className="surface-card card-hover w-full p-5 md:p-6 text-left group"
                  style={{ opacity: lesson.status === 'locked' ? 0.4 : 1 }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: lesson.status === 'completed' ? 'rgba(74,222,128,0.1)' : 'rgba(181,130,78,0.08)',
                        color: lesson.status === 'completed' ? '#4ade80' : '#b5824e',
                      }}
                    >
                      {lesson.status === 'completed' ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      ) : lesson.status === 'locked' ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,234,0.3)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      ) : String(lesson.id)}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs" style={{ color: 'rgba(245,240,234,0.4)', fontWeight: 500 }}>Lecon {lesson.id}</p>
                      <h3 className="text-[15px] md:text-[16px] font-semibold mt-1 group-hover:text-[#b5824e] transition-colors" style={{ color: '#f5f0ea' }}>
                        {lesson.title}
                      </h3>
                      {lesson.progress > 0 && lesson.progress < 100 && (
                        <div className="mt-3 rounded-full overflow-hidden h-1.5" style={{ background: 'rgba(245,240,234,0.06)' }}>
                          <div className="h-full rounded-full" style={{ width: `${lesson.progress}%`, background: 'linear-gradient(90deg, #b5824e, #c49a62)' }} />
                        </div>
                      )}
                    </div>
                    {lesson.status !== 'locked' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,234,0.2)" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    )}
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
