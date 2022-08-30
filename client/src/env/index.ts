import { cleanEnv, str, CleanedEnvAccessors, url } from 'envalid'

const knownNodeEnv = ['development', 'production', 'test'] as const
type KnownNodeEnv = typeof knownNodeEnv[number]

interface AppEnv {
  NODE_ENV: KnownNodeEnv
  API_URL: string
}

type RawEnvVal = NodeJS.ProcessEnv[string]

const getAppEnv = () => {
  const env: Record<keyof AppEnv, RawEnvVal> = {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL
  }

  const cleanedEnv = cleanEnv<AppEnv>(env, {
    NODE_ENV: str({ choices: knownNodeEnv }),
    API_URL: url()
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
