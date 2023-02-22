import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";



const verifyAdminMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
    const isAdmin = req.user.admin

    if (!isAdmin) {
        console.log(isAdmin)
        throw new AppError('You are not admin. MWAHAHAHAHAHA', 401)
    }
    console.log(isAdmin)
    return next()
}

export { verifyAdminMiddleware }