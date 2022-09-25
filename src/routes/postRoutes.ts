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

const router = Router()

router.get('/', auth, readAllPost)
router.get('/:id', auth, readPost)
router.post('/', auth, createPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
// likes
router.post('/like/:id', auth, likePost)
router.delete('/unlike/:id', auth, unLikePost)

export default router
