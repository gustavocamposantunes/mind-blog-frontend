import { toBase64 } from './toBase64'

import type { ChangeEvent } from 'react'

export const getBase64FromInputFile = async (
  event: ChangeEvent<HTMLInputElement>,
): Promise<string | null> => {
  const file = event.target.files?.[0]

  if (!file) {
    return null
  }

  return toBase64(file)
}
