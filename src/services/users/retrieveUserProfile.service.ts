import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database"
import { IUserFull, TUserFullWithoutPassword } from "../../interfaces/users.interfaces"
import { createUserReturnSchema } from "../../schemas/user.schema";


const retrieveUserProfileService = async ( userId: number ): Promise<TUserFullWithoutPassword> => {
    const id: number  = Number(userId)
    const queryString = `
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
    const queryResult: QueryResult<IUserFull> = await client.query(queryConfig)
    return createUserReturnSchema.parse(queryResult.rows[0])
}

export { retrieveUserProfileService }