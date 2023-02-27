import format from "pg-format"
import { client } from "../../database"
import { userWithoutPasswordSchema } from "../../schemas/user.schema"
import { TUserQueryResponse, TUserRequest, TUserResponse } from './../../interfaces/users.interfaces'

const createUsersService = async ( data:TUserRequest ): Promise<any> => {
    try {
    const keys        = Object.keys(data)
    const values      = Object.values(data)
    const queryString = `
    INSERT INTO
        users(%I)
    VALUES
        (%L)
    RETURNING *;    
    `
    const queryFormat                     = format(queryString, keys, values)
    const queryResult: TUserQueryResponse = await client.query(queryFormat)
    const newUser: TUserResponse          = userWithoutPasswordSchema.parse(queryResult.rows[0])
    return newUser
    } catch (error) {
        
    }
    
}   

export { createUsersService }