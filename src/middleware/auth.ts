import { Response, NextFunction } from 'express'
import { RequestAuth, TokenInterface } from '../authentification/types'
import jwt from 'jsonwebtoken'

export const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  let token: string

  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      message: 'you did not provide an authentication token',
      name: 'Access denied',
    })
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
  const userId = (decoded as TokenInterface).userId
  req.auth = {
    userId: userId,
  }

  next()
}
