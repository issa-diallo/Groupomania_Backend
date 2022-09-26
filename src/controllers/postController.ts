import { Response, Request } from 'express'
import Post from '../models/post'
import { getPost } from '../utils/helpers/functions'

/**
 * @Route /api/v1/post
 */
export const readAllPost = async (req: Request, res: Response) => {
  const posts = await Post.findAll()
  res.status(200).json(posts)
}

/**
 * @Route /api/v1/post/:id
 */
export const readPost = async (req: Request, res: Response) => {
  const post: Post = await getPost(req)
  res.status(200).json(post)
}

/**
 * @Route /api/v1/post
 */
export const createPost = async (req: Request, res: Response) => {
  const newPost = new Post({
    user_id: req.body.user_id,
    message: req.body.message,
    picture: req.body.picture,
    video: req.body.video,
    likers: req.body.likers,
  })
  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).send(error)
  }
}

/**
 * @Route /api/v1/post/:id
 */
export const updatePost = async (req: Request, res: Response) => {
  const post: Post = await getPost(req)
  const postUpdate = await post.update({
    message: req.body.message,
  })
  return res.status(200).json(postUpdate)
}

/**
 * @Route /api/v1/post/:id
 */
export const deletePost = async (req: Request, res: Response) => {
  const post: Post = await getPost(req)
  await post.destroy()
  return res.status(204).json()
}
