import { QueryConfig, QueryResult } from 'pg';
import { NextFunction, Request, Response } from "express"
import { TUserFullWithoutPassword } from '../interfaces/users.interfaces';
import { client } from '../database';
import { AppError } from '../errors/appError';

const verifyUserIdMiddleware = async ( req: Request, res: Response, next: NextFunction ):Promise<Response | void> => {
    const id: number          = parseInt(req.params.id)
    const userTokenId         = req.user.id
    const queryString: string = `
    SELECT
        *
    FROM
        users
    WHERE
        "id" = $1
    `;
    const queryConfig: QueryConfig = {
        text  : queryString,
        values: [id]
    }  
    const queryResult: QueryResult<TUserFullWithoutPassword> = await client.query(queryConfig)
    if (queryResult.rowCount === 0) {
        return res.status(404).json({
            message: 'Developer not found.'
        })
    }
    if (id !== userTokenId) {
        throw new AppError('BAD REQUEST', 400)
    }
    if(req.method === 'PATCH') {
        req.getEmail = queryResult.rows[0].email
    }
    return next()
}

export { verifyUserIdMiddleware }