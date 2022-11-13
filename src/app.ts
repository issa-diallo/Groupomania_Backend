import express from 'express'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import cors from 'cors'
import path from 'path'
import { adminRouter, admin } from './config/admin'

const app = express()

const corsOptions = {
  origin: '*',
  credentials: true,
  methodes: 'GET,PUT,PATCH,POST,DELETE',
}

// middleware
app.use(admin.options.rootPath, adminRouter)
app.use(cors(corsOptions))
const dirName = path.join(__dirname, '../images')
app.use('/images', express.static(dirName))

app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/post', postRoutes)

export default app
