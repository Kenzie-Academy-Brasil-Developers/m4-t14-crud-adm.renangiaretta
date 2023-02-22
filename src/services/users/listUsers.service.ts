import { client } from "../../database"


const listUsersService = async () => {
    const queryString = `
        SELECT
            *
        FROM
            users;    
    `
    const queryResult = await client.query(queryString)
    return queryResult.rows
}

export { listUsersService }