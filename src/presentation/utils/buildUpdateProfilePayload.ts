import type { UserModel } from '@/domain/models'

type EditableFields = Pick<UserModel, 'firstName' | 'lastName' | 'image'>

export function buildUpdateProfilePayload(
  original: EditableFields,
  edited: EditableFields,
) {
  const payload = {
    firstName:
      edited.firstName !== original.firstName ? edited.firstName : undefined,
    lastName:
      edited.lastName !== original.lastName ? edited.lastName : undefined,
    image: edited.image !== original.image ? edited.image : undefined,
  }

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as Partial<EditableFields>
}
