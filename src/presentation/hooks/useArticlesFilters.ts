import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useResponsiveLimit } from './useResponsiveLimit'

type ViewMode = 'grid' | 'list'

export const useArticlesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const responsiveLimit = useResponsiveLimit()

  const currentPage = Number(searchParams.get('page')) || 1
  const currentLimit = responsiveLimit
  const currentTitle = searchParams.get('title') || ''
  const currentCategory = searchParams.get('category') || ''
  const currentView = (searchParams.get('view') || 'grid') as ViewMode

  const updateFilters = useCallback(
    (filters: {
      page?: number
      title?: string
      category?: string
      view?: ViewMode
    }) => {
      const newParams = new URLSearchParams(searchParams)

      if (filters.page !== undefined) {
        newParams.set('page', String(filters.page))
      }
      if (filters.title !== undefined) {
        if (filters.title === '') {
          newParams.delete('title')
        } else {
          newParams.set('title', filters.title)
        }
      }
      if (filters.category !== undefined) {
        if (filters.category === '') {
          newParams.delete('category')
        } else {
          newParams.set('category', filters.category)
        }
      }
      if (filters.view !== undefined) {
        newParams.set('view', filters.view)
      }

      // Always ensure we have page and limit
      if (!newParams.has('page')) {
        newParams.set('page', '1')
      }
      newParams.set('limit', String(currentLimit))

      setSearchParams(newParams)
    },
    [searchParams, setSearchParams, currentLimit],
  )

  const resetFilters = useCallback(() => {
    setSearchParams({
      page: '1',
      limit: String(currentLimit),
      view: 'grid',
    })
  }, [setSearchParams, currentLimit])

  const pageParams = useMemo(
    () => ({
      page: currentPage,
      limit: currentLimit,
      ...(currentTitle && { title: currentTitle }),
      ...(currentCategory && { category: currentCategory }),
    }),
    [currentPage, currentLimit, currentTitle, currentCategory],
  )

  return {
    currentPage,
    currentLimit,
    currentTitle,
    currentCategory,
    currentView,
    updateFilters,
    resetFilters,
    pageParams,
  }
}
