import { describe, it, expect } from 'vitest'

import { buildUpdateProfilePayload } from './buildUpdateProfilePayload'

describe('buildUpdateProfilePayload', () => {
  const original = {
    firstName: 'Original Firstname',
    lastName: 'Original LastName',
    image: 'Original Image',
  }

  it('should retur only changed fields', () => {
    const edited = {
      firstName: 'New Firstname',
      lastName: 'Original LastName',
      image: 'Original Image',
    }

    const result = buildUpdateProfilePayload(original, edited)

    expect(result).toEqual({
      firstName: 'New Firstname',
    })
  })

  it('should return all changed fields', () => {
    const edited = {
      firstName: 'New Firstname',
      lastName: 'New LastName',
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
