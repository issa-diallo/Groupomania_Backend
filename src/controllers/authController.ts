import { RequestHandler } from 'express'
import { createToken } from '../authentification/loginToken'
import User from '../models/user'
import {
  verifyPassword,
  hashPassword,
} from '../authentification/passwordBcrypt'
import { TokenInterface } from '../authentification/types'
import jwt from 'jsonwebtoken'

export const createUser = async (
  pseudo: string,
  email: string,
  password: string
) =>
  await User.create({ pseudo, email, password: await hashPassword(password) })

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
  } catch (err) {
    if (err.errors[0].message.includes('pseudo')) {
      return res.status(400).send({ message: 'Pseudo incorrect ou déjà pris' })
    }
    if (err.errors[0].message.includes('email')) {
      return res.status(400).send({ message: 'Email incorrect ou déjà pris' })
    }
    if (err.errors[0].message.includes('password')) {
      return res
        .status(400)
        .send({ message: 'Le mot de passe doit faire 6 caractères minimum' })
    }
    return res.status(500).send({ err })
  }
}

/**
 * @Route /api/v1/users/login - POST
 */
export const signIn: RequestHandler = async (req, res) => {
  const invalid = 'Email inconnu ou password incorrect'
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.status(400).json({ message: invalid })
    }
    /* the compare function of bcrypt to compare the password entered
     * by the user with the hash stored in the database and  true or false
     */
    const isPasswordValid =
      user && (await verifyPassword(req.body.password, user.password))
    if (!isPasswordValid) {
      return res.status(400).json({ message: invalid })
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
