import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

import type { ReactNode } from 'react'

interface ICustomCard {
  id: string
  onClick(): void
  headerImageSrc?: string
  imageClassName?: string
  title: string
  description: string
  footer: ReactNode
  ranking?: string
}

export const CustomCard: React.FC<ICustomCard> = ({
  id,
  onClick,
  headerImageSrc,
  imageClassName,
  title,
  description,
  footer,
  ranking,
}) => {
  let rankingImage
  if (ranking)
    rankingImage = (
      <div className="flex flex-1 items-center justify-center">
        <h1 className="irish-grove-font text-4xl">{ranking}</h1>
      </div>
    )

  return (
    <Card
      className="pt-0 cursor-pointer hover:shadow-lg transition-shadow"
      key={id}
      onClick={onClick}
      data-testid={`custom-card-${id}`}
    >
      <CardHeader className="px-0" data-testid="custom-card-header">
        <div className="flex">
          <img
            data-testid="header-image"
            className={`flex-1 ${imageClassName}`}
            src={headerImageSrc}
            alt={title}
          />
          {rankingImage}
        </div>
        <CardTitle className="px-6" data-testid="header-title">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent data-testid="custom-card-content">
        <p data-testid="card-description">{description}</p>
      </CardContent>
      <CardFooter
        className="flex justify-between mt-auto"
        data-testid="custom-card-footer"
      >
        {footer}
      </CardFooter>
    </Card>
  )
}
