import { RequestHandler } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'

/**
 * Create a new user
 * @Route /api/v1/users/register - POST
 */
export const signUp: RequestHandler = async (req, res) => {
  const user = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  }
  const newUser = await User.create(user)
  return res.status(201).json({ user: newUser.id, message: 'User created' })
}
