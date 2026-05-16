import { act, renderHook } from '@testing-library/react'
import { createElement, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useArticlesFilters } from './useArticlesFilters'

const setSearchParamsMock = vi.fn()
let currentSearchParams = new URLSearchParams('limit=10')

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useSearchParams: () => [currentSearchParams, setSearchParamsMock],
}))

vi.mock('./useResponsiveLimit', () => ({
  useResponsiveLimit: () => 10,
}))

describe('useArticlesFilters', () => {
  beforeEach(() => {
    currentSearchParams = new URLSearchParams('limit=10')
    setSearchParamsMock.mockClear()
  })

  it('should default page to 1 when it is missing from the current query', () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(MemoryRouter, null, children)

    const { result } = renderHook(() => useArticlesFilters(), { wrapper })

    act(() => {
      result.current.updateFilters({ title: 'react' })
    })

    const [updatedParams] = vi.mocked(setSearchParamsMock).mock.calls[0]

    expect(updatedParams).toBeInstanceOf(URLSearchParams)
    expect((updatedParams as URLSearchParams).get('page')).toBe('1')
    expect((updatedParams as URLSearchParams).get('limit')).toBe('10')
    expect((updatedParams as URLSearchParams).get('title')).toBe('react')
  })
})
