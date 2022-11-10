import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSSequelize from '@adminjs/sequelize'
import User from '../models/user'
import Post from '../models/post'

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
})
const adminOptions = {
  // We pass Category to `resources`
  resources: [User, Post],
}
const admin = new AdminJS(adminOptions)

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'sessionsecret',
  },
  null,
  {
    resave: true,
    saveUninitialized: true,
    secret: 'sessionsecret',
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    },
    name: 'adminjs',
  }
)

export { adminRouter, admin }
