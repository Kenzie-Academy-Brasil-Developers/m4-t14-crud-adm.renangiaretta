import { app } from './app'
import { connectDatabase } from './database'

const port = process.env.APP_PORT
app.listen(port, () => {
    connectDatabase()
    console.log('server is online')
})