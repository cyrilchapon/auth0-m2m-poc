import { cleanEnv, str, CleanedEnvAccessors, url } from 'envalid'

const knownNodeEnv = ['development', 'production', 'test'] as const
type KnownNodeEnv = typeof knownNodeEnv[number]

interface AppEnv {
  NODE_ENV: KnownNodeEnv
  API_URL: string
  AUTH0_CLIENT_ID: string
  AUTH0_CLIENT_SECRET: string
  AUTH0_API_AUDIENCE: string
  AUTH0_TOKEN_ENDPOINT: string
}

type RawEnvVal = NodeJS.ProcessEnv[string]

const getAppEnv = () => {
  const env: Record<keyof AppEnv, RawEnvVal> = {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE,
    AUTH0_TOKEN_ENDPOINT: process.env.AUTH0_TOKEN_ENDPOINT
  }

  const cleanedEnv = cleanEnv<AppEnv>(env, {
    NODE_ENV: str({ choices: knownNodeEnv }),
    API_URL: url(),
    AUTH0_CLIENT_ID: str(),
    AUTH0_CLIENT_SECRET: str(),
    AUTH0_API_AUDIENCE: url(),
    AUTH0_TOKEN_ENDPOINT: url()
  })

  return { ...cleanedEnv } as AppEnv & CleanedEnvAccessors
}

const appEnv = getAppEnv()

export {
  getAppEnv,
  appEnv
}

export type {
  AppEnv
}
