import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database"
import { TUserQueryResponse, TUserResponse } from "../../interfaces/users.interfaces"
import { userWithoutPasswordSchema } from "../../schemas/user.schema";



const retrieveUserProfileService = async ( userId: number ): Promise<TUserResponse> => {
    const id: number = Number(userId)
    const queryString = `
        SELECT
            *
        FROM
            users
        WHERE
            "id" = $1
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: TUserQueryResponse = await client.query(queryConfig)
    const user: TUserResponse = userWithoutPasswordSchema.parse(queryResult.rows[0])
    return user
}

export { retrieveUserProfileService }