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
  className?: string
  title: string
  description: string
  footer: ReactNode
  ranking?: string
  category?: string
}

export const CustomCard: React.FC<ICustomCard> = ({
  id,
  onClick,
  headerImageSrc,
  imageClassName,
  className,
  title,
  description,
  footer,
  ranking,
  category,
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
      className={`pt-0 cursor-pointer hover:shadow-lg transition-shadow ${className ?? ''}`.trim()}
      key={id}
      onClick={onClick}
      data-testid={`custom-card-${id}`}
    >
      <CardHeader className="px-0" data-testid="custom-card-header">
        <div className="flex">
          <img
            data-testid="header-image"
            className={`flex-1 ${imageClassName} ${rankingImage ? '' : 'rounded-tr-md'} rounded-tl-md`}
            src={headerImageSrc}
            alt={title}
          />
          {rankingImage}
        </div>
        {category ? (
          <span className="px-6 pt-4 text-xs font-semibold uppercase tracking-wide text-primary/80">
            {category}
          </span>
        ) : null}
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
