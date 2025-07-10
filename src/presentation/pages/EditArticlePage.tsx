import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useGetArticleById } from '../hooks'

import type { GetArticleByIdUseCase } from '@/domain/usecases'

type EditArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
}

export const EditArticlePage: React.FC<EditArticlePageProps> = ({
  getArticletById,
}) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { error } = useGetArticleById(getArticletById, String(id))

  useEffect(() => {
    toast.error('Erro ao buscar artigo')
    navigate('/')
  }, [error])

  return <></>
}
