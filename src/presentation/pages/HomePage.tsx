import { Heart } from 'lucide-react'

import { Skeleton } from '../components/ui/skeleton'
import { useGetNews } from '../hooks'

import type { GetNewsUseCase } from '@/domain/usecases/news/get-news.usecase'

import { ArticleCard } from '@/presentation/components/organism/ArticleCard'
import { News } from '@/presentation/components/organism/News'
import { HomeTemplate } from '@/presentation/components/templates'

type HomePageProps = {
  getNews: GetNewsUseCase
}

export const HomePage: React.FC<HomePageProps> = ({ getNews }) => {
  const { isLoading, data } = useGetNews(getNews)
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
      <ArticleCard
        id={1}
        title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript"
        content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..."
        favourite="01"
      />
      <ArticleCard
        id={1}
        title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript"
        content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..."
        favourite="02"
      />
      <ArticleCard
        id={1}
        title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript"
        content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..."
        favourite="03"
      />
    </HomeTemplate>
  )
}
