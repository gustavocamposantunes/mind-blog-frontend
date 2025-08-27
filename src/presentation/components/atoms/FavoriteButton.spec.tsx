import { describe, it, expect } from 'vitest'

import { FavoriteButton } from './FavoriteButton'

import { fireEvent, render, screen } from '@/presentation/test/test-utils'

describe('FavoriteButton', () => {
  it('should change the fill when icon is clicked', () => {
    render(<FavoriteButton />)

    const favoriteIcon = screen.getByTestId('favorite-icon')
    expect(favoriteIcon.getAttribute('fill')).toBe('white')

    const favoriteBtn = screen.getByTestId('favorite-btn')
    fireEvent.click(favoriteBtn)

    expect(favoriteIcon.getAttribute('fill')).toBe('red')
  })
})
