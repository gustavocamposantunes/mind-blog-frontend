import { Heart } from 'lucide-react'
import { useState } from 'react'

import { CustomAvatar } from '../molecules'

import { formatDateToShortMonth } from '@/presentation/utils/dateFormatter'

interface IArticle {
  id: number
  title: string
  publishedAt: string
  image?: string
  content: string
  author?: {
    id: number
    name: string
    avatar?: string
  }
  favourited: boolean
  favouriteArticleById: (id: number, favourite: () => void) => void
  unfavouriteArticleById: (id: number) => void
}

export const Article: React.FC<IArticle> = ({
  id,
  title,
  publishedAt,
  image,
  content,
  author,
  favourited,
  favouriteArticleById,
  unfavouriteArticleById,
}) => {
  const formatterdDate = formatDateToShortMonth(
    publishedAt || new Date().toISOString(),
  )
  const [favorite, setFavorite] = useState(favourited)

  return (
    <article>
      <div className="flex flex-col gap-4 pb-6 border-b border-[#cecece]">
        <h1 className="text-2xl lg:text-4xl">{title}</h1>
        <span className="flex justify-between items-center">
          <span className="flex gap-2 items-center">
            <CustomAvatar src={author?.avatar} />
            <p data-testid="published-at">
              Por <b>{author?.name}</b> - {formatterdDate}
            </p>
          </span>
          <Heart
            data-testid="favourite-toogle"
            className="cursor-pointer"
            fill={favorite ? 'red' : 'white'}
            color={favorite ? 'red' : undefined}
            onClick={() => {
              if (!favorite) {
                favouriteArticleById(id, () => {
                  setFavorite(true)
                })
              } else {
                unfavouriteArticleById(id)
              }
            }}
          />
        </span>
      </div>
      <img className="mt-5 w-full" src={image} alt={title} />
      <p data-testid="article-content" className="p-4 text-lg">
        {content}
      </p>
    </article>
  )
}
