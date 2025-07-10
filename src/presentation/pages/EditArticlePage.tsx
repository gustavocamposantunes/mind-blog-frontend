import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useGetArticleById } from '../hooks'

import type { GetArticleByIdUseCase } from '@/domain/usecases'
import { Skeleton } from '../components/ui/skeleton'
import { FormHeader } from '../components/molecules'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Input } from '../components/ui/input'
import { toBase64 } from '../utils/toBase64'

type EditArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
}

export const EditArticlePage: React.FC<EditArticlePageProps> = ({
  getArticletById,
}) => {
  const [editArticleParams, setEditArticleParams] = useState({
    title: '',
    content: '',
    image: ''
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
        image: data?.data?.image ?? '',
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Inserir Imagem</Label>
          <Input
            id="picture"
            type="file"
            data-testid="input-picture"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) {
                const base64 = await toBase64(file)
                setEditArticleParams({
                  ...editArticleParams,
                  image: base64,
                })
              }
            }}
          />
        </div>
        {editArticleParams.image && (
          <img
            className="w-72"
            src={editArticleParams.image}
            alt="foto do artigo selecionada"
            data-testid="selected-image"
          />
        )}
      </div>
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
    </section>
  </form>

  return content
}
