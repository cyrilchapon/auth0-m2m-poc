import { ParamsDictionary } from 'express-serve-static-core'
import { createAsyncHandler } from '../utils'

type Status = {
  status: 'ok'
}


const status = createAsyncHandler<
  ParamsDictionary,
  Status,
  null,
  {}
>(async (req, res, next) => {
  res.json({ status: 'ok' })
})

export {
  status
}
