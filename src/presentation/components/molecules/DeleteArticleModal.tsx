import { Button } from '../ui/button'

type DeleteArticleModalProps = {
  isOpen: boolean
  articleTitle?: string
  onCancel(): void
  onConfirm(): void
}

export const DeleteArticleModal: React.FC<DeleteArticleModalProps> = ({
  isOpen,
  articleTitle,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-article-title"
        className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl shadow-black/30"
      >
        <h3
          id="delete-article-title"
          className="text-xl font-semibold text-foreground"
        >
          Excluir artigo
        </h3>
        <p className="mt-3 text-sm text-foreground/70">
          {articleTitle
            ? `Tem certeza que deseja excluir "${articleTitle}"? Esta ação não pode ser desfeita.`
            : 'Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.'}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-border"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  )
}
