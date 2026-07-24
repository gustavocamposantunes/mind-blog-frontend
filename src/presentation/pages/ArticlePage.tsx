import { Heart, PencilIcon } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CustomAvatar } from '../components/molecules/CustomAvatar'
import { Article } from '../components/organism/Article'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'
import { useComments, useFavouriteArticle, useGetArticleById } from '../hooks'
import { getUserFromAccessToken, useAuthStore } from '../store'
import { formatDateToShortMonth } from '../utils/dateFormatter'

import type { CommentModel } from '@/domain/models'
import type {
  CommentArticleUseCase,
  FavouriteArticleUseCase,
  GetArticleByIdUseCase,
  ListCommentsByArticleIdUseCase,
} from '@/domain/usecases'

import { ArticleTemplate } from '@/presentation/components/templates/ArticleTemplate'

type ArticlePageProps = {
  getArticletById: GetArticleByIdUseCase
  favouriteArticle: FavouriteArticleUseCase
  listCommentsByArticleId: ListCommentsByArticleIdUseCase
  commentArticle: CommentArticleUseCase
}

type FavouriteToggleButtonProps = {
  articleId: number
  initialFavourite: boolean
  favoriteById: (articleId: number, favourite: () => boolean) => Promise<void>
}

const FavouriteToggleButton: React.FC<FavouriteToggleButtonProps> = ({
  articleId,
  initialFavourite,
  favoriteById,
}) => {
  const [toogleFavourite, setToogleFavourite] = useState(initialFavourite)

  return (
    <Heart
      data-testid="favourite-toogle"
      className="cursor-pointer"
      fill={toogleFavourite ? 'red' : 'white'}
      color={toogleFavourite ? 'red' : undefined}
      onClick={() => {
        favoriteById(articleId, () => {
          const previousFavourite = toogleFavourite

          setToogleFavourite((currentFavourite) => !currentFavourite)

          return previousFavourite
        })
      }}
    />
  )
}

type CommentsSectionProps = {
  accessToken: string
  comments: CommentModel[]
  onSubmit: (content: string) => Promise<void>
  isSubmitting: boolean
}

const getInitials = (name?: string) =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const CommentsSection: React.FC<CommentsSectionProps> = ({
  accessToken,
  comments,
  onSubmit,
  isSubmitting,
}) => {
  const [content, setContent] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedContent = content.trim()
    if (trimmedContent.length < 5) return

    await onSubmit(trimmedContent)
    setContent('')
  }

  return (
    <section className="mt-10 border-t border-[#cecece] pt-6">
      <h2 className="text-xl font-semibold">Comentários</h2>

      {accessToken && (
        <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-sm font-medium" htmlFor="comment-content">
            Comentário
          </label>
          <Textarea
            id="comment-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <Button
            className="self-start"
            disabled={isSubmitting || content.trim().length < 5}
            type="submit"
          >
            Comentar
          </Button>
        </form>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {comments.map((comment) => (
          <article
            className="border-b border-[#e5e5e5] pb-4"
            data-testid="comment-item"
            key={comment.id}
          >
            <div className="flex items-center gap-2">
              <CustomAvatar
                src={comment.user.image}
                fallbackText={getInitials(comment.user.fullName)}
              />
              <div className="flex flex-col">
                <strong className="text-sm">{comment.user.fullName}</strong>
                <span className="text-xs text-stone-500">
                  {formatDateToShortMonth(comment.createdAt)}
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              {comment.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  getArticletById,
  favouriteArticle,
  listCommentsByArticleId,
  commentArticle,
}) => {
  const { accessToken } = useAuthStore()
  const user = getUserFromAccessToken(accessToken)

  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetArticleById(
    getArticletById,
    String(id),
    accessToken ? user?.id : undefined,
  )
  const { favoriteById } = useFavouriteArticle(favouriteArticle, accessToken)
  const { commentsQuery, commentMutation } = useComments(
    listCommentsByArticleId,
    commentArticle,
    data?.id,
    accessToken,
  )

  let toogleFavouriteSlot: ReactNode | undefined = undefined
  let toogleEditSlot: ReactNode | undefined = undefined

  if (accessToken && data && user?.id !== data.author.id) {
    toogleFavouriteSlot = (
      <span
        className="text-stone-500 flex gap-2 font-bold"
        data-testid="favourite-count"
      >
        <FavouriteToggleButton
          key={data.id}
          articleId={data.id}
          initialFavourite={data.favourited}
          favoriteById={favoriteById}
        />
        {data.favouriteCount}
      </span>
    )
  } else if (accessToken) {
    toogleEditSlot = (
      <Link to={`/article/edit/${id}`} data-testid="toogle-edit">
        <PencilIcon />
      </Link>
    )
  }

  return (
    <ArticleTemplate isLoading={isLoading} error={error}>
      {data && (
        <>
          <Article
            title={data.title}
            publishedAt={data.publishedAt}
            image={data.image}
            content={data.content}
            author={{
              id: data.author.id,
              firstName: data.author.fullName,
              avatar: data.author.image,
            }}
            toogleFavouriteSlot={toogleFavouriteSlot}
            toogleEditSlot={toogleEditSlot}
          />
          <CommentsSection
            accessToken={accessToken}
            comments={commentsQuery.data ?? []}
            isSubmitting={commentMutation.isPending}
            onSubmit={(content) =>
              commentMutation.mutateAsync({
                article_id: data.id,
                content,
              })
            }
          />
        </>
      )}
    </ArticleTemplate>
  )
}
