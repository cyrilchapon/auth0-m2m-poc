import { expect } from 'earljs'

import {
  anonymousApiClient,
  authenticatedApiClient
} from '../src/api'

describe('Delete (unauthorized)', () => {
  describe(`Anonymous client`, () => {
    it(`should reject`, async () => {
      const resultPromise = anonymousApiClient.removeBear(1)
      await expect(resultPromise).toBeRejected()
    })
  })

  describe(`Authenticated client`, () => {
    it(`should reject`, async () => {
      const resultPromise = authenticatedApiClient.removeBear(1)
      await expect(resultPromise).toBeRejected()
    })
  })
})
