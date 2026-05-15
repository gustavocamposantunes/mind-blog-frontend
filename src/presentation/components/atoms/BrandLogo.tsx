import type { ReactNode } from 'react'

import { useThemeStore } from '@/presentation/store/theme-store'

type BrandLogoProps = {
  className?: string
  tagline?: ReactNode
}

export const BrandLogo = ({ className = '', tagline }: BrandLogoProps) => {
  const theme = useThemeStore((state) => state.theme)
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'

  return (
    <div className={`flex flex-col items-start ${className}`.trim()}>
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
