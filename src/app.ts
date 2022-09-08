import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { connexion } from './database/sequelizeDb'
import userRoutes from './routes/userRoutes'
import { requireAuth } from './middleware/auth'
import { Response } from 'express'
import { RequestAuth } from './authentification/types'
const app = express()

/**
 * sequelize is a library that allows us
 * to connect to a MySQL database
 */
connexion()

// middleware
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/jwtid', requireAuth, (req: RequestAuth, res: Response) => {
  res.status(200).send(res.locals.userId)
})
app.use('/api/v1/users', userRoutes)

export default app
