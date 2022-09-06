import express from 'express'
import 'dotenv/config'
import { connexion } from './database/sequelizeDb'
import userRoutes from './routes/userRoutes'
const app = express()

/**
 * sequelize is a library that allows us
 * to connect to a MySQL database
 */
connexion()

/**
 * To handle the POST request coming from the front-end application,
 * we need to extract the JSON body.
 * For this, you just need a very simple middleware,
 * provided by the Express framework.
 */
app.use(express.json())

// routes
app.use('/api/v1/users', userRoutes)

export default app
