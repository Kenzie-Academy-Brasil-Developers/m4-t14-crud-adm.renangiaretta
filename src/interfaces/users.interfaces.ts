import { QueryResult } from 'pg'
import { z } from 'zod'
import { updateUserSchema, userCreatedSchema, userFullSchema, userListSchema, userSchema, userWithoutPasswordSchema } from './../schemas/user.schema'

type TUserRequest             = z.infer<typeof userSchema>
type TUserResponse            = z.infer<typeof userWithoutPasswordSchema>
type TUserWithPassword        = z.infer<typeof userCreatedSchema>
type TUserQueryResponse       = QueryResult<TUserWithPassword>
type TUserUpdateRequest       = z.infer<typeof updateUserSchema>
type TUserWithoutPassword     = z.infer<typeof userListSchema>
type IUserFull                = z.infer<typeof userFullSchema>
type TUserFullWithoutPassword = Omit<IUserFull, "password">

type TUserResult = QueryResult<TUserFullWithoutPassword>



export { TUserRequest, TUserResponse, TUserWithPassword, TUserQueryResponse, TUserUpdateRequest, TUserWithoutPassword, TUserFullWithoutPassword, IUserFull, TUserResult }