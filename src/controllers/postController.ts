import { Response, Request } from 'express'
import { POST_PATH, STORAGE_UPLOAD_POST } from '../utils/helpers/constants'
import Post from '../models/post'
import { getPictureUri, getPost } from '../utils/helpers/functions'
import fs from 'fs'
import { RequestAuth } from '../authentification/types'

/**
 * Get all post
 * @Route /api/v1/post
 */
export const readAllPost = async (req: Request, res: Response) => {
  const posts = await Post.findAll({
    order: [['updatedAt', 'DESC']],
  })
  res.status(200).json(posts)
}

/**
 * Get a post
 * @Route /api/v1/post/:id
 */
export const readPost = async (req: Request, res: Response) => {
  const post: Post = await getPost(req)
  res.status(200).json(post)
}

/**
 * Create a post
 * @Route /api/v1/post
 */
export const createPost = async (req: RequestAuth, res: Response) => {
  const newPost = new Post({
    user_id: req.auth.userId,
    message: req.body.message,
    picture: getPictureUri(req),
  })
  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).send(error)
  }
}

/**
 * Update a post
 * @Route /api/v1/post/:id
 */
export const updatePost = async (req: RequestAuth, res: Response) => {
  const post: Post = await getPost(req)

  const postObject = {
    user_id: req.auth.userId,
    message: req.body.message,
    picture: getPictureUri(req),
  }

  const filename = post.picture?.split(POST_PATH)[1]

  if (postObject.picture !== post.picture) {
    // Delete the image from the images folder.
    fs.unlink(`${STORAGE_UPLOAD_POST}/${filename}`, () => {
      /**/
    })
  }

  const postUpdate = await post.update({
    ...postObject,
  })
  return res.status(200).json(postUpdate)
}

/**
 * Delete a post
 * @Route /api/v1/post/:id
 */
export const deletePost = async (req: Request, res: Response) => {
  const post: Post = await getPost(req)

  const filename = post.picture?.split(POST_PATH)[1]
  if (filename) {
    // Delete the image from the images folder.
    fs.unlink(`${STORAGE_UPLOAD_POST}/${filename}`, () => {
      /**/
    })
  }
  await post.destroy()
  return res.status(204).json()
}
