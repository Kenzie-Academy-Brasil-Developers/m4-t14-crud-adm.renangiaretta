import { app } from './app'
import { connectDatabase } from './database'

const port = process.env.APP_PORT
app.listen(port, () => {
    console.log(port)
    connectDatabase()
    console.log('server is online')
})