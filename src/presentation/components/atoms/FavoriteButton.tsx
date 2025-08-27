import { Heart } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'

export const FavoriteButton = () => {
  const [toogleFavorite, setToogleFavorite] = useState(false)
  return (
    <Button data-testid="favorite-btn" onClick={() => setToogleFavorite(true)}>
      <Heart
        data-testid="favorite-icon"
        fill={toogleFavorite ? 'red' : 'white'}
      />
    </Button>
  )
}
