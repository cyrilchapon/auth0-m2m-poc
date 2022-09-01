import { AuthenticationClientOptions, clientFactory, interceptorFactory } from '@scienta/axios-oauth2'
import axios, { AxiosRequestConfig } from 'axios'
import { appEnv } from '../env'
import { jwtLogger } from './log-token'
import { MemoryTokenCache } from './memory-cache'

const anonymousApiAxios = axios.create({
  baseURL: appEnv.API_URL
})

const authenticatedApiAxios = axios.create({
  baseURL: appEnv.API_URL
})

const getClientCredentials = clientFactory(axios.create(), {
  url: appEnv.AUTH0_TOKEN_ENDPOINT,
  grant_type: 'client_credentials',
  client_id: appEnv.AUTH0_CLIENT_ID,
  client_secret: appEnv.AUTH0_CLIENT_SECRET,
  audience: appEnv.AUTH0_API_AUDIENCE
} as AuthenticationClientOptions)

// authenticatedApiAxios.interceptors.request.use(
//   jwtLogger
// )
authenticatedApiAxios.interceptors.request.use(
  // Wraps axios-token-interceptor with oauth-specific configuration,
  // fetches the token using the desired claim method, and caches
  // until the token expires
  interceptorFactory(getClientCredentials, new MemoryTokenCache())
)


export {
  anonymousApiAxios,
  authenticatedApiAxios
}
