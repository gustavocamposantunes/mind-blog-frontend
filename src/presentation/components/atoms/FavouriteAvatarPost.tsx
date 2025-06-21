import { CustomAvatar } from "@/presentation/components/molecules/CustomAvatar"

interface IFavouriteAvatarPost {
  favourite?: string;
  publishedAt?: string;
}

export const FavouriteAvatarPost: React.FC<IFavouriteAvatarPost> = ({ favourite, publishedAt }) => (
  <span className="flex gap-2 items-center">
    {favourite ? null : <CustomAvatar />}
    {favourite ? <p data-testid="published-at">{publishedAt}</p> : <p data-testid="published-at">Por <b>John Doe</b> - {publishedAt}</p>}
  </span>
)