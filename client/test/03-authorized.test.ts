import { expect } from 'earljs'

import {
  anonymousApiClient,
  authenticatedApiClient
} from '../src/api'

describe('Update (authorized)', () => {
  describe(`Anonymous client`, () => {
    it(`should reject`, async () => {
      const resultPromise = anonymousApiClient.updateBear(1, { name: 'Testname' })
      await expect(resultPromise).toBeRejected()
    })
  })

  describe(`Authenticated client`, () => {
    it(`should fulfill`, async () => {
      const resultPromise = authenticatedApiClient.updateBear(1, { name: 'Testname' })
      await resultPromise
      await expect(resultPromise).not.toBeRejected()
    })

    it(`should return bear`, async () => {
      const result = await authenticatedApiClient.updateBear(1, { name: 'Testname' })
      expect(result).toBeAnObjectWith({ name: 'Testname' })
    })
  })
})
