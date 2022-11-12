import { Request } from 'express'
import fs from 'fs'

import User from '../../models/user'
import Post from '../../models/post'
import Like from '../../models/like'

/**
 * Retrieve a user in the and exclude the password
 */
export const getUser = async (req: Request) => {
  const paramsId = req.params.id

  const user: User = await User.findByPk(paramsId, {
    attributes: { exclude: ['password'] },
  })
  return user
}

/**
 * retrieve a post
 */
export const getPost = async (req: Request) => {
  const paramsId = req.params.id
  const post: Post = await Post.findByPk(paramsId)
  return post
}

/**
 * if the path does not exist, we create a directory
 */
export const mkdirSync = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

/**
 * we get the like associated with the post and return the number of likes of the post
 */
export const getLikeAndCount = async (req: Request) => {
  const post: Post = await getPost(req)

  const likes = await Like.findAndCountAll({
    attributes: ['user_id'],
    where: { post_id: post.id },
  })
  return likes
}
