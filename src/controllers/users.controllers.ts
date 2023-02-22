import { Request, Response } from 'express'
import { createUsersService } from './../services/users/createUsers.service'



const createUsersController = ( req: Request, res: Response ): Response => {

    createUsersService()


    return res.json({
        message: 'Zasselemene Co.'
    })
}

export { createUsersController }