import bodyParser from 'body-parser'
import express from 'express'
import * as controllers from './controllers'

const bearRouter = express.Router()
bearRouter.get('/', controllers.bear.list)
bearRouter.post('/', controllers.bear.create)
bearRouter.get('/:id', controllers.bear.find)
bearRouter.put('/:id', controllers.bear.update)
bearRouter.patch('/:id', controllers.bear.update)
bearRouter.delete('/:id', controllers.bear.remove)

const router = express.Router()
router.use(bodyParser.json())
router.use('/bear', bearRouter)

export {
  router
}
