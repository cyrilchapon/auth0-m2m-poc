import { expect } from 'earljs'

import {
  anonymousApiClient,
  authenticatedApiClient
} from '../src/api'

describe('Create (private)', () => {
  describe(`Anonymous client`, () => {
    it(`should reject`, async () => {
      const resultPromise = anonymousApiClient.createBear({ name: 'foo' })
      await expect(resultPromise).toBeRejected()
    })
  })

  describe(`Authenticated client`, () => {
    it(`should fulfill`, async () => {
      const resultPromise = authenticatedApiClient.createBear({ name: 'foo' })
      await expect(resultPromise).not.toBeRejected()
    })

    it(`should return bear`, async () => {
      const result = await authenticatedApiClient.createBear({ name: 'foo' })
      expect(result).toBeAnObjectWith({ name: 'foo' })
    })
  })
})
