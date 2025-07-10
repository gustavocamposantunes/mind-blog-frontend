import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useGetArticleById } from '../hooks'

import type { GetArticleByIdUseCase } from '@/domain/usecases'
import { Skeleton } from '../components/ui/skeleton'
import { FormHeader } from '../components/molecules'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'

type EditArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
}

export const EditArticlePage: React.FC<EditArticlePageProps> = ({
  getArticletById,
}) => {
  const [editArticleParams, setEditArticleParams] = useState({
    title: '',
    content: ''
  })
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { error, isLoading, data } = useGetArticleById(getArticletById, String(id))

  useEffect(() => {
    if(error?.message) {
      toast.error('Erro ao buscar artigo')
      navigate('/')
    }
  }, [error])

  useEffect(() => {
    if(data?.data)
      setEditArticleParams({
        title: data?.data?.title,
        content: data?.data?.content,
      })
  }, [data?.data])

  let content = isLoading ? <span data-testid="skeleton-group">
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </span> : <form role='form'>
    <FormHeader title='Editar Artigo' />
    <section className="mt-4 flex flex-col gap-4">
      <div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="title">Título</Label>
          <Textarea
            placeholder="Edite o título"
            id="title"
            name='title'
            data-testid="textaread-title"
            onChange={(e) => setEditArticleParams({...editArticleParams, title: e.target.value})}
            value={editArticleParams.title}
          />
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            className="min-h-[400px]"
            placeholder="Edite o conteúdo"
            id="content"
            name='content'
            data-testid="textaread-content"
            onChange={(e) => setEditArticleParams({...editArticleParams, content: e.target.value})}
            value={editArticleParams.content}
          />
        </div>
      </div>
    </section>
  </form>

  return content
}
