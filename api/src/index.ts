import { appEnv } from './env'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

server.listen(appEnv.PORT, () => {
  console.log(`Magic happens on port ${appEnv.PORT}`)
})
