import axios, { AxiosInstance } from 'axios'
import oauth from 'axios-oauth-client'
import tokenProvider from 'axios-token-interceptor'
import { appEnv } from './env'
import { z } from 'zod'

const anonymousApiAxios = axios.create({
  baseURL: appEnv.API_URL
})

const authenticatedApiAxios = axios.create({
  baseURL: appEnv.API_URL
})
const getClientCredentials = oauth.client(axios.create(), {
  url: appEnv.AUTH0_TOKEN_ENDPOINT,
  grant_type: 'client_credentials',
  client_id: appEnv.AUTH0_CLIENT_ID,
  client_secret: appEnv.AUTH0_CLIENT_SECRET,
  audience: appEnv.AUTH0_API_AUDIENCE
})
authenticatedApiAxios.interceptors.request.use(
  // Wraps axios-token-interceptor with oauth-specific configuration,
  // fetches the token using the desired claim method, and caches
  // until the token expires
  oauth.interceptor(tokenProvider, getClientCredentials)
)

type Status = {
  status: 'ok'
}

type Bear = {
  id: number
  name: string
}

type BearCreationPayload = Omit<Bear, 'id'>
type BearUpdatePayload = Partial<BearCreationPayload>

const bearDecoder = z.object({
  id: z.number(),
  name: z.string()
})
const bearsDecoder = z.array(
  bearDecoder
)

const statusDecoder = z.object({
  status: z.literal('ok')
})

const buildApiClient = (axiosInstance: AxiosInstance = authenticatedApiAxios) => ({
  status: async (): Promise<Status> => {
    const { data: _data } = await axiosInstance.get<unknown>('/status')
    const data = statusDecoder.parse(_data)

    return data
  },
  listBears: async (): Promise<Bear[]> => {
    const { data: _data } = await axiosInstance.get<unknown>('/bear')
    const data = bearsDecoder.parse(_data)
  
    return data
  },
  createBear: async (payload: BearCreationPayload): Promise<Bear> => {
    const { data: _data } = await axiosInstance.post<unknown>('/bear', payload)
    const data = bearDecoder.parse(_data)

    return data
  },
  findBear: async (id: number): Promise<Bear> => {
    const { data: _data } = await axiosInstance.get<unknown>(`/bear/${id}`)
    const data = bearDecoder.parse(_data)

    return data
  },
  updateBear: async (id: number, payload: BearUpdatePayload): Promise<Bear> => {
    const { data: _data } = await axiosInstance.put<unknown>(`/bear/${id}`, payload)
    const data = bearDecoder.parse(_data)

    return data
  },
  removeBear: async (id: number): Promise<Bear> => {
    const { data: _data } = await axiosInstance.delete<unknown>(`/bear/${id}`)
    const data = bearDecoder.parse(_data)

    return data
  }
})

type ApiClient = ReturnType<typeof buildApiClient>

const anonymousApiClient: ApiClient = buildApiClient(anonymousApiAxios)
const authenticatedApiClient: ApiClient = buildApiClient(authenticatedApiAxios)

export type {
  ApiClient,
  Status,
  Bear
}

export {
  anonymousApiAxios,
  authenticatedApiAxios,
  buildApiClient,
  anonymousApiClient,
  authenticatedApiClient
}
