import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/presentation/components/ui/avatar'

interface IPublishedByInfo {
  avatar: string
}

export const PublishedByInfo: React.FC<IPublishedByInfo> = ({ avatar }) => (
  <Avatar data-testid="avatar">
    <AvatarImage data-testid="avatar-image" src={avatar} alt="avatar image" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)
