import type { ReactNode } from 'react'

import { useThemeStore } from '@/presentation/store/theme-store'

type BrandLogoProps = {
  className?: string
  tagline?: ReactNode
  centered?: boolean
}

export const BrandLogo = ({
  className = '',
  tagline,
  centered = false,
}: BrandLogoProps) => {
  const theme = useThemeStore((state) => state.theme)
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'
  const alignmentClass = centered ? 'items-center text-center' : 'items-start'

  return (
    <div className={`flex flex-col ${alignmentClass} ${className}`.trim()}>
      <span
        className={`irish-grove-font ${textColor} leading-none tracking-tight`}
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        &lt;M/&gt;
      </span>
      {tagline ? (
        <span className={`mt-2 text-sm ${textColor}/80`}>{tagline}</span>
      ) : null}
    </div>
  )
}
