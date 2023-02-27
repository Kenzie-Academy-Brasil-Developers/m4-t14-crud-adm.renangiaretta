import 'express-async-errors'
import express, { Application } from 'express'
import { router } from './routers/index'
import { handleError } from './errors/handleError'

const app: Application = express()
app.use(express.json())

app.use('', router)

app.use(handleError)

export { app }