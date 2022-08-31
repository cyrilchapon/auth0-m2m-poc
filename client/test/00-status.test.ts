import { expect } from 'earljs'

import {
  anonymousApiClient,
  authenticatedApiClient
} from '../src/api'

describe('Status', () => {
  [
    ['Anonymous', anonymousApiClient] as const,
    ['Authenticated', authenticatedApiClient] as const
  ].map(([apiType, api]) => {

    describe(`${apiType[0].toUpperCase()}${apiType.slice(1)} client`, () => {
      it(`should fulfill`, async () => {
        const resultPromise = api.status()
        await expect(resultPromise).not.toBeRejected()
      })
  
      it(`should return ok`, async () => {
        const result = await api.status()
        expect(result).toBeAnObjectWith({ status: 'ok' })
      })
    })

  })
})
