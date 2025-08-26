import { faker } from '@faker-js/faker'
import { describe, it, expect, vi } from 'vitest'

import { CustomCard } from './CustomCard'

import { fireEvent, render, screen } from '@/presentation/test/test-utils'

describe('CustomCard', () => {
  it('should call function onClick', () => {
    const articleId = faker.string.uuid()
    const mockNavigate = vi.fn()
    const handleClick = () => {
      mockNavigate(`/article/${articleId}`)
    }
    render(<CustomCard id={articleId} onClick={handleClick} />)

    const customCard = screen.getByTestId(`custom-card-${articleId}`)

    fireEvent.click(customCard)

    expect(mockNavigate).toHaveBeenCalledWith(`/article/${articleId}`)
  })
})
