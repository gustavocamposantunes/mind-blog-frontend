import { faker } from '@faker-js/faker'
import { beforeEach, describe, it, expect, vi } from 'vitest'

import { CustomCard } from './CustomCard'

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@/presentation/test/test-utils'

type SutTypes = {
  title: string
  description: string
}

const makeSut = (
  articleId = faker.string.uuid(),
  onClick = () => {},
  data = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(10),
  },
): SutTypes => {
  render(
    <CustomCard
      id={articleId}
      onClick={onClick}
      title={data.title}
      description={data.description}
    />,
  )

  return {
    ...data,
  }
}

describe('CustomCard', () => {
  beforeEach(cleanup)
  it('should call function onClick', () => {
    const articleId = faker.string.uuid()
    const mockNavigate = vi.fn()
    const handleClick = () => {
      mockNavigate(`/article/${articleId}`)
    }
    makeSut(articleId, handleClick)

    const customCard = screen.getByTestId(`custom-card-${articleId}`)

    fireEvent.click(customCard)

    expect(mockNavigate).toHaveBeenCalledWith(`/article/${articleId}`)
  })

  it('should render card header with correct title', () => {
    const { title } = makeSut()

    const cardHeader = screen.getByTestId('custom-card-header')
    const cardTitle = cardHeader.querySelector('[data-testid=header-title]')

    expect(cardTitle).toBeInTheDocument()
    expect(cardTitle?.textContent).toBe(title)
  })

  it('should render card content with correct description', () => {
    const { description } = makeSut()

    const cardContent = screen.getByTestId('custom-card-content')
    const cardDescription = cardContent.querySelector(
      '[data-testid=card-description]',
    )

    expect(cardDescription).toBeInTheDocument()
    expect(cardDescription?.textContent).toBe(description)
  })
})
