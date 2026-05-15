import { useEffect, useRef, useState } from 'react'
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
import { buildUpdateArticlePayload } from '../utils/buildUpdateArticlePayload'
import { getBase64FromInputFile } from '../utils/getBase64FromInputFile'

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
  }, [error, navigate])

  const hasShownSuccessToast = useRef(false)

  useEffect(() => {
    if (data && !hasShownSuccessToast.current) {
      setEditArticleParams({
        title: data?.title,
        content: data?.content,
        image: data?.image,
      })
      toast.success('Artigo carregado com sucesso')
      hasShownSuccessToast.current = true
    }
  }, [data])

  const { accessToken } = useAuthStore()

  const { mutate } = useUpdateArticle(accessToken, updateArticle)

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (data) {
      const payload = buildUpdateArticlePayload(
        Number(id),
        {
          title: data.title,
          content: data.content,
          image: data.image,
        },
        editArticleParams,
      )

      if (Object.keys(payload).length === 1) {
        toast.info('Nenhuma alteração realizada, atualize o artigo!')
        return
      }

      mutate(payload, {
        onSuccess: () => {
          toast.success('Artigo atualizado com sucesso')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      })
    }
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
                  const base64 = await getBase64FromInputFile(e)
                  if (base64) {
                    setEditArticleParams((previous) => ({
                      ...previous,
                      image: base64,
                    }))
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
              data-testid="textarea-title"
              value={editArticleParams.title}
              onChange={(e) =>
                setEditArticleParams({
                  ...editArticleParams,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              className="min-h-[400px]"
              placeholder="Edite o conteúdo"
              id="content"
              name="content"
              data-testid="textarea-content"
              value={editArticleParams.content}
              onChange={(e) =>
                setEditArticleParams({
                  ...editArticleParams,
                  content: e.target.value,
                })
              }
            />
          </div>
        </section>
      </form>
    </PageTemplate>
  )

  return content
}
