import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { UserDropdownMenu } from './UserDropDownMenu'

import { cleanup, render, screen } from '@/presentation/test/test-utils'

const mockUser = {
  fullName: 'John Doe',
  image: 'avatar.png',
}

describe('UserDropDownMenu', () => {
  beforeEach(() => {
    cleanup()
  })

  const makeSut = (props = {}) => {
    return render(
      <UserDropdownMenu
        user={mockUser}
        onProfileNavigate={vi.fn()}
        onSettingsNavigate={vi.fn()}
        onLogout={vi.fn()}
        {...props}
      />,
    )
  }

  it('renders user name and avatar', async () => {
    makeSut()
    // open dropdown to reveal name in header
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    expect(
      await screen.findByText(mockUser.fullName),
    ).toBeInTheDocument()

    const avatarFallbacks = screen.getAllByText('JD')
    expect(avatarFallbacks.length).toBeGreaterThanOrEqual(1)
  })

  it('opens dropdown on trigger click', async () => {
    makeSut()
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    expect(await screen.findByText('Dashboard')).toBeInTheDocument()
    expect(await screen.findByText('Sair')).toBeInTheDocument()
  })

  it('calls onProfileNavigate when "Dashboard" is clicked', async () => {
    const onProfileNavigate = vi.fn()
    makeSut({ onProfileNavigate })
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    await userEvent.click(await screen.findByText('Dashboard'))
    expect(onProfileNavigate).toHaveBeenCalled()
  })

  it('calls onSettingsNavigate when "Configurações" is clicked', async () => {
    const onSettingsNavigate = vi.fn()
    makeSut({ onSettingsNavigate })
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    await userEvent.click(await screen.findByText('Configurações'))
    expect(onSettingsNavigate).toHaveBeenCalled()
  })

  it('calls onLogout when "Sair" is clicked', async () => {
    const onLogout = vi.fn()
    makeSut({ onLogout })
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    await userEvent.click(await screen.findByText('Sair'))
    expect(onLogout).toHaveBeenCalled()
  })
})
