import { Request, Response } from 'express'
import { loginService } from './../services/session/createSession.service'



const loginController = async ( req: Request, res: Response ): Promise<Response> => {
    const data = await loginService(req.body.email, req.body.password)
    return res.status(201).json(data)
}

export { loginController } 