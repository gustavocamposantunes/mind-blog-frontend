import { Heart } from 'lucide-react'

import { ErrorMessage } from '../components/atoms'
import { Skeleton } from '../components/ui/skeleton'
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
  const { isLoading, data } = useGetNews(getNews)
  const {
    error,
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
      {isLoading ? (
        <Skeleton data-testid="skeleton-news" />
      ) : (
        <News news={data?.articles} className="xl:col-span-1" />
      )}
      <span className="lg:col-spa2 xl:col-span-3 flex items-center gap-2">
        <Heart />
        <h1 className="text-3xl py-2">Mais curtidos</h1>
      </span>
      {error ? <ErrorMessage error={error}></ErrorMessage> : null}
      {isLoadingFavourites ? (
        <>
          <Skeleton data-testid="skeleton-favourits" />
          <Skeleton data-testid="skeleton-favourits" />
          <Skeleton data-testid="skeleton-favourits" />
        </>
      ) : null}
      {dataFavourites
        ? dataFavourites.articles.map(
            ({ id, title, content, image }, index) => (
              <ArticleCard
                key={id}
                id={id}
                title={title}
                content={content}
                image={image}
                favourite={`0${index + 1}`}
              />
            ),
          )
        : null}
    </HomeTemplate>
  )
}
