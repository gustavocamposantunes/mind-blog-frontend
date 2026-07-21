import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { FavouriteSkeleton } from '../components/atoms/FavouriteSkeleton'
import { PublishedByInfo } from '../components/molecules/PublishedByInfo'
import { Button } from '../components/ui/button'
import { Skeleton } from '../components/ui/skeleton'
import { useArticlesList, useResponsiveLimit } from '../hooks'

import type { ListArticlesUseCase } from '@/domain/usecases'

import { HomeTemplate } from '@/presentation/components/templates/HomeTemplate'
import { FeaturedArticleCard } from '@/presentation/pages/components'

import 'swiper/css'

type HomePageProps = {
  listArticles: ListArticlesUseCase
}

const MAX_EXCERPT_LENGTH = 120

const getHomeArticleExcerpt = (text: string) => {
  const normalized = text.replace(/\s+/g, ' ').trim()

  if (normalized.length <= MAX_EXCERPT_LENGTH) {
    return normalized
  }

  return `${normalized.slice(0, MAX_EXCERPT_LENGTH).trimEnd()}...`
}

export const HomePage: React.FC<HomePageProps> = ({ listArticles }) => {
  const navigate = useNavigate()
  const limit = useResponsiveLimit()
  const featuredErrorToastShown = useRef(false)
  const recentErrorToastShown = useRef(false)
  const {
    error: errorFeatured,
    isLoading: isLoadingFeatured,
    data: dataFeatured,
  } = useArticlesList(listArticles, {
    page: 1,
    limit: 6,
  })
  const {
    error: errorRecent,
    isLoading: isLoadingRecent,
    data: dataRecent,
  } = useArticlesList(listArticles, {
    page: 1,
    limit: 6,
  })

  useEffect(() => {
    if (
      errorFeatured &&
      errorFeatured.message === 'Erro interno do servidor' &&
      !featuredErrorToastShown.current
    ) {
      toast.error(errorFeatured.message)
      featuredErrorToastShown.current = true
    }
  }, [errorFeatured])

  useEffect(() => {
    if (
      errorRecent &&
      errorRecent.message === 'Erro interno do servidor' &&
      !recentErrorToastShown.current
    ) {
      toast.error(errorRecent.message)
      recentErrorToastShown.current = true
    }
  }, [errorRecent])

  return (
    <HomeTemplate>
      <section className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-background via-background to-card/40 px-6 py-16 shadow-2xl shadow-black/10 md:px-12">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Mind Blog
          </p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Explore o Futuro da <span className="text-primary">Tecnologia</span>
          </h1>
          <p className="mt-4 text-sm text-foreground/70 md:text-base">
            Artigos sobre IA, desenvolvimento, DevOps e as ultimas tendencias
            tecnologicas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="action-btn min-w-47.5 px-6 text-white">
              <Link to={`/articles?page=1&limit=${limit}`}>
                Explorar Artigos
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-w-47.5 border-border px-6"
            >
              <Link to="/article/new">Comecar a Escrever</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Artigos em Destaque
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Os melhores conteudos selecionados para voce
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            to={`/articles?page=1&limit=${limit}`}
          >
            Ver todos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoadingFeatured || errorFeatured ? (
          <FavouriteSkeleton />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {dataFeatured?.articles.map((article) => (
              <FeaturedArticleCard
                key={article.id}
                id={String(article.id)}
                testId={`home-featured-article-card-${article.id}`}
                image={article.image}
                title={article.title}
                excerpt={getHomeArticleExcerpt(
                  article.resume || article.content,
                )}
                category={article.category}
                onClick={() => {
                  navigate(`/articles/${article.id}`)
                }}
                footer={
                  <PublishedByInfo
                    avatar={article.author.image}
                    author={article.author.fullName}
                    publishedAt={article.publishedAt}
                  />
                }
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Artigos Recentes
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Conteudo recente da comunidade
          </p>
        </div>

        {isLoadingRecent || errorRecent ? (
          <Skeleton className="h-72 w-full" data-testid="skeleton-recent" />
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1.1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="recent-articles-swiper"
            data-testid="recent-articles-swiper"
          >
            {dataRecent?.articles.map((article) => (
              <SwiperSlide key={article.id}>
                <FeaturedArticleCard
                  id={String(article.id)}
                  testId={`home-recent-article-card-${article.id}`}
                  image={article.image}
                  title={article.title}
                  excerpt={getHomeArticleExcerpt(
                    article.resume || article.content,
                  )}
                  category={article.category}
                  onClick={() => {
                    navigate(`/articles/${article.id}`)
                  }}
                  footer={
                    <PublishedByInfo
                      avatar={article.author.image}
                      author={article.author.fullName}
                      publishedAt={article.publishedAt}
                    />
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <section className="rounded-3xl border border-border bg-linear-to-r from-card/70 via-background to-card/70 px-6 py-12 text-center md:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border text-primary">
            <span className="text-lg">@</span>
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-foreground">
            Newsletter Semanal
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Receba os melhores artigos de tecnologia diretamente no seu email.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="exemplo@email.com"
              className="w-full max-w-sm rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none"
            />
            <Button className="action-btn bg-[#07B6D5] text-white hover:bg-[#07B6D5]/90">
              Inscrever
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card/60 px-6 py-12 text-center md:px-12">
        <h2 className="text-2xl font-semibold text-foreground">
          Compartilhe Seu Conhecimento
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Junte-se a nossa comunidade de escritores e compartilhe suas
          experiencias e conhecimentos em tecnologia.
        </p>
        <Button asChild className="action-btn mt-6 min-w-55 px-6 text-white">
          <Link to="/register">Criar Conta Gratuita</Link>
        </Button>
      </section>
    </HomeTemplate>
  )
}
