import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useGetArticleById } from '../hooks'

import type { GetArticleByIdUseCase } from '@/domain/usecases'
import { Skeleton } from '../components/ui/skeleton'

type EditArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
}

export const EditArticlePage: React.FC<EditArticlePageProps> = ({
  getArticletById,
}) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { error, isLoading } = useGetArticleById(getArticletById, String(id))

  useEffect(() => {
    if(error?.message) {
      toast.error('Erro ao buscar artigo')
      navigate('/')
    }
  }, [error])

  let content = isLoading ? <span data-testid="skeleton-group">
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </span> : null

  return content
}
