import { CustomAvatar } from "@/presentation/components/molecules/CustomAvatar"
import { formatDateToShortMonth } from "@/presentation/utils/dateFormatter";

interface IFavouriteAvatarPost {
  favourite?: string;
  publishedAt?: string;
}

export const FavouriteAvatarPost: React.FC<IFavouriteAvatarPost> = ({ favourite, publishedAt }) => {
  const formatterdDate = formatDateToShortMonth(publishedAt || new Date().toISOString());
  return (
    <span className="flex gap-2 items-center">
      {favourite ? null : <CustomAvatar />}
      {favourite ? <p data-testid="published-at">{formatterdDate}</p> : <p data-testid="published-at">Por <b>John Doe</b> - {formatterdDate}</p>}
    </span>
  )
}