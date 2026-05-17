import type { ArticleModel } from '@/domain/models'

type EditableFields = Pick<
  ArticleModel,
  'title' | 'resume' | 'content' | 'image' | 'category' | 'tags'
>

export function buildUpdateArticlePayload(
  id: number,
  original: EditableFields,
  edited: EditableFields,
) {
  const payload = {
    id,
    title: edited.title !== original.title ? edited.title : undefined,
    resume: edited.resume !== original.resume ? edited.resume : undefined,
    content: edited.content !== original.content ? edited.content : undefined,
    image: edited.image !== original.image ? edited.image : undefined,
    category:
      edited.category !== original.category ? edited.category : undefined,
    tags:
      JSON.stringify(edited.tags) !== JSON.stringify(original.tags)
        ? edited.tags
        : undefined,
  }

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as Partial<EditableFields> & { id: number }
}
