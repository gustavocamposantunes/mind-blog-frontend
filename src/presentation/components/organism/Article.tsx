import { Heart } from 'lucide-react'

import { FavouriteAvatarPost } from '../atoms'

interface IArticle {
  title: string
  publishedAt: string
  image: string
  content: string
}

export const Article: React.FC<IArticle> = ({
  title,
  publishedAt,
  image,
  content,
}) => (
  <article>
    <div className="flex flex-col gap-4 pb-6 border-b border-[#cecece]">
      <h1 className="text-2xl lg:text-4xl">{title}</h1>
      <span className="flex justify-between items-center">
        <FavouriteAvatarPost publishedAt={publishedAt} />
        <Heart />
      </span>
    </div>
    <img className="mt-5 w-full" src={image} alt={title} />
    <p data-testid="article-content" className="p-4 text-lg">
      {content}
    </p>
  </article>
)
