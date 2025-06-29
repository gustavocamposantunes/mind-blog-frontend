import { describe, it, vi } from 'vitest'

import { renderHomePageWithRouter } from '../test'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
}))

const makeSut = () => {
  renderHomePageWithRouter()
}

describe('HomePage', () => {
  it('should render correctly', () => {
    makeSut()
  })
})
