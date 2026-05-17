import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { MarkdownRenderer } from '../components/organism/MarkdownRenderer'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useResponsiveLimit } from '../hooks'
import { useRegisterArticle } from '../hooks/useRegisterArticle'
import { useAuthStore } from '../store/auth-store'
import { getBase64FromInputFile } from '../utils/getBase64FromInputFile'
import { parseTags } from '../utils/parse-tags'

import type { RegisterArticleUseCase } from '@/domain/usecases'

import { PageTemplate } from '@/presentation/components/templates'
import { Label } from '@/presentation/components/ui/label'
import { Textarea } from '@/presentation/components/ui/textarea'

type NewArticlePageProps = {
  registerArticle: RegisterArticleUseCase
}

export const NewArticlePage: React.FC<NewArticlePageProps> = ({
  registerArticle,
}) => {
  const navigate = useNavigate()
  const limit = useResponsiveLimit()
  const { user, accessToken } = useAuthStore()

  const [registerArticleParams, setRegisterArticleParams] = useState({
    title: '',
    resume: '',
    content: '',
    image: '',
    category: '',
    tagsInput: '',
  })

  const { mutate } = useRegisterArticle(registerArticle, accessToken)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    mutate(
      {
        title: registerArticleParams.title,
        resume: registerArticleParams.resume,
        content: registerArticleParams.content,
        image: registerArticleParams.image,
        category: registerArticleParams.category,
        tags: parseTags(registerArticleParams.tagsInput),
        author_id: Number(user.id),
      },
      {
        onSuccess: () => {
          navigate(`/articles?page=1&limit=${limit}`)
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <PageTemplate>
      <div className="w-full flex flex-col gap-6 mb-12 items-center">
        <button
          onClick={() => navigate('/articles')}
          className="text-sm text-foreground/70 hover:text-foreground flex items-center gap-2 mb-4"
        >
          ← Voltar ao Dashboard
        </button>

        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Criar Novo Artigo
          </h1>
          <p className="text-foreground/60">
            Compartilhe seu conhecimento com a comunidade
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="bg-card border border-border rounded-lg p-8 flex flex-col gap-6">
            {/* Título do Artigo */}
            <div className="grid w-full gap-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Título do Artigo *
              </Label>
              <Textarea
                placeholder="O Futuro da Inteligência Artificial em 2025"
                id="title"
                className="min-h-[60px] resize-none"
                value={registerArticleParams.title}
                onChange={(event) =>
                  setRegisterArticleParams({
                    ...registerArticleParams,
                    title: event.target.value,
                  })
                }
              />
            </div>

            {/* Resumo */}
            <div className="grid w-full gap-2">
              <Label htmlFor="resume" className="text-sm font-semibold">
                Resumo *
              </Label>
              <Textarea
                placeholder="Desenvolvedor Full Stack apaixonado por tecnologia e inovação."
                id="resume"
                className="min-h-[80px] resize-none"
                value={registerArticleParams.resume}
                onChange={(event) =>
                  setRegisterArticleParams({
                    ...registerArticleParams,
                    resume: event.target.value,
                  })
                }
              />
              <span className="text-xs text-foreground/50">
                0/500 caracteres
              </span>
            </div>

            {/* Categoria */}
            <div className="grid w-full gap-2">
              <Label htmlFor="category" className="text-sm font-semibold">
                Categoria *
              </Label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={registerArticleParams.category}
                onChange={(e) =>
                  setRegisterArticleParams({
                    ...registerArticleParams,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Selecione uma categoria</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="DevOps">DevOps</option>
                <option value="IA">IA</option>
                <option value="Tecnologia">Tecnologia</option>
              </select>
            </div>

            {/* Imagem de Capa */}
            <div className="grid w-full gap-2">
              <Label htmlFor="picture" className="text-sm font-semibold">
                Imagem de Capa *
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const base64 = await getBase64FromInputFile(e)
                  if (base64) {
                    setRegisterArticleParams((previous) => ({
                      ...previous,
                      image: base64,
                    }))
                  }
                }}
              />
              {registerArticleParams.image && (
                <div className="mt-4">
                  <img
                    className="w-full max-w-xs rounded-md"
                    src={registerArticleParams.image}
                    alt="foto do artigo selecionada"
                    data-testid="selected-image"
                  />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="grid w-full gap-2">
              <Label htmlFor="tags" className="text-sm font-semibold">
                Tags
              </Label>
              <Input
                placeholder="Ex: ai, inovacao, futuro"
                id="tags"
                value={registerArticleParams.tagsInput}
                onChange={(event) =>
                  setRegisterArticleParams({
                    ...registerArticleParams,
                    tagsInput: event.target.value,
                  })
                }
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {registerArticleParams.tagsInput &&
                  parseTags(registerArticleParams.tagsInput).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="grid w-full gap-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="content" className="text-sm font-semibold">
                  Conteúdo do Artigo *
                </Label>
                <span className="text-xs text-foreground/50">
                  Escreva em Markdown
                </span>
              </div>
              <p className="text-xs text-foreground/50">
                Use `#` para títulos, `**negrito**`, listas e links no corpo do
                artigo.
              </p>
              <Textarea
                className="min-h-[400px] resize-none"
                placeholder="Escreva seu artigo em Markdown..."
                id="content"
                value={registerArticleParams.content}
                onChange={(event) =>
                  setRegisterArticleParams({
                    ...registerArticleParams,
                    content: event.target.value,
                  })
                }
              />
              <div className="rounded-lg border border-border bg-background/60 p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                  Pré-visualização
                </div>
                <MarkdownRenderer
                  content={registerArticleParams.content}
                  emptyMessage="Digite o conteúdo do artigo em Markdown para ver a pré-visualização."
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              >
                Publicar Artigo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/articles')}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PageTemplate>
  )
}
