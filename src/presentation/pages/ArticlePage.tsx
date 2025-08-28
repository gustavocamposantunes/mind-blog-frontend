import { Heart, PencilIcon } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Article } from '../components/organism'
import { useFavouriteArticle, useGetArticleById } from '../hooks'
import { useAuthStore } from '../store'

import type {
  FavouriteArticleUseCase,
  GetArticleByIdUseCase,
} from '@/domain/usecases'

import { ArticleTemplate } from '@/presentation/components/templates'

type ArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
  favouriteArticle: FavouriteArticleUseCase
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  getArticletById,
  favouriteArticle,
}) => {
  const { accessToken, user } = useAuthStore()

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
  let toogleEditSlot: ReactNode | undefined = undefined

  if (accessToken && data && user.id !== data.author.id) {
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
            favoriteById(data.id, () => {
              setToogleFavourite(!toogleFavourite)

              return !!toogleFavourite
            })
          }}
        />
        {data.favouriteCount}
      </span>
    )
  } else if (accessToken) {
    toogleEditSlot = (
      <Link to={`/article/edit/${id}`} data-testid="toogle-edit">
        <PencilIcon />
      </Link>
    )
  }

  const { favoriteById } = useFavouriteArticle(favouriteArticle, accessToken)

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
            firstName: data.author.firstName,
            avatar: data.author.avatar,
          }}
          toogleFavouriteSlot={toogleFavouriteSlot}
          toogleEditSlot={toogleEditSlot}
        />
      )}
    </ArticleTemplate>
  )
}
