import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { Bear } from '../models/bear'
import { createAsyncHandler } from '../utils'
import { z, ZodIssue } from 'zod'

const BearFindSchema = z.object({
  id: z.preprocess(
    (_id) => parseInt(_id as string),
    z.number()
  )
})
const BearCreationSchema = z.object({
  name: z.string()
})
const BearUpdateSchema = z.object({
  name: z.ostring()
})

const list = createAsyncHandler<
  ParamsDictionary,
  Bear[],
  null,
  {}
>(async (req, res, next) => {
  const bears = Bear.list()
  res.json(bears)
})


const create = createAsyncHandler<
  ParamsDictionary,
  Bear | ZodIssue[],
  unknown,
  {}
>(async (req, res, next) => {
  const parsedBody = BearCreationSchema.safeParse(req.body)

  if (!parsedBody.success) {
    res.status(400)
    res.json(parsedBody.error.issues)
    return
  }

  const createdBear = Bear.add(parsedBody.data)
  res.json(createdBear)
})


const find = createAsyncHandler<
  ParamsDictionary,
  Bear | ZodIssue[],
  null,
  {}
>(async (req, res, next) => {
  const parsedParams = BearFindSchema.safeParse(req.params)

  if (!parsedParams.success) {
    res.status(400)
    res.json(parsedParams.error.issues)
    return
  }

  const foundBear = Bear.get(parsedParams.data.id)

  if (foundBear == null) {
    res.status(404)
    res.json([{ code: 'custom', path: ['id'], message: 'not found' }])
    return
  }

  res.json(foundBear)
})


const update = createAsyncHandler<
  ParamsDictionary,
  Bear | ZodIssue[],
  unknown,
  {}
>(async (req, res, next) => {
  const parsedParams = BearFindSchema.safeParse(req.params)
  const parsedBody = BearUpdateSchema.safeParse(req.body)

  if (!parsedParams.success) {
    res.status(400)
    res.json(parsedParams.error.issues)
    return
  }

  if (!parsedBody.success) {
    res.status(400)
    res.json(parsedBody.error.issues)
    return
  }

  const updatedBear = Bear.update(parsedParams.data.id, parsedBody.data)

  if (updatedBear == null) {
    res.status(404)
    res.json([{ code: 'custom', path: ['id'], message: 'not found' }])
    return
  }

  res.json(updatedBear)
})



const remove = createAsyncHandler<
  ParamsDictionary,
  Bear | ZodIssue[],
  null,
  {}
>(async (req, res, next) => {
  const parsedParams = BearFindSchema.safeParse(req.params)

  if (!parsedParams.success) {
    res.status(400)
    res.json(parsedParams.error.issues)
    return
  }

  const deletedBear = Bear.remove(parsedParams.data.id)

  if (deletedBear == null) {
    res.status(404)
    res.json([{ code: 'custom', path: ['id'], message: 'not found' }])
    return
  }

  res.json(deletedBear)
})

export {
  list,
  create,
  find,
  update,
  remove
}
