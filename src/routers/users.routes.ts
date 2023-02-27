import { Router } from 'express'
import { createUsersController, deactivateUserController, listUsersController, recoverUserController, retrieveUserProfileController, updateUserController } from '../controllers/users.controllers'
import { verifyAdminMiddleware } from '../middlewares/verifyAdmin.middleware'
import { verifyEmailMiddleware } from '../middlewares/verifyEmail.middleware'
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware'
import { verifyUserIdMiddleware } from '../middlewares/verifyUserId.middleware'
import { updateUserSchema, userSchema } from '../schemas/user.schema'
import { verifyDataMiddleWare } from './../middlewares/verifyData.middleware'

const userRouter: Router = Router ()

userRouter.post('',
verifyDataMiddleWare(userSchema),
verifyEmailMiddleware,
createUsersController
)
userRouter.get('',
verifyTokenMiddleware,
verifyAdminMiddleware,
listUsersController
)
userRouter.get('/profile',
verifyTokenMiddleware,
retrieveUserProfileController
)
userRouter.patch('/:id',
verifyDataMiddleWare(updateUserSchema),
verifyTokenMiddleware, verifyUserIdMiddleware,
verifyEmailMiddleware,
updateUserController
)
userRouter.delete('/:id',verifyTokenMiddleware,
verifyUserIdMiddleware,
deactivateUserController
)
userRouter.put('/:id/recover',
verifyTokenMiddleware,
verifyAdminMiddleware,
recoverUserController
)

export { userRouter }