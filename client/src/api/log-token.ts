import { AxiosRequestConfig } from 'axios'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const tokenDecoder = z.string()

const jwtLogger = (config: AxiosRequestConfig) => {
  const token = config.headers?.['Authorization']

  if (token == null) {
    return
  }

  const parsedToken = tokenDecoder.safeParse(token)

  if (!parsedToken.success) {
    console.error(`Non string token value ${token}`)
    return
  }

  const extractedToken = parsedToken.data.replace('Bearer ', '')

  try {
    const decodedToken = jwt.decode(extractedToken)
    if (decodedToken == null || typeof decodedToken === 'string') {
      throw new Error('Parsing failed')
    }

    console.log(JSON.stringify(decodedToken, null, 2))
  } catch (err) {
    console.error(`Invalid token ${extractedToken}`)
  }

  return config
}

export {
  jwtLogger
}
