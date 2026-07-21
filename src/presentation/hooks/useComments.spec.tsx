import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useComments } from './useComments'

import type {
  CommentArticleParams,
  CommentArticleUseCase,
  ListCommentsByArticleIdUseCase,
} from '@/domain/usecases'
import type { ReactNode } from 'react'

vi.mock('react-toastify', async () => ({
  ...(await vi.importActual('react-toastify')),
  toast: {
    error: vi.fn(),
    info: vi.fn(),
  },
}))

class ListCommentsByArticleIdSpy implements ListCommentsByArticleIdUseCase {
  async listByArticleId() {
    return {
      statusCode: 200,
      data: [],
    }
  }
}

class CommentArticleSpy implements CommentArticleUseCase {
  async comment(params: CommentArticleParams, token: string) {
    void params
    void token

    return {
      statusCode: 201,
      data: undefined,
    }
  }
}

const makeWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        retry: false,
      },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('useComments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show success feedback when a comment is published', async () => {
    const { result } = renderHook(
      () =>
        useComments(
          new ListCommentsByArticleIdSpy(),
          new CommentArticleSpy(),
          1,
          'access-token',
        ),
      { wrapper: makeWrapper() },
    )

    result.current.commentMutation.mutate({
      article_id: 1,
      content: 'This is a useful comment.',
    })

    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith('Comentário publicado')
    })
  })

  it('should show the error message when comment publishing fails with an Error', async () => {
    const commentArticleSpy = new CommentArticleSpy()
    vi.spyOn(commentArticleSpy, 'comment').mockRejectedValueOnce(
      new Error('Falha ao comentar'),
    )

    const { result } = renderHook(
      () =>
        useComments(
          new ListCommentsByArticleIdSpy(),
          commentArticleSpy,
          1,
          'access-token',
        ),
      { wrapper: makeWrapper() },
    )

    result.current.commentMutation.mutate({
      article_id: 1,
      content: 'This is a useful comment.',
    })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Falha ao comentar')
    })
  })

  it('should show generic error feedback when comment publishing fails without an Error', async () => {
    const commentArticleSpy = new CommentArticleSpy()
    vi.spyOn(commentArticleSpy, 'comment').mockRejectedValueOnce(
      'unexpected failure',
    )

    const { result } = renderHook(
      () =>
        useComments(
          new ListCommentsByArticleIdSpy(),
          commentArticleSpy,
          1,
          'access-token',
        ),
      { wrapper: makeWrapper() },
    )

    result.current.commentMutation.mutate({
      article_id: 1,
      content: 'This is a useful comment.',
    })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro inesperado')
    })
  })
})
