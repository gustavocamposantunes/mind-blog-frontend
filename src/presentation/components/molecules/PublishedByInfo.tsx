import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/presentation/components/ui/avatar'
import { formatDateToShortMonth } from '@/presentation/utils/dateFormatter'

interface IPublishedByInfo {
  avatar?: string
  author?: string
  publishedAt: string
}

export const PublishedByInfo: React.FC<IPublishedByInfo> = ({
  avatar,
  author,
  publishedAt,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return '??'
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const formattedDate = formatDateToShortMonth(publishedAt)
  return (
    <div className="flex items-center gap-2">
      <Avatar data-testid="avatar">
        <AvatarImage
          data-testid="avatar-image"
          src={avatar}
          alt="avatar image"
        />
        <AvatarFallback>{getInitials(author)}</AvatarFallback>
      </Avatar>
      <span data-testid="published-by-info">
        Por {author ?? 'Desconhecido'} - {formattedDate}
      </span>
    </div>
  )
}
