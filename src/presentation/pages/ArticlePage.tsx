import { Heart, PencilIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'
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

type FavouriteToggleButtonProps = {
  articleId: number
  initialFavourite: boolean
  favoriteById: (articleId: number, favourite: () => boolean) => Promise<void>
}

const FavouriteToggleButton: React.FC<FavouriteToggleButtonProps> = ({
  articleId,
  initialFavourite,
  favoriteById,
}) => {
  const [toogleFavourite, setToogleFavourite] = useState(initialFavourite)

  return (
    <Heart
      data-testid="favourite-toogle"
      className="cursor-pointer"
      fill={toogleFavourite ? 'red' : 'white'}
      color={toogleFavourite ? 'red' : undefined}
      onClick={() => {
        favoriteById(articleId, () => {
          const previousFavourite = toogleFavourite

          setToogleFavourite((currentFavourite) => !currentFavourite)

          return previousFavourite
        })
      }}
    />
  )
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
  const { favoriteById } = useFavouriteArticle(favouriteArticle, accessToken)

  let toogleFavouriteSlot: ReactNode | undefined = undefined
  let toogleEditSlot: ReactNode | undefined = undefined

  if (accessToken && data && user.id !== data.author.id) {
    toogleFavouriteSlot = (
      <span
        className="text-stone-500 flex gap-2 font-bold"
        data-testid="favourite-count"
      >
        <FavouriteToggleButton
          key={data.id}
          articleId={data.id}
          initialFavourite={data.favourited}
          favoriteById={favoriteById}
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
            firstName: data.author.fullName,
            avatar: data.author.image,
          }}
          toogleFavouriteSlot={toogleFavouriteSlot}
          toogleEditSlot={toogleEditSlot}
        />
      )}
    </ArticleTemplate>
  )
}
