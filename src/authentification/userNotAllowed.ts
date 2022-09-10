import User from '../models/user'
import { NextFunction, Response } from 'express'

export const userAllowedOr401 = (
  user: User,
  reqUserId: number,
  res: Response,
  next: NextFunction
) => {
  if (user.id !== reqUserId) {
    return res
      .status(401)
      .json({ message: 'User is not authorized to access this resource' })
  }
  next()
}
