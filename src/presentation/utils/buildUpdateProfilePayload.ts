import type { UserModel } from '@/domain/models'

type EditableFields = Pick<UserModel, 'fullName' | 'image'>

export function buildUpdateProfilePayload(
  original: EditableFields,
  edited: EditableFields,
) {
  const payload = {
    fullName:
      edited.fullName !== original.fullName ? edited.fullName : undefined,
    image: edited.image !== original.image ? edited.image : undefined,
  }

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as Partial<EditableFields>
}
