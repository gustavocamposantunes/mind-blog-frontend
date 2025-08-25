import { useNavigate } from 'react-router-dom'

import { Button } from '@/presentation/components/ui/button'
import { useResponsiveLimit } from '@/presentation/hooks'

interface IFormHeader {
  title: string
}

export const FormHeader: React.FC<IFormHeader> = ({ title }) => {
  const navigate = useNavigate()
  const limit = useResponsiveLimit()

  return (
    <section className="flex justify-between w-full" data-testid="form-header">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex gap-2">
        <Button
          className="orange-btn action-btn"
          type="button"
          onClick={() => navigate(`/articles?page=1&limit=${limit}`)}
        >
          Cancelar
        </Button>
        <Button className="action-btn" type="submit">
          Salvar
        </Button>
      </div>
    </section>
  )
}
