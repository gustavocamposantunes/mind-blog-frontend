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
  title: string
  description: string
  footer: ReactNode
}

export const CustomCard: React.FC<ICustomCard> = ({
  id,
  onClick,
  headerImageSrc,
  title,
  description,
  footer,
}) => (
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
          className="flex-1"
          src={headerImageSrc}
          alt={title}
        />
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
