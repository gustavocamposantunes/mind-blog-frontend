import { describe, it, expect } from 'vitest'

import { buildUpdateProfilePayload } from './buildUpdateProfilePayload'

describe('buildUpdateProfilePayload', () => {
  const original = {
    fullName: 'Original Full Name',
    image: 'Original Image',
  }

  it('should return only changed fields', () => {
    const edited = {
      fullName: 'New Full Name',
      image: 'Original Image',
    }

    const result = buildUpdateProfilePayload(original, edited)

    expect(result).toEqual({
      fullName: 'New Full Name',
    })
  })

  it('should return all changed fields', () => {
    const edited = {
      fullName: 'New Full Name',
      image: 'New Image',
    }

    const result = buildUpdateProfilePayload(original, edited)

    expect(result).toEqual(edited)
  })

  it('should return empty object if no changes are made', () => {
    const result = buildUpdateProfilePayload(original, original)

    expect(result).toEqual({})
  })
})
