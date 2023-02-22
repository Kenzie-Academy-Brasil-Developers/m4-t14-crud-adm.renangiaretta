import { Request, Response } from 'express'
import { createUsersService } from './../services/users/createUsers.service'
import { listUsersService } from '../services/users/listUsers.service'
import { TUserFullWithoutPassword, TUserUpdateRequest } from '../interfaces/users.interfaces'
import { updateUserService } from '../services/users/updateUser.service'
import { deactivateUserService } from '../services/users/deactivateUser.service'
import { recoverUserService } from '../services/users/recoverUser.service'
import { retrieveUserProfileService } from '../services/users/retrieveUserProfile.service'


const createUsersController = async ( req: Request, res: Response ): Promise<Response> => {
    const data = await createUsersService(req.body)
    return res.status(201).json(data)
}

const listUsersController = async ( req: Request, res: Response ): Promise<Response> => {
    const data = await listUsersService()
    return res.status(200).json(data)
}

const retrieveUserProfileController = async ( req: Request, res: Response ): Promise<Response> => {
    const userId: number                 = Number(req.user.id)
    const user: TUserFullWithoutPassword = await retrieveUserProfileService(userId)
    return res.status(200).json(user)
}

const updateUserController = async ( req: Request, res: Response ): Promise<Response> => {
    const userData: TUserUpdateRequest   = req.body
    const id: number                     = parseInt(req.params.id)
    const user: TUserFullWithoutPassword = await updateUserService(userData, id)
    return res.status(200).json(user)
}

const deactivateUserController = async ( req: Request, res: Response ): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    await deactivateUserService(userId)
    return res.status(204).json()
}

const recoverUserController = async ( req: Request, res: Response ): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    const user: TUserFullWithoutPassword = await recoverUserService(userId)
    return res.status(200).json(user)
}

export { createUsersController, listUsersController, retrieveUserProfileController, updateUserController, deactivateUserController, recoverUserController }