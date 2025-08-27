import { Heart } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'

interface IFavoriteButton {
  isFavorited?: boolean
}

export const FavoriteButton: React.FC<IFavoriteButton> = ({
  isFavorited = false,
}) => {
  const [toogleFavorite, setToogleFavorite] = useState(isFavorited)
  return (
    <Button
      data-testid="favorite-btn"
      onClick={(e) => {
        e.stopPropagation()
        setToogleFavorite(!toogleFavorite)
      }}
    >
      <Heart
        data-testid="favorite-icon"
        fill={toogleFavorite ? 'red' : 'white'}
      />
    </Button>
  )
}
