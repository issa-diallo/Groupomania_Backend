import { Response, Request } from 'express'
import Comment from '../models/comment'

export const commentAll = async (req: Request, res: Response) => {
  const comments = await Comment.findAll()
  res.status(200).json(comments)
}

export const createComment = async (req: Request, res: Response) => {
  const newComment = new Comment({
    user_id: parseInt(req.body.user_id),
    post_id: parseInt(req.params.id),
    text: req.body.text,
  })
  const coment = await newComment.save()
  return res.status(201).json(coment)
}

export const updateComment = async (req: Request, res: Response) => {
  const paramsId = req.params.id
  const comment: Comment = await Comment.findByPk(paramsId)
  const commentUpdated = await comment.update({
    text: req.body.text,
  })
  return res.status(200).json(commentUpdated)
}

export const deleteComment = async (req: Request, res: Response) => {
  const paramsId = req.params.id
  const comment: Comment = await Comment.findByPk(paramsId)
  await comment.destroy()
  return res.status(204).json()
}