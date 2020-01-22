import { NextFunction, Request, Response } from 'express'
import AppApiResponse from '../response/AppApiResponse'
import NotFoundException from '../exception/NotFoundException'

export function error404(req: Request, res: Response, next: NextFunction) {
  // will be catch by the next and last middleware
  next(new NotFoundException())
}

export function error500(error: any, req: Request, res: Response, next: NextFunction) {
  const status = error.status || error.statusCode || 500
  const message = error.message || 'Something went wrong'
  const data = error.data || {}

  return res
    .status(status)
    .json(new AppApiResponse(data, AppApiResponse.TYPE_ERROR, message))
}
