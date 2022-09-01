import { AxiosInstance } from 'axios'
import { z } from 'zod'

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

export type {
  ApiClient,
  Status,
  Bear
}

export {
  buildApiClient
}

import {
  anonymousApiAxios,
  authenticatedApiAxios,
} from './axios'

const anonymousApiClient: ApiClient = buildApiClient(anonymousApiAxios)
const authenticatedApiClient: ApiClient = buildApiClient(authenticatedApiAxios)

export {
  anonymousApiAxios,
  authenticatedApiAxios,
  anonymousApiClient,
  authenticatedApiClient
}
