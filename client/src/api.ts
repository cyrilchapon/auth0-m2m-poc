import axios, { AxiosInstance } from 'axios'
import { appEnv } from './env'
import { z } from 'zod'

const apiAxios = axios.create({
  baseURL: appEnv.API_URL
})

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

const buildApi = (axiosInstance: AxiosInstance = apiAxios) => ({
  listBears:  async (): Promise<Bear[]> => {
    const { data: _data } = await apiAxios.get<unknown>('/bear')
    const data = bearsDecoder.parse(_data)
  
    return data
  }
})

const api = buildApi(apiAxios)

export type {
  Bear
}

export {
  apiAxios,
  buildApi,
  api
}
