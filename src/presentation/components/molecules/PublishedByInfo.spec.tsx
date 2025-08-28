import { faker } from '@faker-js/faker'
import { describe, it, expect, beforeEach } from 'vitest'

import { PublishedByInfo } from './PublishedByInfo'

import { cleanup, render, screen } from '@/presentation/test/test-utils'
import { formatDateToShortMonth } from '@/presentation/utils/dateFormatter'

const makeSut = (
  publishedAt = faker.date.anytime().toISOString(),
  author = faker.person.firstName(),
) => {
  const avatar = faker.image.avatar()
  render(
    <PublishedByInfo
      avatar={avatar}
      author={author}
      publishedAt={publishedAt}
    />,
  )
}

describe('PublishedByInfo', () => {
  beforeEach(cleanup)
  it('should render the avatar correctly', () => {
    makeSut()

    const customAvatar = screen.getByTestId('avatar')

    expect(customAvatar).toBeInTheDocument()
  })

  it('should render the published at date', () => {
    const publishedAt = faker.date.anytime().toISOString()

    makeSut(publishedAt)

    const publishedByInfo = screen.getByTestId('published-by-info')

    expect(publishedByInfo).toBeInTheDocument()
    expect(publishedByInfo.textContent).toEqual(
      expect.stringContaining(formatDateToShortMonth(publishedAt)),
    )
  })

  it('should render the author', () => {
    const author = faker.person.firstName()
    makeSut(undefined, author)

    const publishedByInfo = screen.getByTestId('published-by-info')

    expect(publishedByInfo.textContent).toEqual(
      expect.stringContaining(`Por ${author}`),
    )
  })
})
