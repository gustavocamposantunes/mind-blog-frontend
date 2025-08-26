import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface ICustomCard {
  id: string
  onClick(): void
  title: string
  description: string
}

export const CustomCard: React.FC<ICustomCard> = ({
  id,
  onClick,
  title,
  description,
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
      <CardDescription data-testid="card-description">
        {description}
      </CardDescription>
    </CardContent>
  </Card>
)
