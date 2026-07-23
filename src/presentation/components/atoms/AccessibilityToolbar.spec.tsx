import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AccessibilityToolbar } from './AccessibilityToolbar'

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@/presentation/test/test-utils'

describe('AccessibilityToolbar', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
    document.documentElement.className = ''
    document.body.innerHTML = ''
    Object.defineProperty(window, 'VLibras', {
      configurable: true,
      value: undefined,
    })
  })

  it('should render the accessibility actions', () => {
    render(<AccessibilityToolbar />)

    expect(
      screen.getByRole('complementary', {
        name: 'Barra de acessibilidade',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText('Modo de visualizacao para daltonismo'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ativar VLibras' }),
    ).toBeInTheDocument()
  })

  it('should apply and persist the selected color vision mode', () => {
    render(<AccessibilityToolbar />)

    fireEvent.change(
      screen.getByLabelText('Modo de visualizacao para daltonismo'),
      {
        target: { value: 'protanopia' },
      },
    )

    expect(localStorage.getItem('mind-blog-color-vision-mode')).toBe(
      'protanopia',
    )
    expect(document.documentElement).toHaveClass(
      'accessibility-color-protanopia',
    )
  })

  it('should restore a persisted color vision mode', () => {
    localStorage.setItem('mind-blog-color-vision-mode', 'monochrome')

    render(<AccessibilityToolbar />)

    expect(
      screen.getByLabelText('Modo de visualizacao para daltonismo'),
    ).toHaveValue('monochrome')
    expect(document.documentElement).toHaveClass(
      'accessibility-color-monochrome',
    )
  })

  it('should load the VLibras widget script once', () => {
    render(<AccessibilityToolbar />)

    fireEvent.click(screen.getByRole('button', { name: 'Ativar VLibras' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ativar VLibras' }))

    const scripts = document.querySelectorAll(
      'script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]',
    )

    expect(scripts).toHaveLength(1)
    expect(document.querySelector('[vw]')).toBeInTheDocument()
  })

  it('should initialize and open the VLibras widget when the script loads', () => {
    render(<AccessibilityToolbar />)

    fireEvent.click(screen.getByRole('button', { name: 'Ativar VLibras' }))

    const widget = vi.fn()
    Object.defineProperty(window, 'VLibras', {
      configurable: true,
      value: { Widget: widget },
    })

    const accessButton =
      document.querySelector<HTMLElement>('[vw-access-button]')
    const accessButtonClick = vi.spyOn(accessButton!, 'click')
    const script = document.querySelector<HTMLScriptElement>(
      'script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]',
    )

    script?.dispatchEvent(new Event('load'))

    expect(widget).toHaveBeenCalledWith('https://vlibras.gov.br/app')
    expect(accessButtonClick).toHaveBeenCalled()
  })
})
