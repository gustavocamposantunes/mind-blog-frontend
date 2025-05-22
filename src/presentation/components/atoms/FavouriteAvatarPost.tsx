import { CustomAvatar } from "@/presentation/components/molecules/CustomAvatar"

interface IFavouriteAvatarPost {
  favourite?: string;
}

export const FavouriteAvatarPost: React.FC<IFavouriteAvatarPost> = ({ favourite }) => (
  <span className="flex gap-2 items-center">
    {favourite ? null : <CustomAvatar />}
    {favourite ? <p>Março 20, 2025</p> : <p>Por <b>John Doe</b> - Março 20, 2025</p>}
  </span>
)