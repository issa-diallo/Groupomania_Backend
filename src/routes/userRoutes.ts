import { Router } from 'express'
import { signUp } from '../controllers/authController'
import {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser,
} from '../controllers/userController'

const router = Router()

// auth
router.post('/register', signUp)

// user DB
router.get('/', getAllUsers)
router.get('/:id', userInfo)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
