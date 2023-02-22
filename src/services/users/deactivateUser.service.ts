import { QueryConfig } from "pg"
import { client } from "../../database"







const deactivateUserService = async ( userId: number ): Promise<void> => {
    const id = userId
    const queryString: string = `
    UPDATE
        users
    SET
        active = false
    WHERE
        "id" = $1
    RETURNING *;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }
    await client.query(queryConfig)
}

export { deactivateUserService }