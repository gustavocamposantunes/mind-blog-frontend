import { Grid3x3, List } from 'lucide-react'

import { Button } from '../ui/button'

type ViewMode = 'grid' | 'list'

interface ArticlesViewToggleProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
}

export const ArticlesViewToggle: React.FC<ArticlesViewToggleProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex gap-2 bg-background/50 border border-border rounded-lg p-1">
      <Button
        onClick={() => onViewChange('grid')}
        variant={currentView === 'grid' ? 'default' : 'ghost'}
        size="sm"
        title="Visualização em grade"
        className="flex items-center gap-2"
      >
        <Grid3x3 className="h-4 w-4" />
        <span className="hidden sm:inline">Grade</span>
      </Button>
      <Button
        onClick={() => onViewChange('list')}
        variant={currentView === 'list' ? 'default' : 'ghost'}
        size="sm"
        title="Visualização em listagem"
        className="flex items-center gap-2"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">Lista</span>
      </Button>
    </div>
  )
}
