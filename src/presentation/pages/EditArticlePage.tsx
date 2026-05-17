import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormHeader } from '../components/molecules'
import { MarkdownRenderer } from '../components/organism'
import { PageTemplate } from '../components/templates'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Skeleton } from '../components/ui/skeleton'
import { Textarea } from '../components/ui/textarea'
import { useGetArticleById, useUpdateArticle } from '../hooks'
import { useAuthStore } from '../store'
import { buildUpdateArticlePayload } from '../utils/buildUpdateArticlePayload'
import { getBase64FromInputFile } from '../utils/getBase64FromInputFile'
import { parseTags } from '../utils/parse-tags'

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
    resume: string
    content: string
    image?: string
    category: string
    tagsInput: string
  }>({
    title: '',
    resume: '',
    content: '',
    image: '',
    category: '',
    tagsInput: '',
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
        resume: data?.resume,
        content: data?.content,
        image: data?.image,
        category: data?.category,
        tagsInput: data.tags.join(', '),
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
          resume: data.resume,
          content: data.content,
          image: data.image,
          category: data.category,
          tags: data.tags,
        },
        {
          title: editArticleParams.title,
          resume: editArticleParams.resume,
          content: editArticleParams.content,
          image: editArticleParams.image,
          category: editArticleParams.category,
          tags: parseTags(editArticleParams.tagsInput),
        },
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
            <Label htmlFor="resume">Resumo</Label>
            <Textarea
              className="min-h-[120px]"
              placeholder="Edite o resumo"
              id="resume"
              name="resume"
              data-testid="textarea-resume"
              value={editArticleParams.resume}
              onChange={(e) =>
                setEditArticleParams({
                  ...editArticleParams,
                  resume: e.target.value,
                })
              }
            />
          </div>

          <div className="grid w-full gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="content">Conteúdo</Label>
              <span className="text-xs text-foreground/50">
                Markdown habilitado
              </span>
            </div>
            <p className="text-xs text-foreground/50">
              Ajuste o conteúdo usando Markdown para manter a formatação.
            </p>
            <Textarea
              className="min-h-[400px]"
              placeholder="Edite o conteúdo em Markdown"
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
            <div className="rounded-lg border border-border bg-background/60 p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Pré-visualização
              </div>
              <MarkdownRenderer
                content={editArticleParams.content}
                emptyMessage="O conteúdo editado aparecerá aqui em Markdown."
              />
            </div>
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="category">Categoria</Label>
            <Input
              placeholder="Edite a categoria"
              id="category"
              data-testid="input-category"
              value={editArticleParams.category}
              onChange={(e) =>
                setEditArticleParams({
                  ...editArticleParams,
                  category: e.target.value,
                })
              }
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="tags">Tags</Label>
            <Input
              placeholder="Ex: react, typescript, frontend"
              id="tags"
              data-testid="input-tags"
              value={editArticleParams.tagsInput}
              onChange={(e) =>
                setEditArticleParams({
                  ...editArticleParams,
                  tagsInput: e.target.value,
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
