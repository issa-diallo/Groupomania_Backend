import { RequestHandler } from 'express'
import { createToken } from '../authentification/loginToken'
import User from '../models/user'
import {
  compareHashed,
  passwordHashed,
} from '../authentification/passwordBcrypt'

/**
 * @Route /api/v1/users/register - POST
 */
export const signUp: RequestHandler = async (req, res) => {
  const user = {
    email: req.body.email,
    password: await passwordHashed(req.body.password),
  }
  const newUser = await User.create(user)
  return res.status(201).json({ user: newUser.id, message: 'User created' })
}

/**
 * @Route /api/v1/users/login - POST
 */
export const signIn: RequestHandler = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  // the compare function of bcrypt to compare the password entered by the user with the hash stored in the database and  true or false

  const isPasswordValid =
    user && (await compareHashed(req.body.password, user.password))
  if (!isPasswordValid) {
    res
      .status(401)
      .json({ message: 'Sorry, the email or password is incorrect!' })
  }
  const maxAge = 60 * 60 * 24 * 1000
  // create a token with the userId and the secret key
  const token = createToken(user.id)
  // Insert token in cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge,
  })
  res.status(200).json({ userId: user.id, token })
}

/**
 * @Route /api/v1/users/logout - GET
 */
export const logout: RequestHandler = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}
