import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { toast } from 'react-toastify'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useDeleteArticle } from './useDeleteArticle'

import type { DeleteArticleByIdUseCase } from '@/domain/usecases'
import type { ReactNode } from 'react'

vi.mock('react-toastify', async () => ({
  ...(await vi.importActual('react-toastify')),
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

class DeleteArticleSpy implements DeleteArticleByIdUseCase {
  async deleteById(articleId: number, token: string) {
    return {
      statusCode: 200,
      data: {
        message: `${articleId}-${token}`,
      },
    }
  }
}

const makeWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
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

describe('useDeleteArticle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show success feedback when article deletion succeeds', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(
      () =>
        useDeleteArticle(new DeleteArticleSpy(), 'access-token', { onSuccess }),
      { wrapper: makeWrapper() },
    )

    await result.current.deleteById(1)

    expect(onSuccess).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalledWith('Artigo deletado com sucesso')
  })

  it('should show the error message when article deletion fails with an Error', async () => {
    const deleteArticleSpy = new DeleteArticleSpy()
    vi.spyOn(deleteArticleSpy, 'deleteById').mockRejectedValueOnce(
      new Error('Falha ao excluir artigo'),
    )

    const { result } = renderHook(
      () => useDeleteArticle(deleteArticleSpy, 'access-token'),
      { wrapper: makeWrapper() },
    )

    await result.current.deleteById(1)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Falha ao excluir artigo')
    })
  })

  it('should show generic error feedback when article deletion fails without an Error', async () => {
    const deleteArticleSpy = new DeleteArticleSpy()
    vi.spyOn(deleteArticleSpy, 'deleteById').mockRejectedValueOnce(
      'unexpected failure',
    )

    const { result } = renderHook(
      () => useDeleteArticle(deleteArticleSpy, 'access-token'),
      { wrapper: makeWrapper() },
    )

    await result.current.deleteById(1)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Erro inesperado')
    })
  })
})
