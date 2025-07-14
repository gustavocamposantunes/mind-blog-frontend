import { Heart } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Article } from '../components/organism'
import {
  useFavouriteArticle,
  useGetArticleById,
  useUnfavouriteArticle,
} from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  GetArticleByIdUseCase,
  UnfavouriteArticleUseCase,
} from '@/domain/usecases'

import { ArticleTemplate } from '@/presentation/components/templates'

type ArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
  favouriteArticle: FavouriteArticleUseCase
  unfavouriteArticle: UnfavouriteArticleUseCase
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  getArticletById,
  favouriteArticle,
  unfavouriteArticle,
}) => {
  const { accessToken } = useAuthStore()

  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetArticleById(
    getArticletById,
    String(id),
  )

  const [toogleFavourite, setToogleFavourite] = useState(data?.favourited)

  useEffect(() => {
    if (data) {
      setToogleFavourite(data.favourited)
    }
  }, [data])

  let toogleFavouriteSlot: ReactNode | undefined = undefined

  if (accessToken && data) {
    toogleFavouriteSlot = (
      <span
        className="text-stone-500 flex gap-2 font-bold"
        data-testid="favourite-count"
      >
        <Heart
          data-testid="favourite-toogle"
          className="cursor-pointer"
          fill={toogleFavourite ? 'red' : 'white'}
          color={toogleFavourite ? 'red' : undefined}
          onClick={() => {
            if (!toogleFavourite) {
              favouriteArticleById(data.id, () => {
                setToogleFavourite(true)
              })
            } else {
              unfavouriteArticleById(data.id, () => {
                setToogleFavourite(false)
              })
            }
          }}
        />
        {data.favouriteCount}
      </span>
    )
  }

  const { mutate: mutateFavouriteArticle } =
    useFavouriteArticle(favouriteArticle)

  const favouriteArticleById = (id: number, favourite: () => void) => {
    mutateFavouriteArticle(
      {
        id,
        token: accessToken,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
          favourite()
          toast.info('Artigo adicionado aos favoritos')
        },
      },
    )
  }

  const { mutate: mutateUnfavouriteArticle } =
    useUnfavouriteArticle(unfavouriteArticle)

  const unfavouriteArticleById = (id: number, unfavourite: () => void) => {
    mutateUnfavouriteArticle(
      {
        id,
        token: accessToken,
      },
      {
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
          unfavourite()
          toast.info('Artigo removido dos favoritos')
        },
      },
    )
  }

  return (
    <ArticleTemplate isLoading={isLoading} error={error}>
      {data && (
        <Article
          title={data.title}
          publishedAt={data.publishedAt}
          image={data.image}
          content={data.content}
          author={{
            id: data.author.id,
            name: data.author.name,
            avatar: data.author.avatar,
          }}
          toogleFavouriteSlot={toogleFavouriteSlot}
        />
      )}
    </ArticleTemplate>
  )
}
