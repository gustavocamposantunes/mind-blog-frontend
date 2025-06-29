import { describe, it, vi } from 'vitest'

import { render } from '../test/test-utils'

import { HomePage } from './HomePage'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

const makeSut = () => {
  render(<HomePage />)
}

describe('HomePage', () => {
  it('should render correctly', () => {
    makeSut()
  })
})
