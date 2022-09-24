import { Request } from 'express'

import User from '../../models/user'
import Post from '../../models/post'

export const getUser = async (req: Request) => {
  const paramsId = req.params.id

  const user: User = await User.findByPk(paramsId, {
    attributes: { exclude: ['password'] },
  })
  return user
}

export const getPost = async (req: Request) => {
  const paramsId = req.params.id
  const post: Post = await Post.findByPk(paramsId)
  return post
}