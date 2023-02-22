import { Router } from "express";
import { loginController } from './../controllers/session.controller'


const sessionRouter: Router = Router()

sessionRouter.post('/', loginController)

export { sessionRouter }