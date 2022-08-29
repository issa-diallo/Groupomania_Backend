import { RequestHandler } from 'express'
import User from '../models/user'

/**
 * Get all users
 * @Route /api/v1/users/ - GET
 */
export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
}

/**
 * Get a user
 * @Route /api/v1/users/ - GET
 */
export const userInfo: RequestHandler = async (req, res, next) => {
  const paramsId = req.params.id
  const user: User = await User.findByPk(paramsId)
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
export const updateUser: RequestHandler = async (req, res) => {
  const paramsId = req.params.id
  const user: User = await User.findByPk(paramsId)
  await user.update({
    ...req.body,
  })
  res.status(200).json(user)
}

/**
 * Delete a user
 * @Route /api/v1/users/:id - DELETE
 */
export const deleteUser: RequestHandler = async (req, res) => {
  const paramsId = req.params.id
  const user: User = await User.findByPk(paramsId)
  await user.destroy()
  res.status(204).json()
}
