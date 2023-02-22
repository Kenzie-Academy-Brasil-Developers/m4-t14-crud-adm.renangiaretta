import { Router } from "express";
import { sessionRouter } from "./sessions.routes";
import { userRouter } from './users.routes'
const router: Router = Router()

router.use('/users', userRouter)
router.use('/login', sessionRouter)
router.use('/:id', userRouter)


export { router }