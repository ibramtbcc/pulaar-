interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 36, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-0 select-none ${className}`}>
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: size,
          color: '#f5f0ea',
          letterSpacing: '-0.02em',
        }}
      >
        pulaar
      </span>
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
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
