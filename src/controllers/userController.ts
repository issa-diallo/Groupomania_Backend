import { Response, Request, NextFunction } from 'express'
import { userAllowedOr401 } from '../authentification/userNotAllowed'
import { RequestAuth } from '../authentification/types'
import User from '../models/user'
import logger from '../utils/logger'

/**
 * Get all users
 * @Route /api/v1/users/ - GET
 */
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } })
  res.status(200).json(users)
}

/**
 * Get a user
 * @Route /api/v1/users/:id - GET
 */
export const userInfo = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsId = req.params.id
    const user: User = await User.findByPk(paramsId, {
      attributes: { exclude: ['password'] },
    })
    if (!user) {
      res.status(404).send({ message: 'User not Found' })
      return next()
    }
    userAllowedOr401(user, req.auth.userId, res, next)
    res.status(200).json(user)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error })
  }
  next()
}

/**
 * Update a user
 * @Route /api/v1/users/:id - PUT
 */
export const updateUser = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsId = req.params.id
    const user: User = await User.findByPk(paramsId, {
      attributes: { exclude: ['password'] },
    })
    if (!user) {
      res.status(404).send({ message: 'User not Found' })
      return next()
    }
    userAllowedOr401(user, req.auth.userId, res, next)
    await user.update({
      ...req.body,
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
  next()
}

/**
 * Delete a user
 * @Route /api/v1/users/:id - DELETE
 */
export const deleteUser = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsId = req.params.id
    const user: User = await User.findByPk(paramsId, {
      attributes: { exclude: ['password'] },
    })
    if (!user) {
      res.status(404).send({ message: 'User not Found' })
      return next()
    }
    userAllowedOr401(user, req.auth.userId, res, next)
    await user.destroy()
    res.status(204).json()
  } catch (error) {
    res.status(500).json({ message: error })
  }
  next()
}
