import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { IUserFull, TUserFullWithoutPassword } from "../../interfaces/users.interfaces";
import { createUserReturnSchema } from '../../schemas/user.schema';


const recoverUserService = async ( userId: number ): Promise<TUserFullWithoutPassword> => {
    const id: number          = userId
    const queryString: string = `
    UPDATE
        users
    SET
        active = true
    WHERE
        id = $1
    RETURNING *;   
    `
    const queryConfig: QueryConfig = {
        text  : queryString,
        values: [id]
    }
    const queryResult: QueryResult<IUserFull> = await client.query(queryConfig)
    return createUserReturnSchema.parse(queryResult.rows[0])
}

export { recoverUserService }