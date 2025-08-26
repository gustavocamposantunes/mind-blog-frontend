import { faker } from '@faker-js/faker'
import { beforeEach, describe, it, expect, vi } from 'vitest'

import { CustomCard } from './CustomCard'

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@/presentation/test/test-utils'

describe('CustomCard', () => {
  beforeEach(cleanup)
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

  it('should render card header with correct title', () => {
    const title = faker.lorem.sentence()
    render(<CustomCard id="1" onClick={vi.fn()} title={title} />)

    const cardHeader = screen.getByTestId('custom-card-header')
    const cardTitle = cardHeader.querySelector('[data-testid=header-title]')

    expect(cardTitle).toBeInTheDocument()
    expect(cardTitle?.textContent).toBe(title)
  })
})
