import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'

import { PublishedByInfo } from './PublishedByInfo'

import { render, screen } from '@/presentation/test/test-utils'

describe('PublishedByInfo', () => {
  it('should render the avatar correctly', () => {
    const avatar = faker.image.avatar()
    render(<PublishedByInfo avatar={avatar} />)

    const customAvatar = screen.getByTestId('avatar')

    expect(customAvatar).toBeInTheDocument()
  })
})
