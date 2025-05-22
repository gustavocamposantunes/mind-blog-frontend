import { Avatar, AvatarImage, AvatarFallback } from "@/presentation/components/ui/avatar";

type CustomAvatarProps = React.ComponentProps<typeof Avatar>;

export const CustomAvatar: React.FC<CustomAvatarProps> = ({ className }) => (
  <Avatar className={className}>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);