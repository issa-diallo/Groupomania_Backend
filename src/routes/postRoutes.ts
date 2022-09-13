import { Router } from 'express'
import {
  readAllPost,
  readPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController'
import { auth } from '../middleware/auth'

const router = Router()

router.get('/', auth, readAllPost)
router.get('/:id', auth, readPost)
router.post('/', auth, createPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

export default router
