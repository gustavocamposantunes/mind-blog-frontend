import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'

import { FavoriteButton } from './FavoriteButton'

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@/presentation/test/test-utils'

type SutTypes = {
  mockFavoriteById: Mock
}

const makeSut = (
  isFavorited = false,
  isCurrentUserAndLoggedIn = true,
): SutTypes => {
  const mockFavoriteById = vi
    .fn()
    .mockImplementation((_id: number, favorited: () => boolean) => {
      favorited()
    })
  render(
    <FavoriteButton
      isFavorited={isFavorited}
      favoriteById={mockFavoriteById}
      isCurrentUserAndLoggedIn={isCurrentUserAndLoggedIn}
    />,
  )

  return {
    mockFavoriteById,
  }
}

describe('FavoriteButton', () => {
  beforeEach(cleanup)
  it('should change the fill when icon is clicked', () => {
    makeSut()

    const favoriteIcon = screen.getByTestId('favorite-icon')
    expect(favoriteIcon.getAttribute('fill')).toBe('white')

    const favoriteBtn = screen.getByTestId('favorite-btn')
    fireEvent.click(favoriteBtn)

    expect(favoriteIcon.getAttribute('fill')).toBe('red')
  })

  it('should init the icon fill red when isFavorited is passed as true', () => {
    makeSut(true)

    const favoriteIcon = screen.getByTestId('favorite-icon')

    expect(favoriteIcon.getAttribute('fill')).toBe('red')
  })

  it('should change the fill color to white on click when is initiated red', () => {
    makeSut(true)

    const favoriteIcon = screen.getByTestId('favorite-icon')

    expect(favoriteIcon.getAttribute('fill')).toBe('red')

    const favoriteBtn = screen.getByTestId('favorite-btn')
    fireEvent.click(favoriteBtn)

    expect(favoriteIcon.getAttribute('fill')).toBe('white')
  })

  it('should call favoriteById on click', () => {
    const { mockFavoriteById } = makeSut()

    const favoriteBtn = screen.getByTestId('favorite-btn')
    fireEvent.click(favoriteBtn)

    expect(mockFavoriteById).toHaveBeenCalledOnce()
  })

  it('should not render if article is not from current user and logged in', () => {
    const isCurrentUserAndLoggedIn = false
    makeSut(true, isCurrentUserAndLoggedIn)

    const favoriteIcon = screen.queryByTestId('favorite-icon')

    expect(favoriteIcon).not.toBeInTheDocument()
  })
})
