import { FavouritesList } from '../components/organism'
import { useArticlesList, useGetNews } from '../hooks'

import type { ListArticlesUseCase } from '@/domain/usecases'
import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
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
      <ArticleCard
        id={1}
        className="xl:col-span-2"
        title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript"
        content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..."
        redirect="1"
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
