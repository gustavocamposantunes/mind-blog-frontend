import { describe, it, expect, beforeEach } from 'vitest'

import { FavoriteButton } from './FavoriteButton'

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@/presentation/test/test-utils'

describe('FavoriteButton', () => {
  beforeEach(cleanup)
  it('should change the fill when icon is clicked', () => {
    render(<FavoriteButton />)

    const favoriteIcon = screen.getByTestId('favorite-icon')
    expect(favoriteIcon.getAttribute('fill')).toBe('white')

    const favoriteBtn = screen.getByTestId('favorite-btn')
    fireEvent.click(favoriteBtn)

    expect(favoriteIcon.getAttribute('fill')).toBe('red')
  })

  it('should init the icon fill red when isFavorited is passed as true', () => {
    render(<FavoriteButton isFavorited={true} />)

    const favoriteIcon = screen.getByTestId('favorite-icon')

    expect(favoriteIcon.getAttribute('fill')).toBe('red')
  })
})
