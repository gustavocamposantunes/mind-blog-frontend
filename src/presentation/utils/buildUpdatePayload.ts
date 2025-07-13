import type { ArticleModel } from '@/domain/models'

type EditableFields = Pick<ArticleModel, 'title' | 'content' | 'image'>

export function buildUpdatePayload(
  id: number,
  original: EditableFields,
  edited: EditableFields,
) {
  const payload = {
    id,
    title: edited.title !== original.title ? edited.title : undefined,
    content: edited.content !== original.content ? edited.content : undefined,
    image: edited.image !== original.image ? edited.image : undefined,
  }

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as Partial<EditableFields> & { id: number }
}
