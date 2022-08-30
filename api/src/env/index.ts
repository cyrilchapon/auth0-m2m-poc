import { cleanEnv, str, CleanedEnvAccessors, port } from 'envalid'

const knownNodeEnv = ['development', 'production', 'test'] as const
type KnownNodeEnv = typeof knownNodeEnv[number]

interface AppEnv {
  NODE_ENV: KnownNodeEnv
  PORT: number
}

type RawEnvVal = NodeJS.ProcessEnv[string]

const getAppEnv = () => {
  const env: Record<keyof AppEnv, RawEnvVal> = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
  }

  const cleanedEnv = cleanEnv<AppEnv>(env, {
    NODE_ENV: str({ choices: knownNodeEnv }),
    PORT: port()
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
