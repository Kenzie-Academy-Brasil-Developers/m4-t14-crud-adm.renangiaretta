import { client } from './../../database'
import { compare } from 'bcryptjs'
import { AppError } from './../../errors/appError'
import jwt  from 'jsonwebtoken'
import 'dotenv/config'
import { TUserQueryResponse } from '../../interfaces/users.interfaces'

const loginService = async ( email: string, password: string ) => {
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            "email" = $1
    `
    const queryResult: TUserQueryResponse = await client.query(queryString, [email])
    if (queryResult.rowCount === 0 ) {
        throw new AppError( 'Wrong e-mail or passwordo', 401 )
    }
    const matchPassword: boolean = await compare( password, queryResult.rows[0].password )
    if (!matchPassword) {
        throw new AppError('Wrong e-mail or password', 401)
    }
    const token: string = jwt.sign(
        {
            admin    : queryResult.rows[0].admin
        },
        process.env.SECRET_KEY!,
        {
            subject  : queryResult.rows[0].id.toString(),
            expiresIn: '24h'
        }
    )
    return { token }
}

export { loginService }