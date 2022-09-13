import { Response, Request } from 'express'
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
export const userInfo = async (req: RequestAuth, res: Response) => {
  try {
    const paramsId = req.params.id
    const user: User = await User.findByPk(paramsId, {
      attributes: { exclude: ['password'] },
    })
    userAllowedOr401(user, req.auth.userId, res)
    return res.status(200).json(user)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}

/**
 * Update a user
 * @Route /api/v1/users/:id - PUT
 */
export const updateUser = async (req: RequestAuth, res: Response) => {
  try {
    const paramsId = req.params.id
    const user: User = await User.findByPk(paramsId, {
      attributes: { exclude: ['password'] },
    })
    userAllowedOr401(user, req.auth.userId, res)
    const userUpdate = await user.update({
      ...req.body,
    })
    return res.status(200).json(userUpdate)
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}

/**
 * Delete a user
 * @Route /api/v1/users/:id - DELETE
 */
export const deleteUser = async (req: RequestAuth, res: Response) => {
  try {
    const paramsId = req.params.id
    const user: User = await User.findByPk(paramsId, {
      attributes: { exclude: ['password'] },
    })
    userAllowedOr401(user, req.auth.userId, res)
    await user.destroy()
    return res.status(204).json()
  } catch (error) {
    logger.error(error)
    return res.status(500)
  }
}
