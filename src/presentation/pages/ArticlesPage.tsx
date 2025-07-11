import { useArticlesList, useFavouriteArticle } from '../hooks'

import type { FavouriteArticleUseCase, ListArticlesUseCase } from '@/domain/usecases'

import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { ArticlesTemplate } from '@/presentation/components/templates'
import { useAuthStore } from '../store'
import { toast } from 'react-toastify'

type ArticlessPageProps = {
  listArticles: ListArticlesUseCase
  favouriteArticle: FavouriteArticleUseCase
}

export const ArticlesPage: React.FC<ArticlessPageProps> = ({
  listArticles,
  favouriteArticle
}) => {
  const { user, accessToken } = useAuthStore()
  
  const { data, isLoading } = useArticlesList(listArticles)

  const { mutate } = useFavouriteArticle(favouriteArticle)

  const favouriteArticleById = (id: number, favourite: () => void) => {
    mutate({
      id,
      token: accessToken
    },
    {
      onError: (error) => toast.error(error.message)
    }
  )
  }

  return (
    <ArticlesTemplate isLoading={isLoading}>
      {data?.articles.map(({ ...props }) => (
        <ArticleCard
          key={props.id}
          {...props}
          isLoggedIn={!!accessToken}
          authUserId={user.id}
          favouriteArticleById={favouriteArticleById}
        />
      ))}
    </ArticlesTemplate>
  )
}
