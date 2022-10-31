import { Response } from 'express'
import Like from '../models/like'
import { RequestAuth } from '../authentification/types'
import Post from '../models/post'
import { getLikeAndCount, getPost } from '../utils/helpers/functions'

/**
 * @Route /api/v1/post/like/:id POST
 */
export const likePost = async (req: RequestAuth, res: Response) => {
  const newLike = new Like({
    user_id: parseInt(req.body.user_id),
    post_id: parseInt(req.params.id),
  })
  await newLike.save()
  const data = getLikeAndCount(req)
  return res
    .status(201)
    .json({ message: 'Your like has been added!', count: (await data).count })
}

/**
 * @Route /api/v1/post/unlike/:id POST
 */
export const unLikePost = async (req: RequestAuth, res: Response) => {
  const like = await Like.findOne({
    where: { post_id: req.params.id, user_id: req.body.user_id },
  })
  await like.destroy()
  const data = getLikeAndCount(req)
  return res
    .status(201)
    .json({ message: 'Your like has been removed!', count: (await data).count })
}

/**
 * @Route /api/v1/post/like/:id GET
 */
export const getLikePost = async (req: RequestAuth, res: Response) => {
  const post: Post = await getPost(req)

  const { count, rows } = await Like.findAndCountAll({
    attributes: ['user_id'],
    where: { post_id: post.id },
  })
  res.status(200).json({ count: count, likes: rows })
}
