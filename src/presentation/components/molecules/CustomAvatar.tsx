import { Avatar, AvatarImage, AvatarFallback } from "@/presentation/components/ui/avatar";

type CustomAvatarProps = {
  src?: string;
} & React.ComponentProps<typeof Avatar>;

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  className,
  src
}) => (
  <Avatar className={className}>
    <AvatarImage src={src ?? "https://github.com/shadcn.png"} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);