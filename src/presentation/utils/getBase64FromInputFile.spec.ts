import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getBase64FromInputFile } from './getBase64FromInputFile'
import { toBase64 } from './toBase64'

vi.mock('./toBase64', () => ({
  toBase64: vi.fn(),
}))

describe('getBase64FromInputFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return null when no file is selected', async () => {
    const result = await getBase64FromInputFile({
      target: { files: [] },
    } as never)

    expect(result).toBeNull()
    expect(toBase64).not.toHaveBeenCalled()
  })

  it('should convert the first selected file to base64', async () => {
    vi.mocked(toBase64).mockResolvedValueOnce('data:image/png;base64,abc')

    const file = new File(['image content'], 'image.png', {
      type: 'image/png',
    })

    const result = await getBase64FromInputFile({
      target: { files: [file] },
    } as never)

    expect(toBase64).toHaveBeenCalledWith(file)
    expect(result).toBe('data:image/png;base64,abc')
  })
})
