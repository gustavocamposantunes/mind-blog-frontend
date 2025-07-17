import { Heart, PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CustomAvatar } from '../molecules'
import { Button } from '../ui/button'

import type { AuthorModel } from '@/domain/models'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card'
import { formatDateToShortMonth } from '@/presentation/utils/dateFormatter'

interface IArticleCard {
  id: number
  title: string
  content: string
  image?: string
  author?: AuthorModel
  publishedAt?: string
  className?: string
  redirect?: string
  favourite?: string
  isLoggedIn?: boolean
  authUserId?: number
  favouriteArticleById?: (id: number, favourite: () => void) => void
  unfavouriteArticleById?: (id: number, unfavourite: () => void) => void
  favourited?: boolean
}

export const ArticleCard: React.FC<IArticleCard> = ({
  id,
  title,
  content,
  image = 'https://miro.medium.com/v2/resize:fit:1358/1*moJeTvW97yShLB7URRj5Kg.png',
  author,
  publishedAt = '2023-10-01T00:00:00Z',
  className,
  redirect,
  favourite,
  isLoggedIn,
  authUserId,
  favouriteArticleById = () => {},
  unfavouriteArticleById = () => {},
  favourited,
}) => {
  const [favorite, setFavorite] = useState(favourited)
  const navigate = useNavigate()

  const formatterdDate = formatDateToShortMonth(
    publishedAt || new Date().toISOString(),
  )

  const editArticle =
    author?.id && authUserId === author?.id ? (
      <Link
        to={`/article/edit/${id}`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <PencilIcon data-testid="pencil-icon" />
      </Link>
    ) : null

  const favoriteArticle =
    authUserId !== author?.id && isLoggedIn ? (
      <Heart
        fill={favorite ? 'red' : 'white'}
        color={favorite ? 'red' : undefined}
        data-testid="favorite-heart-icon"
        onClick={(e) => {
          e.stopPropagation()
          if (!favorite) {
            favouriteArticleById(id, () => {
              setFavorite(true)
            })
          } else {
            unfavouriteArticleById(id, () => {
              setFavorite(false)
            })
          }
        }}
      />
    ) : null

  return (
    <Card
      className={`pt-0 cursor-pointer hover:shadow-lg transition-shadow ${className ?? ''}`}
      key={id}
      onClick={() => navigate(`/articles/${id}`)}
      data-testid={`card-article-${id}`}
    >
      <div className="flex">
        <img
          className={`flex-1 ${favourite ? 'max-w-[50%]' : ''}`}
          src={image}
          alt={title}
        />
        {favourite ? (
          <div className="flex flex-1 items-center justify-center">
            <h1 className="irish-grove-font">{favourite}</h1>
          </div>
        ) : null}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{content.slice(0, 222)}</CardDescription>
      </CardContent>
      <CardFooter className={`flex justify-between mt-auto`}>
        <span className="flex items-center gap-2">
          <CustomAvatar src={author?.avatar}></CustomAvatar>
          <p data-testid="published-at">
            Por <b>{author?.name}</b> - {formatterdDate}
          </p>
        </span>
        {editArticle}
        {favoriteArticle}
        {redirect ? (
          <Button className="orange-btn action-btn uppercase">Ler mais</Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
