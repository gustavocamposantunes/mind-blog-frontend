import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useResponsiveLimit } from './useResponsiveLimit'

export const useResponsivePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const responsiveLimit = useResponsiveLimit()

  const currentPage = Number(searchParams.get('page'))
  const currentLimit = responsiveLimit

  useEffect(() => {
    const currentSearchPage = searchParams.get('page')
    const currentSearchLimit = searchParams.get('limit')

    const shouldUpdate =
      currentSearchPage !== String(currentPage) ||
      currentSearchLimit !== String(currentLimit)

    if (shouldUpdate) {
      setSearchParams({
        page: String(currentPage),
        limit: String(currentLimit),
      })
    }
  }, [currentPage, currentLimit, setSearchParams, searchParams])
  return {
    currentPage,
    currentLimit,
    setSearchParams,
  }
}
