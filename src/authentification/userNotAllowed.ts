import User from '../models/user'
import { Response } from 'express'

export const userAllowedOr401 = (
  user: User,
  reqUserId: number,
  res: Response
) => {
  if (user == null || user === undefined) {
    return res.status(401).json({ message: 'user does not exist ' })
  }
  if (user.id !== reqUserId) {
    return res.status(401).json({
      message: 'User is not authorized to access this resource',
    })
  }
}
