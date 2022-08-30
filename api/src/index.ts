import { appEnv } from './env'
import http from 'http'
import express from 'express'
import { router } from './routes'

const app = express()
const server = http.createServer(app)

app.use(router)

server.listen(appEnv.PORT, () => {
  console.log(`Magic happens on port ${appEnv.PORT}`)
})
