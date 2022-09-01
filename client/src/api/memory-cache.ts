import { AuthClient, AuthenticationResponseJson, TokenCache } from '@scienta/axios-oauth2'
import { Lock } from 'lock'

export class MemoryTokenCache implements TokenCache
{
  private _lock = Lock()
  private _token: AuthenticationResponseJson | null = null
  private _expiration: number | null = null

	constructor() {}

  private static async _fetchToken(authClient: AuthClient) {
    const response = await authClient()

    return {
      expiration: response.expires_in != null ? Date.now() + response.expires_in * 1000 : null,
      value: response
    }
  }

	public async getToken(authClient: AuthClient): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this._lock('tokencache', async (unlockFn) => {
        const unlock = unlockFn()

        // Value was already loaded by the previous lock.
        if (MemoryTokenCache.isTokenAlive(this._token, this._expiration)) {
          unlock()
          return resolve(this._token.access_token)
        }

        // Get the value.
        try {
          const {
            value: token,
            expiration
          } = await MemoryTokenCache._fetchToken(authClient)

          this._token = token
          this._expiration = expiration

          unlock()

          return resolve(this._token.access_token)
        } catch (err) {
          unlock()
          return reject(err)
        }
      })
    })
	}

  private static isTokenAlive (token: AuthenticationResponseJson | null, expiration: number | null): token is AuthenticationResponseJson {
    return (
      token != null &&
      (
        expiration == null ||
        (
          expiration - Date.now() > 0
        )
      )
    )
  }
}
