import type {
  Params,
  ParamsDictionary
} from 'express-serve-static-core'

import type {
  ParsedQs
} from 'qs'

import {
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction
} from 'express'

type AsyncRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void>

type AsyncErrorRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> = (
  err: any,
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void>

const createAsyncHandler = <
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> (handler: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>): RequestHandler<
  P,
  ResBody,
  ReqBody,
  ReqQuery
> => {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    handler(req, res, next)
      .catch(next)
  }
}

const createAsyncErrorHandler = <
  P extends Params = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
> (handler: AsyncErrorRequestHandler<P, ResBody, ReqBody, ReqQuery>): ErrorRequestHandler<
  P,
  ResBody,
  ReqBody,
  ReqQuery
> => {
  return async (
    err: any,
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    handler(err, req, res, next)
      .catch(next)
  }
}

export type { AsyncRequestHandler, AsyncErrorRequestHandler }
export { createAsyncHandler, createAsyncErrorHandler }