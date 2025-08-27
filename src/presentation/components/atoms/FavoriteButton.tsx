import { Heart } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'

interface IFavoriteButton {
  isFavorited?: boolean
  favoriteById: (id: number, favourite: () => boolean) => void
}

export const FavoriteButton: React.FC<IFavoriteButton> = ({
  isFavorited = false,
  favoriteById,
}) => {
  const [toogleFavorite, setToogleFavorite] = useState(isFavorited)
  return (
    <Button
      data-testid="favorite-btn"
      onClick={(e) => {
        e.stopPropagation()
        favoriteById(1, () => {
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
  )
}
