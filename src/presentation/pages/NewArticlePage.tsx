import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormHeader } from '../components/molecules'
import { Input } from '../components/ui/input'
import { useRegisterArticle } from '../hooks/useRegisterArticle'
import { useAuthStore } from '../store/auth-store'
import { toBase64 } from '../utils/toBase64'

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
  const { user, accessToken } = useAuthStore()

  const [registerArticleParams, setRegisterArticleParams] = useState({
    title: '',
    content: '',
    image: '',
  })

  const { mutate } = useRegisterArticle(registerArticle, accessToken)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    mutate(
      {
        ...registerArticleParams,
        author_id: Number(user.id),
      },
      {
        onSuccess: () => {
          navigate('/articles')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <PageTemplate>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <FormHeader title="Novo Artigo" />

        <section className="mt-4 flex flex-col gap-4">
          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Inserir Imagem</Label>
              <Input
                id="picture"
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const base64 = await toBase64(file)
                    setRegisterArticleParams({
                      ...registerArticleParams,
                      image: base64,
                    })
                  }
                }}
              />
            </div>
            {registerArticleParams.image && (
              <img
                className="w-72"
                src={registerArticleParams.image}
                alt="foto do artigo selecionada"
                data-testid="selected-image"
              />
            )}
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="title">Título</Label>
            <Textarea
              placeholder="Adicione um título"
              id="title"
              value={registerArticleParams.title}
              onChange={(event) =>
                setRegisterArticleParams({
                  ...registerArticleParams,
                  title: event.target.value,
                })
              }
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">Texto</Label>
            <Textarea
              className="min-h-[400px]"
              placeholder="Escreva seu artigo"
              id="content"
              value={registerArticleParams.content}
              onChange={(event) =>
                setRegisterArticleParams({
                  ...registerArticleParams,
                  content: event.target.value,
                })
              }
            />
          </div>
        </section>
      </form>
    </PageTemplate>
  )
}
