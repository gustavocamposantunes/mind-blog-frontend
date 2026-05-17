import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { UserDropdownMenu } from './UserDropDownMenu'

import { cleanup, render, screen } from '@/presentation/test/test-utils'

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
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
        onLogout={vi.fn()}
        {...props}
      />,
    )
  }

  it('renders user name and avatar', async () => {
    makeSut()
    expect(
      screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`),
    ).toBeInTheDocument()

    const avatarFallback = screen.getByText('JD')
    expect(avatarFallback).toBeInTheDocument()
  })

  it('opens dropdown on trigger click', async () => {
    makeSut()
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    expect(await screen.findByText('Dashboard')).toBeInTheDocument()
    expect(await screen.findByText('Desconectar')).toBeInTheDocument()
  })

  it('calls onProfileNavigate when "Dashboard" is clicked', async () => {
    const onProfileNavigate = vi.fn()
    makeSut({ onProfileNavigate })
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    await userEvent.click(await screen.findByText('Dashboard'))
    expect(onProfileNavigate).toHaveBeenCalled()
  })

  it('calls onLogout when "Desconectar" is clicked', async () => {
    const onLogout = vi.fn()
    makeSut({ onLogout })
    await userEvent.click(screen.getByTestId('dropdown-trigger'))
    await userEvent.click(await screen.findByText('Desconectar'))
    expect(onLogout).toHaveBeenCalled()
  })
})
