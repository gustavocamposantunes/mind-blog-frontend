import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { EditArticlePage } from './EditArticlePage'

const mutateMock = vi.fn()

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
    isLoading: false,
  }),
  useUpdateArticle: () => ({
    mutate: mutateMock,
  }),
}))

describe('EditArticlePage no data state', () => {
  beforeEach(() => {
    mutateMock.mockClear()
  })

  it('should ignore submit attempts when the article data is not loaded', () => {
    render(
      <MemoryRouter>
        <EditArticlePage
          getArticletById={{} as never}
          updateArticle={{} as never}
        />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }))

    expect(mutateMock).not.toHaveBeenCalled()
  })
})