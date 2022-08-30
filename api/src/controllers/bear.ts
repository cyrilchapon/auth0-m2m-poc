import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { Bear } from '../models/bear'
import { createAsyncHandler } from '../utils'
import { z, ZodIssue } from 'zod'

const list = createAsyncHandler<
  ParamsDictionary,
  Bear[],
  null,
  {}
>(async (req, res, next) => {
  const bears = Bear.list()
  res.json(bears)
})

const BearCreationSchema = z.object({
  name: z.string()
})

const create = createAsyncHandler<
  ParamsDictionary,
  Bear | ZodIssue[],
  unknown,
  {}
>(async (req, res, next) => {
  const parsedBody = BearCreationSchema.safeParse(req.body)

  if (!parsedBody.success) {
    res.status(409)
    res.json(parsedBody.error.issues)
    return
  }

  const createdBear = Bear.add(parsedBody.data)
  res.json(createdBear)
})

export {
  list,
  create
}
