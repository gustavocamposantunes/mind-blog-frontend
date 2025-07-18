import { ErrorMessage } from '../atoms'
import { Skeleton } from '../ui/skeleton'

import { ArticleCard } from './ArticleCard'

import type React from 'react'

interface IFavouritesSlider {
  error: Error | null
  isLoading: boolean
}

export const FavouritesSlider: React.FC<IFavouritesSlider> = ({
  error,
  isLoading,
}) => {
  if (error) return <ErrorMessage error={error} />
  if (isLoading) return <Skeleton data-testid="skeleton-slider" />

  return (
    <ArticleCard
      id={1}
      className="xl:col-span-2"
      title="Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript"
      content="TypeScript, uma superconjunto de JavaScript, tem se tornado uma escolha popular entre desenvolvedores para garantir código mais seguro e fácil de manter. Neste artigo, vamos explorar os benefícios da tipagem estática no..."
      redirect="1"
    />
  )
}
