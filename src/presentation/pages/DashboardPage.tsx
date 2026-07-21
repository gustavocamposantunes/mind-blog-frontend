import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DeleteArticleModal, Footer } from '../components/molecules'
import { useResponsivePagination } from '../hooks'
import { useArticlesFilters, useArticlesList, useDeleteArticle } from '../hooks'
import { useAuthStore } from '../store'
import {
  DashboardArticlesSection,
  DashboardHeroSection,
  DashboardRecentActivity,
} from './components'

import type { ListArticlesUseCase } from '@/domain/usecases'
import type { DeleteArticleByIdUseCase } from '@/domain/usecases/article/delete-article-by-id.usecase'

import { PageTemplate } from '@/presentation/components/templates'

type DashboardPageProps = {
  listArticles: ListArticlesUseCase
  deleteArticle: DeleteArticleByIdUseCase
}

const averageReadingTime = (content: string[]) => {
  const totalWords = content.reduce(
    (total, articleContent) =>
      total + articleContent.split(/\s+/).filter(Boolean).length,
    0,
  )

  if (!content.length) {
    return 1
  }

  return Math.max(1, Math.ceil(totalWords / content.length / 200))
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  listArticles,
  deleteArticle,
}) => {
  useResponsivePagination()
  const dashboardPageLimit = 5

  const navigate = useNavigate()
  const { user, accessToken } = useAuthStore()
  const { currentPage, currentView, updateFilters, pageParams } =
    useArticlesFilters()

  const [selectedArticle, setSelectedArticle] = useState<{
    id: number
    title: string
  } | null>(null)

  const { data, isLoading, error, refetch } = useArticlesList(listArticles, {
    ...pageParams,
    limit: dashboardPageLimit,
    userId: user.id,
  })

  const { deleteById } = useDeleteArticle(deleteArticle, accessToken, {
    onSuccess: () => {
      refetch()
    },
  })

  const articles = useMemo(() => data?.articles ?? [], [data?.articles])

  const metrics = useMemo(() => {
    const totalLikes = articles.reduce(
      (total, article) => total + (article.favouriteCount ?? 0),
      0,
    )
    const readingTime = averageReadingTime(
      articles.map((article) => article.content),
    )

    return [
      { label: 'Artigos publicados', value: String(data?.total ?? 0) },
      { label: 'Curtidas recebidas', value: String(totalLikes) },
      {
        label: 'Engajamento',
        value: articles.length
          ? `${Math.ceil(totalLikes / articles.length)} / artigo`
          : '0',
      },
      { label: 'Tempo médio de leitura', value: `${readingTime} min` },
    ]
  }, [articles, data?.total])

  const totalPages = data ? Math.ceil(data.total / dashboardPageLimit) : 0

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageTemplate>
        <DashboardHeroSection userFullName={user.fullName} metrics={metrics} />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
          <DashboardArticlesSection
            articles={articles}
            currentPage={currentPage}
            currentView={currentView}
            hasError={!!error}
            isLoading={isLoading}
            totalPages={totalPages}
            onDeleteArticle={setSelectedArticle}
            onEditArticle={(articleId) =>
              navigate(`/article/edit/${articleId}`)
            }
            onOpenArticle={(articleId) => navigate(`/articles/${articleId}`)}
            onPageChange={(page) => updateFilters({ page })}
            onViewChange={(view) => updateFilters({ view, page: 1 })}
          />

          <DashboardRecentActivity articles={articles} isLoading={isLoading} />
        </section>
      </PageTemplate>

      <div className="mt-10">
        <Footer />
      </div>

      <DeleteArticleModal
        isOpen={!!selectedArticle}
        articleTitle={selectedArticle?.title}
        onCancel={() => setSelectedArticle(null)}
        onConfirm={async () => {
          if (!selectedArticle) {
            return
          }

          const articleId = selectedArticle.id
          setSelectedArticle(null)
          await deleteById(articleId)
        }}
      />
    </div>
  )
}
