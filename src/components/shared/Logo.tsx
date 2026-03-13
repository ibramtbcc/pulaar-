interface LogoProps {
  size?: number
  className?: string
  shimmer?: boolean
}

export default function Logo({ size = 36, className = '', shimmer = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-0 select-none ${className}`}>
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: size,
          color: '#f5f0ea',
          letterSpacing: '-0.02em',
          ...(shimmer ? {
            backgroundImage: 'linear-gradient(110deg, #f5f0ea 35%, #ffffff 50%, #f5f0ea 65%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s ease-in-out infinite',
          } : {}),
        }}
      >
        pulaar
      </span>
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: size,
          color: '#b5824e',
          letterSpacing: '-0.02em',
        }}
      >
        +
      </span>
    </div>
  )
}
