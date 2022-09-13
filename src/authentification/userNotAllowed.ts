import User from '../models/user'
import { Response } from 'express'

export const userAllowedOr401 = (
  user: User,
  reqUserId: number,
  res: Response
) => {
  if (user.id !== reqUserId) {
    return res
      .status(401)
      .json({ message: 'User is not authorized to access this resource' })
  }
}
