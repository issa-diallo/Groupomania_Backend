import { Response, Request, NextFunction } from 'express'
import { RequestAuth } from '../authentification/types'
import User from '../models/user'

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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramsId = req.params.id
  const user: User = await User.findByPk(paramsId, {
    attributes: { exclude: ['password'] },
  })
  if (!user) {
    res.status(404).json({ message: 'Not Found' })
    return next()
  }
  res.status(200).json(user)
}

/**
 * Update a user
 * @Route /api/v1/users/:id - PUT
 */
export const updateUser = async (req: RequestAuth, res: Response) => {
  const paramsId = req.params.id
  const user: User = await User.findByPk(paramsId, {
    attributes: { exclude: ['password'] },
  })
  await user.update({
    ...req.body,
  })
  res.status(200).json(user)
}

/**
 * Delete a user
 * @Route /api/v1/users/:id - DELETE
 */
export const deleteUser = async (req: RequestAuth, res: Response) => {
  const paramsId = req.params.id
  const user: User = await User.findByPk(paramsId, {
    attributes: { exclude: ['password'] },
  })
  await user.destroy()
  res.status(204).json()
}
