import { Search, X } from 'lucide-react'
import { useCallback } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ArticlesFiltersProps {
  title?: string
  category?: string
  onTitleChange: (title: string) => void
  onCategoryChange: (category: string) => void
  onReset: () => void
  categories?: string[]
}

export const ArticlesFilters: React.FC<ArticlesFiltersProps> = ({
  title = '',
  category = '',
  onTitleChange,
  onCategoryChange,
  onReset,
  categories = [],
}) => {
  const hasActiveFilters = title !== '' || category !== ''

  const handleReset = useCallback(() => {
    onReset()
  }, [onReset])

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:gap-4 md:items-end">
        <div className="flex-1">
          <label htmlFor="title-search" className="text-sm font-medium text-foreground block mb-2">
            Buscar por Título
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="title-search"
              type="text"
              placeholder="Digite o título..."
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex-1">
            <label htmlFor="category-filter" className="text-sm font-medium text-foreground block mb-2">
              Categoria
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#07B6D5] focus-visible:ring-[#07B6D5]/50 focus-visible:ring-[3px]"
            >
              <option value="">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {hasActiveFilters && (
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  )
}
