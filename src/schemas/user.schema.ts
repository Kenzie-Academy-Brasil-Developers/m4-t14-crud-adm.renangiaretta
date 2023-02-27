import { hashSync } from 'bcryptjs'
import { z } from 'zod'


const userSchema = z.object({
    name    : z.string().max(20),
    email   : z.string().max(100).email(),
    password: z.string().max(120).transform(pass => hashSync(pass, 10)),
    admin   : z.boolean()
}).partial({
    admin: true
})

const userCreatedSchema = userSchema.extend({
    id    : z.number(),
    admin : z.boolean(),
    active: z.boolean()
})

const userWithoutPasswordSchema = userCreatedSchema.omit({password:true})

const userListSchema = z.array(userWithoutPasswordSchema)

const userFullSchema = z.object({
    name    : z.string().max(20),
    email   : z.string().max(100).email(),
    password: z.string().max(120).transform(pass => hashSync(pass, 10)),
    id      : z.number(),
    admin   : z.boolean(),
    active  : z.boolean()
})

const updateUserSchema = userFullSchema.omit({
    id    : true,
    active: true
}).partial({
    admin   : true,
    name    : true,
    password: true,
    email   : true
})

const createUserReturnSchema = userFullSchema.omit({password: true})



export { userSchema,
    userCreatedSchema,
    userWithoutPasswordSchema,
    userListSchema,
    updateUserSchema,
    userFullSchema,
    createUserReturnSchema
}