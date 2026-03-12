// SVG silhouette icons — ivoire (#f5f0ea), sans ombre, sans couleur
const c = '#f5f0ea'

export function IconBook({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function IconQuestion({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.5"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="0.5" fill={c}/>
    </svg>
  )
}

export function IconBaobab({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2c-1 0-2 1-2 2v3c-2-1-4 0-4 2 0 1.5 1 2.5 2 3-1.5.5-3 2-3 4 0 2.5 2 4 5 4h4c3 0 5-1.5 5-4 0-2-1.5-3.5-3-4 1-.5 2-1.5 2-3 0-2-2-3-4-2V4c0-1-1-2-2-2zm-1 16v4h2v-4"/>
    </svg>
  )
}

export function IconStars({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2l1.5 3.5L17 7l-3.5 1.5L12 12l-1.5-3.5L7 7l3.5-1.5L12 2z"/>
      <path d="M5 13l1 2.5L9 17l-3 1.5L5 21l-1-2.5L1 17l3-1.5L5 13z" opacity="0.7"/>
      <path d="M19 13l1 2.5 3 1.5-3 1.5-1 2.5-1-2.5-3-1.5 3-1.5 1-2.5z" opacity="0.7"/>
    </svg>
  )
}

export function IconRadio({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="3"/>
      <circle cx="8" cy="14" r="3"/>
      <line x1="14" y1="11" x2="20" y2="11"/>
      <line x1="14" y1="14" x2="20" y2="14"/>
      <line x1="14" y1="17" x2="18" y2="17"/>
      <path d="M8 2L18 7"/>
    </svg>
  )
}

export function IconPot({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 10h16v8a3 3 0 01-3 3H7a3 3 0 01-3-3v-8z" fill="none"/>
      <path d="M2 10h20"/>
      <path d="M8 10V7a4 4 0 018 0v3"/>
      <path d="M9 4c0-1 .5-2 1.5-2M15 4c0-1-.5-2-1.5-2"/>
    </svg>
  )
}

export function IconGlobe({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <ellipse cx="12" cy="12" rx="4" ry="10"/>
      <path d="M2 12h20"/>
      <path d="M4.5 7h15M4.5 17h15"/>
    </svg>
  )
}

export function IconZebu({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <path d="M4 17c0-3 2-5 4-6l1-4c.5-2 2-3 3-3s2.5 1 3 3l1 4c2 1 4 3 4 6v2H4v-2zm4-9l-2-3M16 8l2-3M10 19v2M14 19v2"/>
    </svg>
  )
}

export function IconHome({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-8 9 8"/>
      <path d="M5 10v9a1 1 0 001 1h3v-5h6v5h3a1 1 0 001-1v-9"/>
    </svg>
  )
}

export function IconMore({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <circle cx="5" cy="12" r="2"/>
      <circle cx="12" cy="12" r="2"/>
      <circle cx="19" cy="12" r="2"/>
    </svg>
  )
}

export function IconHeart({ size = 24, filled = false }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? c : 'none'} stroke={c} strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  )
}

export function IconPlay({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

export function IconPause({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <rect x="6" y="4" width="4" height="16" rx="1"/>
      <rect x="14" y="4" width="4" height="16" rx="1"/>
    </svg>
  )
}

export function IconSkipNext({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <path d="M5 4l10 8-10 8V4zM19 5v14"/>
    </svg>
  )
}

export function IconSkipPrev({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={c}>
      <path d="M19 20L9 12l10-8v16zM5 19V5"/>
    </svg>
  )
}

export function IconBack({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

export function IconShare({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
      <polyline points="16 6 12 2 8 6"/>
      <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  )
}

export function IconUser({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

export function IconSettings({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  )
}

export function IconMale({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill={c} opacity="0.9">
      <circle cx="40" cy="22" r="12"/>
      <path d="M20 70v-8a20 20 0 0140 0v8"/>
    </svg>
  )
}

export function IconFemale({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill={c} opacity="0.9">
      <circle cx="40" cy="22" r="12"/>
      <path d="M22 70l8-28h20l8 28"/>
      <path d="M28 42a12 12 0 0124 0" fill="none" stroke={c} strokeWidth="2"/>
    </svg>
  )
}
