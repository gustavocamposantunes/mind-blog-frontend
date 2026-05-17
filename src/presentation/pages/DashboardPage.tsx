import { PencilIcon, TrashIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ArticlesViewToggle, CustomSkeleton } from '../components/atoms'
import {
  DeleteArticleModal,
  Footer,
  PublishedByInfo,
} from '../components/molecules'
import { ArticleListCard, CustomCard } from '../components/organism'
import { Button } from '../components/ui/button'
import { useResponsivePagination } from '../hooks'
import { useArticlesFilters, useArticlesList, useDeleteArticle } from '../hooks'
import { useAuthStore } from '../store'

import type { ListArticlesUseCase } from '@/domain/usecases'
import type { DeleteArticleByIdUseCase } from '@/domain/usecases/article/delete-article-by-id.usecase'

import { CustomPagination } from '@/presentation/components/organism'
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
  const { currentPage, currentLimit, currentView, updateFilters, pageParams } =
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

  useEffect(() => {
    if (error) {
      setSelectedArticle(null)
    }
  }, [error])

  const articles = data?.articles ?? []

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
        <section className="mb-10 flex flex-col gap-6 rounded-3xl border border-border bg-gradient-to-br from-background via-background to-card/40 px-6 py-8 shadow-xl shadow-black/10 md:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
                Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Bem-vindo de volta, {user.fullName}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-foreground/70 md:text-base">
                Acompanhe as interações nos seus artigos, edite conteúdos e
                gerencie exclusões com segurança.
              </p>
            </div>
            <Button asChild className="action-btn w-fit text-white">
              <Link to="/article/new">Novo Artigo</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-2xl border border-border bg-card/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                  {metric.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-foreground">
                  {metric.value}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Meus Artigos
                </h2>
                <p className="mt-1 text-sm text-foreground/60">
                  Artigos que podem ser editados ou excluídos por você.
                </p>
              </div>
              <ArticlesViewToggle
                currentView={currentView}
                onViewChange={(view) => updateFilters({ view, page: 1 })}
              />
            </div>

            <section
              className={
                currentView === 'list'
                  ? 'flex flex-col gap-4'
                  : 'grid gap-4 lg:grid-cols-2'
              }
            >
              {isLoading || error ? (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <CustomSkeleton key={`dashboard-skeleton-${index}`} />
                  ))}
                </>
              ) : (
                <>
                  {articles.map((article) => {
                    const actions = (
                      <span
                        className="flex gap-2"
                        key={`${article.id}-actions`}
                      >
                        <Button
                          onClick={(event) => {
                            event.stopPropagation()
                            navigate(`/article/edit/${article.id}`)
                          }}
                          className="bg-blue-600!"
                          data-testid={`edit-btn-${article.id}`}
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          onClick={(event) => {
                            event.stopPropagation()
                            setSelectedArticle({
                              id: article.id,
                              title: article.title,
                            })
                          }}
                          className="bg-red-600!"
                          data-testid={`delete-btn-${article.id}`}
                        >
                          <TrashIcon />
                        </Button>
                      </span>
                    )

                    const footer = [
                      <PublishedByInfo
                        avatar={article.author.avatar}
                        author={article.author.firstName}
                        publishedAt={article.publishedAt}
                        key={`${article.id}-published`}
                      />,
                      actions,
                    ]

                    const commonProps = {
                      id: String(article.id),
                      headerImageSrc: article.image,
                      title: article.title,
                      description: article.resume ?? article.content,
                      category: article.category,
                      onClick: () => navigate(`/articles/${article.id}`),
                      footer,
                    }

                    if (currentView === 'list') {
                      return (
                        <ArticleListCard key={article.id} {...commonProps} />
                      )
                    }

                    return (
                      <CustomCard
                        key={article.id}
                        {...commonProps}
                        imageClassName="h-52 w-full object-cover"
                      />
                    )
                  })}
                </>
              )}
            </section>

            {totalPages > 1 ? (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                className="mt-4"
                changePage={(page: number) => updateFilters({ page })}
              />
            ) : null}
          </div>

          <aside className="rounded-3xl border border-border bg-card/60 p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Atividade recente
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
              Resumo dos artigos mais recentes publicados por você.
            </p>

            <div className="mt-6 space-y-4">
              {articles.slice(0, 3).map((article) => (
                <article
                  key={`recent-${article.id}`}
                  className="rounded-2xl border border-border bg-background/70 p-4"
                >
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {article.title}
                  </p>
                  <p className="mt-2 text-xs text-foreground/60">
                    {article.favouriteCount} curtidas recebidas
                  </p>
                  <p className="mt-1 text-xs text-foreground/50">
                    Publicado em{' '}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                </article>
              ))}
              {!articles.length && !isLoading ? (
                <p className="text-sm text-foreground/60">
                  Você ainda não publicou artigos.
                </p>
              ) : null}
            </div>
          </aside>
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
