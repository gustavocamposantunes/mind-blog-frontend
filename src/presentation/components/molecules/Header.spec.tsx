import { Link, MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { Header } from './Header'

import { cleanup, fireEvent, render, screen, waitFor } from '@/presentation/test/test-utils'

describe('Header', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should open the mobile menu and show the main links', async () => {
    render(
      <MemoryRouter>
        <Header>
          <Link to="/login">Entrar</Link>
        </Header>
      </MemoryRouter>,
    )

    const mobileMenuTrigger = screen.getByTestId('mobile-menu-trigger')
    fireEvent.click(mobileMenuTrigger)

    await waitFor(() => {
      expect(mobileMenuTrigger).toHaveAttribute('aria-expanded', 'true')
    })

    const mobileMenuPanel = await screen.findByTestId('mobile-menu-panel')

    expect(mobileMenuPanel).toHaveTextContent('Home')
    expect(mobileMenuPanel).toHaveTextContent('Artigos')
    expect(mobileMenuPanel).toHaveTextContent('Entrar')
  })

  it('should keep the desktop links rendered', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Artigos')).toBeInTheDocument()
  })
})