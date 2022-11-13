import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSSequelize from '@adminjs/sequelize'
import User from '../models/user'
import Post from '../models/post'
import { verifyPassword } from '../authentification/passwordBcrypt'
import { sequelize } from '../database/sequelizeDb'

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
})
const adminOptions = {
  // We pass Category to `resources`
  resources: [User, Post],
  databases: [sequelize],
}
const admin = new AdminJS(adminOptions)

const authenticate = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    return null
  }
  /* the compare function of bcrypt to compare the password entered
   * by the user with the hash stored in the database and  true or false
   */
  const isPasswordValid =
    user && (await verifyPassword(password, user.password))
  if (isPasswordValid && user.isAdmin) {
    return Promise.resolve({ email, password })
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
