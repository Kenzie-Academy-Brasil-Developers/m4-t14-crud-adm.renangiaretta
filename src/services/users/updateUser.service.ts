import { QueryConfig } from 'pg';
import { TUserFullWithoutPassword, TUserResult, TUserUpdateRequest } from "../../interfaces/users.interfaces";
import { createUserReturnSchema } from '../../schemas/user.schema';
import format from 'pg-format'
import { client } from '../../database';


const updateUserService = async ( userData: TUserUpdateRequest, id: number ): Promise<TUserFullWithoutPassword> => {
    const validateBody        = userData
    const queryString: string = format(`
    UPDATE
        users
    SET(%I) = ROW(%L)
    WHERE
        "id" = $1
    RETURNING*;
    `,
    Object.keys(validateBody),
    Object.values(validateBody)
    );
    const queryConfig: QueryConfig = {
        text  : queryString,
        values: [id]
    }
    const queryResult: TUserResult = await client.query(queryConfig)
    return createUserReturnSchema.parse(queryResult.rows[0])
}


export { updateUserService }