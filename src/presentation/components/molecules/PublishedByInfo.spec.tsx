import { faker } from '@faker-js/faker'
import { describe, it, expect, beforeEach } from 'vitest'

import { PublishedByInfo } from './PublishedByInfo'

import { render, screen } from '@/presentation/test/test-utils'

const makeSut = () => {
  const avatar = faker.image.avatar()
  render(<PublishedByInfo avatar={avatar} />)
}

describe('PublishedByInfo', () => {
  beforeEach(() => {
    makeSut()
  })
  it('should render the avatar correctly', () => {
    const customAvatar = screen.getByTestId('avatar')

    expect(customAvatar).toBeInTheDocument()
  })
})
