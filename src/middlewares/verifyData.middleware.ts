import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'

const verifyDataMiddleWare = ( schema: ZodTypeAny ) => ( req: Request, res: Response, next: NextFunction ): Response | void => {
    const validatedData = schema.parse(req.body)
    req.body = validatedData

    return next()
}

export { verifyDataMiddleWare }