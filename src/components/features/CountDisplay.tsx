interface CountDisplayProps {
  current: number
  target: number
  size?: 'sm' | 'md' | 'lg'
}

export default function CountDisplay({ current, target, size = 'lg' }: CountDisplayProps) {
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl md:text-9xl',
  }

  const targetSizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl md:text-6xl',
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4">
        <span className={`${sizeClasses[size]} font-bold text-action-amber transition-all duration-300`}>
          {current}
        </span>
        <span className={`${targetSizeClasses[size]} font-semibold text-dark-charcoal/50`}>
          / {target}
        </span>
      </div>
    </div>
  )
}
