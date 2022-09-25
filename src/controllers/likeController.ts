import { Response } from 'express'
import Like from '../models/like'
import { RequestAuth } from '../authentification/types'

export const likePost = async (req: RequestAuth, res: Response) => {
  const newLike = new Like({
    user_id: parseInt(req.body.user_id),
    post_id: parseInt(req.params.id),
  })
  const like = await newLike.save()
  return res.status(200).json(like)
}
export const unLikePost = async (req: RequestAuth, res: Response) => {
  const like = await Like.findOne({
    where: { post_id: req.params.id, user_id: req.body.user_id },
  })
  await like.destroy()
  return res.status(204).json()
}
