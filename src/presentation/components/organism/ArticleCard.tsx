import { Heart, PencilIcon } from 'lucide-react'
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
import { useAuthStore } from '@/presentation/store/auth-store'
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
}) => {
  const navigate = useNavigate()
  const { user, accessToken } = useAuthStore()

  const isLoggedIn = !!accessToken

  const formatterdDate = formatDateToShortMonth(
    publishedAt || new Date().toISOString(),
  )

  const editArticle = user.id === author?.id ? (
    <Link
      className="bg-stone-800 p-2 rounded-md"
      to={`/article/edit/${id}`}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <PencilIcon className="text-white" />
    </Link>
  ) : null

  const favoriteArticle = user.id !== author?.id && isLoggedIn ?
    <Heart data-testid="favorite-heart-icon" onClick={(e) => { e.stopPropagation() }} />
    : null

  return (
    <Card
      className={`pt-0 cursor-pointer hover:shadow-lg transition-shadow ${className ?? ''}`}
      key={id}
      onClick={() => navigate(`/articles/${id}`)}
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
