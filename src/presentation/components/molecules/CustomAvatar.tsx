import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/presentation/components/ui/avatar'

type CustomAvatarProps = {
  src?: string
} & React.ComponentProps<typeof Avatar>

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  className,
  src,
}) => (
  <Avatar className={className} data-testid="avatar">
    <AvatarImage
      data-testid="avatar-image"
      src={src ?? 'https://github.com/shadcn.png'}
      alt="avatar image"
    />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)
