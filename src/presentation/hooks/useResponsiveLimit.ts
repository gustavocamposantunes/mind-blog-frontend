import { useMediaQuery } from 'react-responsive'

export function useResponsiveLimit(): number {
  const isSmall = useMediaQuery({ maxWidth: 1024 })
  const isMedium = useMediaQuery({ maxWidth: 1279 })

  if (isSmall) return 5
  if (isMedium) return 10
  return 12
}
