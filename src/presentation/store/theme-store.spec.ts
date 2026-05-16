import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useThemeStore } from './theme-store'

describe('useThemeStore', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    useThemeStore.setState({ theme: 'dark' })
    vi.restoreAllMocks()
  })

  it('should persist and apply the selected theme', () => {
    useThemeStore.getState().setTheme('light')

    expect(useThemeStore.getState().theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')

    useThemeStore.getState().setTheme('dark')

    expect(useThemeStore.getState().theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('should toggle between light and dark themes', () => {
    useThemeStore.getState().toggle()

    expect(useThemeStore.getState().theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')

    useThemeStore.getState().toggle()

    expect(useThemeStore.getState().theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('should hydrate from storage and fallback to dark when empty', () => {
    localStorage.setItem('theme', 'light')

    useThemeStore.getState().hydrate()

    expect(useThemeStore.getState().theme).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')

    localStorage.removeItem('theme')
    useThemeStore.getState().hydrate()

    expect(useThemeStore.getState().theme).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('should ignore storage failures', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('setItem failed')
    })
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('getItem failed')
    })

    useThemeStore.getState().setTheme('light')
    useThemeStore.getState().toggle()
    useThemeStore.getState().hydrate()

    expect(useThemeStore.getState().theme).toBe('dark')
  })

  it('should skip DOM updates when document is unavailable', () => {
    const originalDocument = globalThis.document

    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: undefined,
    })

    try {
      useThemeStore.getState().setTheme('light')
      useThemeStore.getState().toggle()
      useThemeStore.getState().hydrate()
    } finally {
      Object.defineProperty(globalThis, 'document', {
        configurable: true,
        value: originalDocument,
      })
    }

    expect(useThemeStore.getState().theme).toBe('dark')
  })
})