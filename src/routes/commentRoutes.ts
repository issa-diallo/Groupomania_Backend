import { Router } from 'express'
import {
  commentAll,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController'
import { auth } from '../middleware/auth'

const router = Router()

// Comments
router.get('/', auth, commentAll)
router.post('/:id', auth, createComment)
router.put('/:id', auth, updateComment)
router.delete('/:id', auth, deleteComment)

export default router
