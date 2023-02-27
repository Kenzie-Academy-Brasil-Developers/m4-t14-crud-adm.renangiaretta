import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'
import { AppError } from '../errors/appError'

const verifyDataMiddleWare = ( schema: ZodTypeAny ) => ( req: Request, res: Response, next: NextFunction ): Response | void => {
    if(Object.keys(req.body).length === 0) {
        console.log('tavazio')
        throw new AppError('No data received.', 400)
    }
    console.log('req.body: ', req.body)
    const validatedData = schema.parse(req.body)
        req.body        = validatedData

    return next()
}

export { verifyDataMiddleWare }