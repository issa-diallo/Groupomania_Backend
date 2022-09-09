import { Router } from 'express'
import { signUp, signIn, logout } from '../controllers/authController'
import {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser,
} from '../controllers/userController'
import { auth } from '../middleware/auth'

const router = Router()

// auth
router.post('/register', signUp)
router.post('/login', signIn)
router.get('/logout', logout)

// user DB
router.get('/', auth, getAllUsers)
router.get('/:id', auth, userInfo)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

export default router
