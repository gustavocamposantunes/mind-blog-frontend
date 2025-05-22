import { Heart } from "lucide-react";

interface IFavouriteHeartCount {
  favourite?: string;
}

export const FavouriteHeartCount: React.FC<IFavouriteHeartCount> = ({ favourite }) => favourite ? (
  <span className="flex gap-2">
    <Heart color="#FF3B30" fill="#FF3B30" />
    <p>16</p>
  </span>
) : null