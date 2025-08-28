import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/presentation/components/ui/avatar'
import { formatDateToShortMonth } from '@/presentation/utils/dateFormatter'

interface IPublishedByInfo {
  avatar: string
  publishedAt: string
}

export const PublishedByInfo: React.FC<IPublishedByInfo> = ({
  avatar,
  publishedAt,
}) => {
  const formattedDate = formatDateToShortMonth(publishedAt)
  return (
    <div>
      <Avatar data-testid="avatar">
        <AvatarImage
          data-testid="avatar-image"
          src={avatar}
          alt="avatar image"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span data-testid="published-by-info">{formattedDate}</span>
    </div>
  )
}
