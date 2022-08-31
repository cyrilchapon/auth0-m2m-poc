import axios, { AxiosInstance } from 'axios'
import oauth from 'axios-oauth-client'
import tokenProvider from 'axios-token-interceptor'
import { appEnv } from './env'
import { z } from 'zod'

const insecureApiAxios = axios.create({
  baseURL: appEnv.API_URL
})

const secureApiAxios = axios.create({
  baseURL: appEnv.API_URL
})
const getClientCredentials = oauth.client(axios.create(), {
  url: appEnv.AUTH0_TOKEN_ENDPOINT,
  grant_type: 'client_credentials',
  client_id: appEnv.AUTH0_CLIENT_ID,
  client_secret: appEnv.AUTH0_CLIENT_SECRET,
  audience: appEnv.AUTH0_API_AUDIENCE
})
secureApiAxios.interceptors.request.use(
  // Wraps axios-token-interceptor with oauth-specific configuration,
  // fetches the token using the desired claim method, and caches
  // until the token expires
  oauth.interceptor(tokenProvider, getClientCredentials)
)

type Bear = {
  id: number
  name: string
}

const bearsDecoder = z.array(
  z.object({
    id: z.number(),
    name: z.string()
  })
)

const buildApi = (axiosInstance: AxiosInstance = secureApiAxios) => ({
  listBears:  async (): Promise<Bear[]> => {
    const { data: _data } = await axiosInstance.get<unknown>('/bear')
    const data = bearsDecoder.parse(_data)
  
    return data
  }
})

const insecureApi = buildApi(insecureApiAxios)
const secureApi = buildApi(secureApiAxios)

export type {
  Bear
}

export {
  insecureApiAxios,
  secureApiAxios,
  buildApi,
  insecureApi,
  secureApi
}
