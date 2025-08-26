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
  title: string
  description: string
  footerSlot: ReactNode
}

export const CustomCard: React.FC<ICustomCard> = ({
  id,
  onClick,
  title,
  description,
  footerSlot,
}) => (
  <Card
    className="pt-0 cursor-pointer hover:shadow-lg transition-shadow"
    key={id}
    onClick={onClick}
    data-testid={`custom-card-${id}`}
  >
    <CardHeader data-testid="custom-card-header">
      <CardTitle data-testid="header-title">{title}</CardTitle>
    </CardHeader>
    <CardContent data-testid="custom-card-content">
      <p data-testid="card-description">{description}</p>
    </CardContent>
    <CardFooter
      className="flex justify-between mt-auto"
      data-testid="custom-card-footer"
    >
      {footerSlot}
    </CardFooter>
  </Card>
)
