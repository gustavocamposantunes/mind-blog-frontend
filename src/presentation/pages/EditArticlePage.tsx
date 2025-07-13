import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormHeader } from '../components/molecules'
import { PageTemplate } from '../components/templates'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Skeleton } from '../components/ui/skeleton'
import { Textarea } from '../components/ui/textarea'
import { useGetArticleById, useUpdateArticle } from '../hooks'
import { useAuthStore } from '../store'
import { toBase64 } from '../utils/toBase64'

import type {
  GetArticleByIdUseCase,
  UpdateArticleUseCase,
} from '@/domain/usecases'

type EditArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
  updateArticle: UpdateArticleUseCase
}

export const EditArticlePage: React.FC<EditArticlePageProps> = ({
  getArticletById,
  updateArticle,
}) => {
  const [editArticleParams, setEditArticleParams] = useState<{
    title: string
    content: string
    image?: string
  }>({
    title: '',
    content: '',
    image: '',
  })
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { error, isLoading, data } = useGetArticleById(
    getArticletById,
    String(id),
  )

  useEffect(() => {
    if (error?.message) {
      toast.error('Erro ao buscar artigo')
      navigate('/')
    }
  }, [error])

  useEffect(() => {
    if (data)
      setEditArticleParams({
        title: data?.title,
        content: data?.content,
        image: data?.image,
      })
    toast.success('Artigo carregado com sucesso')
  }, [data])

  const { accessToken } = useAuthStore()

  const { mutate } = useUpdateArticle(accessToken, updateArticle)

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutate(
      {
        id: Number(id),
        ...editArticleParams,
      },
      {
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  const content = isLoading ? (
    <span data-testid="skeleton-group">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </span>
  ) : (
    <PageTemplate>
      <form onSubmit={onSubmit}>
        <FormHeader title="Editar Artigo" />
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
              name="title"
              data-testid="textaread-title"
              readOnly
              value={editArticleParams.title}
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              className="min-h-[400px]"
              placeholder="Edite o conteúdo"
              id="content"
              name="content"
              data-testid="textaread-content"
              readOnly
              value={editArticleParams.content}
            />
          </div>
        </section>
      </form>
    </PageTemplate>
  )

  return content
}
