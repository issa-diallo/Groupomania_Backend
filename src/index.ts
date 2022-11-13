import app from './app'
import { connection } from './database/sequelizeDb'

const connectionCallback = () => console.info('db connected')

const listenCallback = () => {
  console.info(`Listening on port at http://localhost:${process.env.PORT}`)
  connection().then(connectionCallback)
}
app.listen(process.env.PORT, () => listenCallback)

export default app
