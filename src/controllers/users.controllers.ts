import { Request, Response } from 'express'
import { createUsersService } from './../services/users/createUsers.service'
import { listUsersService } from '../services/users/listUsers.service'
import { retrieveUserProfileService } from '../services/users/getUserById.service'
import { TUserFullWithoutPassword, TUserResponse, TUserUpdateRequest } from '../interfaces/users.interfaces'
import { updateUserService } from '../services/users/updateUser.service'
// import { updateUserService } from '../services/users/updateUser.service'


const createUsersController = async ( req: Request, res: Response ): Promise<Response> => {
    const data = await createUsersService(req.body)
    return res.status(201).json(data)
}

const listUsersController = async ( req: Request, res: Response ): Promise<Response> => {
    const data = await listUsersService()
    return res.status(200).json(data)
}

const retrieveUserProfileController = async ( req: Request, res: Response ): Promise<Response> => {
    const data = await retrieveUserProfileService(req.body)
    return res.status(200).json(data)
}

const updateUserController = async ( req: Request, res: Response ): Promise<Response> => {
    const userData: TUserUpdateRequest = req.body
    const id: number = parseInt(req.params.id)
    const user: TUserFullWithoutPassword = await updateUserService(userData, id)
    return res.status(200).json(user)
}




export { createUsersController, listUsersController, retrieveUserProfileController, updateUserController }