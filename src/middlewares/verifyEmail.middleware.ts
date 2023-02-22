import { QueryResult } from 'pg';
import { NextFunction, Request, Response } from "express";
import { IUserFull } from "../interfaces/users.interfaces";
import { client } from '../database';
import { AppError } from '../errors/appError';



const verifyEmailMiddleware = async ( req: Request, res: Response, next: NextFunction ): Promise<Response | void> => {
    const getEmail = req.getEmail
    const { email }: Pick<IUserFull, 'email'> = req.body

    const queryString: string = `
    SELECT
        email
    FROM
        users    
    `
    const queryResult: QueryResult<Pick<IUserFull, 'email'>> = await client.query(queryString)
    const emailArr = queryResult.rows

    let verifyEmail: boolean = emailArr.some((el) => el.email === email)

    if(req.method === 'PATCH') {
        const filteredEmail = emailArr.filter((el) => el.email !== getEmail)
        verifyEmail = filteredEmail.some((el) => el.email === email)
    }

    if(verifyEmail) {
        return res.status(409).json({
            message: 'E-mail already exists.'
        })
    }

    return next()




}

export { verifyEmailMiddleware }