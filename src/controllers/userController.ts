import { Response, Request } from 'express'
import { userAllowedOr401 } from '../authentification/userNotAllowed'
import { RequestAuth } from '../authentification/types'
import User from '../models/user'
import { getUser } from '../utils/helpers/functions'
import fs from 'fs'
import { PROFIL_PATH } from '../utils/helpers/constants'

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
    const user: User = await getUser(req)
    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}

/**
 * Update a user
 * @Route /api/v1/users/:id - PUT
 */
export const updateUser = async (req: RequestAuth, res: Response) => {
  try {
    const user: User = await getUser(req)
    userAllowedOr401(user, req.auth.userId, res)

    const userUpdate = await user.update({
      bio: req.body.bio,
      email: req.body.email,
    })

    return res.status(200).json(userUpdate)
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}

/**
 * Insert a image
 * @Route /api/v1/users/upload/:id - POST
 */
export const uploadUser = async (req: RequestAuth, res: Response) => {
  try {
    const user: User = await getUser(req)
    userAllowedOr401(user, req.auth.userId, res)
    if (req.file === null || req.file === undefined) {
      return res
        .status(400)
        .json({ message: 'No file uploaded null or undefined' })
    }
    const userObject = {
      picture: `${req.protocol}://${req.get('host')}${PROFIL_PATH}${
        req.file.filename
      }`,
    }

    const filename = user.picture?.split(PROFIL_PATH)[1]

    if (userObject.picture !== user.picture) {
      // Delete the image from the images folder.
      fs.unlink(`images/${filename}`, () => {
        /**/
      })
    }

    const userUpdate = await user.update({
      ...userObject,
    })

    return res.status(200).json(userUpdate)
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}

/**
 * Delete a user
 * @Route /api/v1/users/:id - DELETE
 */
export const deleteUser = async (req: RequestAuth, res: Response) => {
  try {
    const user: User = await getUser(req)
    userAllowedOr401(user, req.auth.userId, res)

    const filename = user.picture?.split(PROFIL_PATH)[1]
    if (filename) {
      // Delete the image from the images folder.
      fs.unlink(`${PROFIL_PATH}${filename}`, () => {
        /**/
      })
    }
    await user.destroy()
    return res.status(204).json()
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}
