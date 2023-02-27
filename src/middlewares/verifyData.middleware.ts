import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'
import { AppError } from '../errors/appError'

const verifyDataMiddleWare = ( schema: ZodTypeAny ) => ( req: Request, res: Response, next: NextFunction ): Response | void => {
    if(Object.keys(req.body).length === 0) {
        throw new AppError('No data received.', 400)
    }
    const validatedData = schema.parse(req.body)
          req.body      = validatedData

    return next()
}

export { verifyDataMiddleWare }