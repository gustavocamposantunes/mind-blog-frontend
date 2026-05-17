import { describe, it, expect } from 'vitest'

import { buildUpdateArticlePayload } from './buildUpdateArticlePayload'

describe('buildUpdateArticlePayload', () => {
  const id = 123
  const original = {
    title: 'Original Title',
    resume: 'Original Resume',
    content: 'Original Content',
    image: 'original.png',
    category: 'tech',
    tags: ['javascript', 'typescript'],
  }

  it('should return only changed fields along with the id', () => {
    const edited = {
      title: 'New Title',
      resume: 'Original Resume',
      content: 'Original Content',
      image: 'original.png',
      category: 'tech',
      tags: ['javascript', 'typescript'],
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
      resume: 'New Resume',
      content: 'New Content',
      image: 'new-image.jpg',
      category: 'design',
      tags: ['ui', 'ux'],
    }

    const result = buildUpdateArticlePayload(id, original, edited)

    expect(result).toEqual({
      id,
      title: 'New Title',
        resume: 'New Resume',
      content: 'New Content',
      image: 'new-image.jpg',
      category: 'design',
      tags: ['ui', 'ux'],
    })
  })

  it('should return only the id if nothing changed', () => {
    const edited = { ...original }

    const result = buildUpdateArticlePayload(id, original, edited)

    expect(result).toEqual({
      id,
    })
  })

  it('should detect when category changes', () => {
    const edited = {
      ...original,
      category: 'science',
    }

    const result = buildUpdateArticlePayload(id, original, edited)

    expect(result).toEqual({
      id,
      category: 'science',
    })
  })

  it('should detect when tags change', () => {
    const edited = {
      ...original,
      tags: ['python', 'react'],
    }

    const result = buildUpdateArticlePayload(id, original, edited)

    expect(result).toEqual({
      id,
      tags: ['python', 'react'],
    })
  })

  it('should handle undefined image correctly', () => {
    const originalWithUndefinedImage = {
      ...original,
      image: undefined,
    }

    const edited = {
      title: original.title,
      resume: original.resume,
      content: original.content,
      image: 'new.png',
      category: original.category,
      tags: original.tags,
    }

    const result = buildUpdateArticlePayload(
      id,
      originalWithUndefinedImage,
      edited,
    )

    expect(result).toEqual({
      id,
      image: 'new.png',
    })
  })
})
