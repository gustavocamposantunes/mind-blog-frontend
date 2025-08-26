import { Card } from '../ui/card'

interface ICustomCard {
  id: string
  onClick(): void
}

export const CustomCard: React.FC<ICustomCard> = ({ id, onClick }) => (
  <Card
    className="pt-0 cursor-pointer hover:shadow-lg transition-shadow"
    key={id}
    onClick={onClick}
    data-testid={`custom-card-${id}`}
  ></Card>
)
