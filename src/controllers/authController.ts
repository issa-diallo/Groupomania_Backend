import { RequestHandler } from 'express'
import { createToken } from '../authentification/loginToken'
import User from '../models/user'
import {
  compareHashed,
  passwordHashed,
} from '../authentification/passwordBcrypt'
import { signUpErrors } from '../utils/errors'
import { TokenInterface } from '../authentification/types'
import jwt from 'jsonwebtoken'

export const createUser = async (
  pseudo: string,
  email: string,
  password: string
) =>
  await User.create({ pseudo, email, password: await passwordHashed(password) })

/**
 * @Route /api/v1/users/register - POST
 */
export const signUp: RequestHandler = async (req, res) => {
  try {
    const newUser = await createUser(
      req.body.pseudo,
      req.body.email,
      req.body.password
    )
    return res.status(201).json({ user: newUser.id, message: 'User created' })
  } catch (error) {
    const err = signUpErrors(error)
    return res.status(400).send({ err })
  }
}

/**
 * @Route /api/v1/users/login - POST
 */
export const signIn: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.status(400).json({ message: 'Désolé, email inconnu' })
    }
    /* the compare function of bcrypt to compare the password entered
     * by the user with the hash stored in the database and  true or false
     */
    const isPasswordValid =
      user && (await compareHashed(req.body.password, user.password))
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Le mot de passe est incorrect' })
    }
    // create a token with the userId and the secret key
    const token = createToken(user.id)

    res.status(200).json({ userId: user.id, token })
  } catch (error) {
    return res.status(500).send({ error })
  }
}

/**
 * when the user will arrive on our application on the highest component
 * (app.ts; react) we will test if we know his token so we can connect him automatically
 */
export const getUserToken: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    // We extract the user ID of our token
    const userId = (decodedToken as TokenInterface).userId
    const user: User = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    })
    res.status(200).json(user)
  } catch (error) {
    console.warn('No Token')
    console.error(error)
  }
}
