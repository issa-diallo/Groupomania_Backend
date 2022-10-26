import { Response, Request } from 'express'
import { RELATIVE_UPLOAD_POST_PATH } from '../utils/helpers/constants'
import Post from '../models/post'
import { getPost } from '../utils/helpers/functions'
import fs from 'fs'

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
export const createPost = async (req: Request, res: Response) => {
  const newPost = new Post(
    req.file
      ? {
          user_id: req.body.user_id,
          message: req.body.message,
          picture: `${req.protocol}://${req.get(
            'host'
          )}/${RELATIVE_UPLOAD_POST_PATH}${req.file.filename}`,
          video: req.body.video,
        }
      : {
          user_id: req.body.user_id,
          message: req.body.message,
          video: req.body.video,
        }
  )
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
export const updatePost = async (req: Request, res: Response) => {
  const post: Post = await getPost(req)

  const postObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get(
          'host'
        )}/${RELATIVE_UPLOAD_POST_PATH}${req.file.filename}`,
      }
    : { ...req.body }

  const filename = post.picture?.split(RELATIVE_UPLOAD_POST_PATH)[1]

  if (postObject.picture !== post.picture) {
    // Delete the image from the images folder.
    fs.unlink(`${RELATIVE_UPLOAD_POST_PATH}${filename}`, () => {
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

  const filename = post.picture?.split(RELATIVE_UPLOAD_POST_PATH)[1]

  if (filename) {
    // Delete the image from the images folder.
    fs.unlink(`${RELATIVE_UPLOAD_POST_PATH}${filename}`, () => {
      /**/
    })
  }
  await post.destroy()
  return res.status(204).json()
}
