import { client } from "../../database"
import { TUserWithoutPassword } from "../../interfaces/users.interfaces"
import { userListSchema, userWithoutPasswordSchema } from "../../schemas/user.schema"


const listUsersService = async () => {
    const queryString = `
        SELECT
            *
        FROM
            users;    
    `
    const queryResult = await client.query(queryString)
    const allUsers: TUserWithoutPassword = userListSchema.parse(queryResult.rows)
    return allUsers
}

export { listUsersService }