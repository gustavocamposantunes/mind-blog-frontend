import { Heart } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'

interface IFavoriteButton {
  articleId: number
  isFavorited?: boolean
  isCurrentUserAndLoggedIn: boolean
  favoriteById: (id: number, favourite: () => boolean) => void
}

export const FavoriteButton: React.FC<IFavoriteButton> = ({
  articleId,
  isFavorited = false,
  isCurrentUserAndLoggedIn,
  favoriteById,
}) => {
  const [toogleFavorite, setToogleFavorite] = useState(isFavorited)
  return isCurrentUserAndLoggedIn ? (
    <Button
      data-testid="favorite-btn"
      onClick={(e) => {
        e.stopPropagation()
        favoriteById(articleId, () => {
          setToogleFavorite(!toogleFavorite)

          return toogleFavorite
        })
      }}
    >
      <Heart
        data-testid="favorite-icon"
        fill={toogleFavorite ? 'red' : 'white'}
      />
    </Button>
  ) : null
}
