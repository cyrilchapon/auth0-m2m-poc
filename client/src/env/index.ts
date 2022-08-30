import { cleanEnv, str, CleanedEnvAccessors } from 'envalid'

const knownNodeEnv = ['development', 'production', 'test'] as const
type KnownNodeEnv = typeof knownNodeEnv[number]

interface AppEnv {
  NODE_ENV: KnownNodeEnv
}

type RawEnvVal = NodeJS.ProcessEnv[string]

const getAppEnv = () => {
  const env: Record<keyof AppEnv, RawEnvVal> = {
    NODE_ENV: process.env.NODE_ENV
  }

  const cleanedEnv = cleanEnv<AppEnv>(env, {
    NODE_ENV: str({ choices: knownNodeEnv })
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
