import { Response, NextFunction } from 'express'
import { RequestAuth, TokenInterface } from '../authentification/types'
import jwt from 'jsonwebtoken'

export const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt
  if (!token) {
    return res
      .status(401)
      .json({ message: 'you did not provide an authentication token' })
  } else {
    // Verify the token.
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    // We extract the user ID of our token
    const userId = (decoded as TokenInterface).userId
    // Add the userId to the request object.
    req.auth = {
      userId: userId,
    }
    next()
  }
}

/**
 * when the user will arrive on our application on the highest component
 * (app.ts; react) we will test if we know his token so we can connect him automatically
 */
export const requireAuth = (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    // We extract the user ID of our token
    const userId = (decodedToken as TokenInterface).userId
    res.locals.userId = { userId: userId }
    console.info(`The user n° ${userId} is connected...`)
    next()
  } catch (error) {
    console.warn('No Token')
    console.error(error)
    next()
  }
  next()
}
