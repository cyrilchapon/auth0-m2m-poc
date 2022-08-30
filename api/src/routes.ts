import bodyParser from 'body-parser'
import express from 'express'
import * as controllers from './controllers'

const bearRouter = express.Router()
bearRouter.get('/', controllers.bear.list)
bearRouter.post('/', controllers.bear.create)

const router = express.Router()
router.use(bodyParser.json())
router.use('/bear', bearRouter)

export {
  router
}
