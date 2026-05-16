import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { EditArticlePage } from './EditArticlePage'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
}))

vi.mock('../hooks', async () => ({
  ...(await vi.importActual('../hooks')),
  useGetArticleById: () => ({
    data: undefined,
    error: undefined,
    isLoading: true,
  }),
  useUpdateArticle: () => ({
    mutate: vi.fn(),
  }),
}))

describe('EditArticlePage loading state', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the skeleton group while the article loads', () => {
    render(
      <EditArticlePage
        getArticletById={{} as never}
        updateArticle={{} as never}
      />,
    )

    expect(screen.getByTestId('skeleton-group')).toBeInTheDocument()
  })
})
