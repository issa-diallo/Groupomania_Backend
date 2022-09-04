import { Router } from 'express'
import { signUp, signIn, logout } from '../controllers/authController'
import {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser,
} from '../controllers/userController'

const router = Router()

// auth
router.post('/register', signUp)
router.post('/login', signIn)
router.get('/logout', logout)

// user DB
router.get('/', getAllUsers)
router.get('/:id', userInfo)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
