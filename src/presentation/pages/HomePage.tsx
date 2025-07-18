import { FavouritesList, FavouritesSlider } from '../components/organism'
import { useArticlesList, useGetNews } from '../hooks'

import type { ListArticlesUseCase } from '@/domain/usecases'
import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import { News } from '@/presentation/components/organism/News'
import { HomeTemplate } from '@/presentation/components/templates'

type HomePageProps = {
  getNews: GetNewsUseCase
  listArticles: ListArticlesUseCase
}

export const HomePage: React.FC<HomePageProps> = ({
  getNews,
  listArticles,
}) => {
  const { isLoading: isLoadingNews, data: dataNews } = useGetNews(getNews)
  const {
    error: errorFavourites,
    isLoading: isLoadingFavourites,
    data: dataFavourites,
  } = useArticlesList(listArticles, {
    page: 1,
    limit: 3,
    filters: ['mostFavouriteds'],
  })

  return (
    <HomeTemplate>
      <FavouritesSlider
        error={errorFavourites}
        isLoading={isLoadingFavourites}
        articles={dataFavourites?.articles}
      />
      <News
        isLoading={isLoadingNews}
        news={dataNews?.articles}
        className="xl:col-span-1"
      />
      <FavouritesList
        error={errorFavourites}
        isLoading={isLoadingFavourites}
        articles={dataFavourites?.articles}
      />
    </HomeTemplate>
  )
}
