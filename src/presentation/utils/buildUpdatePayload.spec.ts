import { describe, it, expect } from 'vitest'

import { buildUpdateArticlePayload } from './buildUpdateArticlePayload'

describe('buildUpdateArticlePayload', () => {
  const id = 123
  const original = {
    title: 'Original Title',
    content: 'Original Content',
    image: 'original.png',
  }

  it('should return only changed fields along with the id', () => {
    const edited = {
      title: 'New Title',
      content: 'Original Content',
      image: 'original.png',
    }

    const result = buildUpdateArticlePayload(id, original, edited)

    expect(result).toEqual({
      id,
      title: 'New Title',
    })
  })

  it('should return all changed fields along with the id', () => {
    const edited = {
      title: 'New Title',
      content: 'New Content',
      image: 'new-image.jpg',
    }

    const result = buildUpdateArticlePayload(id, original, edited)

    expect(result).toEqual({
      id,
      title: 'New Title',
      content: 'New Content',
      image: 'new-image.jpg',
    })
  })

  it('should return only the id if nothing changed', () => {
    const edited = { ...original }

    const result = buildUpdateArticlePayload(id, original, edited)

    expect(result).toEqual({
      id,
    })
  })

  it('should handle undefined image correctly', () => {
    const originalWithUndefinedImage = {
      ...original,
      image: undefined,
    }

    const edited = {
      title: original.title,
      content: original.content,
      image: 'new.png',
    }

    const result = buildUpdateArticlePayload(id, originalWithUndefinedImage, edited)

    expect(result).toEqual({
      id,
      image: 'new.png',
    })
  })
})
