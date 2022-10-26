import { Response, NextFunction } from 'express'
import { RequestAuth, TokenInterface } from '../authentification/types'
import jwt from 'jsonwebtoken'

export const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    // Get the token from the request header.
    const token = req.headers.authorization.split(' ')[1]

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
    }
    next()
  } catch (error) {
    res.status(500).json({ error })
  }
}
