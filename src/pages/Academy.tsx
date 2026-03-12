import { useState } from 'react'
import { motion } from 'framer-motion'
import SplashScreen from '../components/shared/SplashScreen'
import { IconBook, IconBack } from '../components/shared/Icons'

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
      { pl: "Go'o", phon: "go-o", fr: '1' },
      { pl: 'Didi', phon: 'di-di', fr: '2' },
      { pl: 'Tati', phon: 'ta-ti', fr: '3' },
      { pl: 'Nay', phon: 'nay', fr: '4' },
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
  const [showSplash, setShowSplash] = useState(true)
  const [level, setLevel] = useState<Level>('debutant')
  const [openLesson, setOpenLesson] = useState<number | null>(null)

  const currentLessons = lessons[level]
  const lessonData = openLesson !== null
    ? Object.values(lessons).flat().find((l) => l.id === openLesson)
    : null

  if (showSplash) {
    return (
      <SplashScreen
        icon={<IconBook size={120} />}
        title="Pulaar Academy"
        onComplete={() => setShowSplash(false)}
      />
    )
  }

  if (lessonData && lessonData.vocab.length > 0) {
    return (
      <div className="min-h-screen px-5 pt-6 pb-24">
        <button onClick={() => setOpenLesson(null)} className="flex items-center gap-2 mb-6">
          <IconBack size={18} />
          <span style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)' }}>Retour</span>
        </button>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#f5f0ea' }}>
          Lecon {lessonData.id}
        </h2>
        <h3 style={{ fontSize: 16, color: '#b5824e', fontWeight: 600, marginTop: 4 }}>
          {lessonData.title}
        </h3>

        <div className="mt-8 flex flex-col gap-3">
          {lessonData.vocab.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-4"
              style={{
                background: '#0c0b09',
                border: '0.5px solid #161410',
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 700, color: '#f5f0ea' }}>{v.pl}</p>
              <p style={{ fontSize: 13, color: '#b5824e', marginTop: 2 }}>{v.phon}</p>
              <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginTop: 6 }}>{v.fr}</p>
            </motion.div>
          ))}
        </div>

        <button
          className="w-full py-4 rounded-2xl font-semibold mt-8 transition-transform active:scale-[0.97]"
          style={{
            background: 'linear-gradient(135deg, #b5824e, #9a6d3c)',
            color: '#050505',
            fontSize: 15,
          }}
        >
          Terminer la lecon (+15 pts)
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-5 pt-6 pb-24">
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f5f0ea', marginBottom: 4 }}>
        Pulaar Academy
      </h1>
      <p style={{ fontSize: 14, color: 'rgba(245,240,234,0.5)', marginBottom: 20 }}>
        Apprends le pulaar a ton rythme
      </p>

      {/* Level tabs */}
      <div className="flex gap-2 mb-6">
        {(['debutant', 'intermediaire', 'courant'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className="flex-1 py-3 rounded-xl transition-all"
            style={{
              background: level === l ? 'rgba(181,130,78,0.15)' : 'rgba(245,240,234,0.04)',
              border: level === l ? '1px solid rgba(181,130,78,0.3)' : '0.5px solid rgba(245,240,234,0.06)',
              color: level === l ? '#b5824e' : 'rgba(245,240,234,0.5)',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'capitalize' as const,
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Lessons */}
      <div className="flex flex-col gap-3">
        {currentLessons.map((lesson, i) => (
          <motion.button
            key={lesson.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => lesson.status !== 'locked' && setOpenLesson(lesson.id)}
            disabled={lesson.status === 'locked'}
            className="rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
            style={{
              background: '#0c0b09',
              border: '0.5px solid #161410',
              opacity: lesson.status === 'locked' ? 0.4 : 1,
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: lesson.status === 'completed' ? 'rgba(74,222,128,0.1)' : 'rgba(181,130,78,0.08)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: lesson.status === 'completed' ? '#4ade80' : '#b5824e',
                }}
              >
                {lesson.status === 'completed' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                ) : lesson.status === 'locked' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,234,0.3)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                ) : (
                  String(lesson.id)
                )}
              </span>
              <div className="flex-1">
                <p style={{ fontSize: 11, color: 'rgba(245,240,234,0.4)', fontWeight: 500 }}>
                  Lecon {lesson.id}
                </p>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f5f0ea', marginTop: 2 }}>
                  {lesson.title}
                </h3>
                {lesson.progress > 0 && lesson.progress < 100 && (
                  <div className="mt-2 rounded-full overflow-hidden h-1" style={{ background: 'rgba(245,240,234,0.06)' }}>
                    <div className="h-full rounded-full" style={{
                      width: `${lesson.progress}%`,
                      background: 'linear-gradient(90deg, #b5824e, #c49a62)',
                    }} />
                  </div>
                )}
              </div>
              {lesson.status !== 'locked' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,234,0.2)" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
