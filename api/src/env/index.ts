import { cleanEnv, str, CleanedEnvAccessors, port, url } from 'envalid'

const knownNodeEnv = ['development', 'production', 'test'] as const
type KnownNodeEnv = typeof knownNodeEnv[number]

interface AppEnv {
  NODE_ENV: KnownNodeEnv
  PORT: number
  AUTH0_JWKS_URI: string
  AUTH0_API_AUDIENCE: string
  AUTH0_TOKEN_ISSUER: string
}

type RawEnvVal = NodeJS.ProcessEnv[string]

const getAppEnv = () => {
  const env: Record<keyof AppEnv, RawEnvVal> = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    AUTH0_JWKS_URI: process.env.AUTH0_JWKS_URI,
    AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE,
    AUTH0_TOKEN_ISSUER: process.env.AUTH0_TOKEN_ISSUER
  }

  const cleanedEnv = cleanEnv<AppEnv>(env, {
    NODE_ENV: str({ choices: knownNodeEnv }),
    PORT: port(),
    AUTH0_JWKS_URI: url(),
    AUTH0_API_AUDIENCE: url(),
    AUTH0_TOKEN_ISSUER: url()
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
