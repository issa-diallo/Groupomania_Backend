import { Router } from 'express'
import {
  readAllPost,
  readPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController'
import { likePost, unLikePost } from '../controllers/likeController'
import { auth } from '../middleware/auth'
import multerPostConfig from '../middleware/multer-post-config'

const router = Router()

// posts
router.get('/', auth, readAllPost)
router.get('/:id', auth, readPost)
router.post('/', auth, multerPostConfig, createPost)
router.put('/:id', auth, multerPostConfig, updatePost)
router.delete('/:id', auth, multerPostConfig, deletePost)
// likes
router.post('/like/:id', auth, likePost)
router.delete('/unlike/:id', auth, unLikePost)

export default router
