import bodyParser from 'body-parser'
import express from 'express'
import { checkJwt, checkPermission } from './auth'
import * as controllers from './controllers'

const bearRouter = express.Router()
// Publics
bearRouter.get('/', controllers.bear.list)
bearRouter.get('/:id', controllers.bear.find)
// Privates
bearRouter.post('/', checkJwt, controllers.bear.create)
// Guarded
bearRouter.put('/:id', checkJwt, checkPermission('update:bear'), controllers.bear.update)
bearRouter.patch('/:id', checkJwt, checkPermission('update:bear'), controllers.bear.update)
bearRouter.delete('/:id', checkJwt, checkPermission('remove:bear'), controllers.bear.remove)

const statusRouter = express.Router()
statusRouter.get('/', controllers.status.status)

const router = express.Router()
router.use(bodyParser.json())
// router.use(checkJwt)
router.use('/status', statusRouter)
router.use('/bear', bearRouter)

export {
  router
}
