import { describe, it, expect, vi, beforeEach } from 'vitest'

import { toBase64 } from './toBase64'

type FileReaderMock = {
  readAsDataURL: (file: File) => void
  onload: ((event: ProgressEvent<FileReader>) => void) | null
  onerror: ((event: ProgressEvent<FileReader>) => void) | null
  result: string | ArrayBuffer | null
}

describe('toBase64', () => {
  let mockFileReader: FileReaderMock

  beforeEach(() => {
    mockFileReader = {
      readAsDataURL: vi.fn(function (this: FileReaderMock, file: File) {
        void file
        // Simula comportamento assíncrono
        setTimeout(() => {
          this.result = 'data:image/png;base64,ZmFrZS1pbWFnZS1kYXRh'
          this.onload?.({
            target: { result: this.result },
          } as unknown as ProgressEvent<FileReader>)
        }, 0)
      }),
      onload: null,
      onerror: null,
      result: null,
    }

    vi.stubGlobal('FileReader', function () {
      return mockFileReader as unknown as FileReader
    })
  })

  it('should resolve with base64 string when file is read successfully', async () => {
    const file = new File(['fake-image-data'], 'image.png', {
      type: 'image/png',
    })

    const result = await toBase64(file)

    expect(result).toBe('data:image/png;base64,ZmFrZS1pbWFnZS1kYXRh')
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file)
  })

  it('should reject if file reading fails', async () => {
    const file = new File(['fail'], 'fail.png', { type: 'image/png' })

    mockFileReader.readAsDataURL = vi.fn(function (this: FileReaderMock) {
      setTimeout(() => {
        this.onerror?.({
          target: { error: new Error('read error') },
        } as unknown as ProgressEvent<FileReader>)
      }, 0)
    })

    vi.stubGlobal('FileReader', function () {
      return mockFileReader as unknown as FileReader
    })

    await expect(toBase64(file)).rejects.toBeDefined()
  })
})
