import { expect } from 'earljs'

import {
  anonymousApiClient,
  authenticatedApiClient
} from '../src/api'

describe('Find (public)', () => {
  [
    ['Anonymous', anonymousApiClient] as const,
    ['Authenticated', authenticatedApiClient] as const
  ].map(([apiType, api]) => {

    describe(`${apiType} client`, () => {
      it(`should fulfill`, async () => {
        const resultPromise = api.listBears()
        await expect(resultPromise).not.toBeRejected()
      })
    })

  })
})
