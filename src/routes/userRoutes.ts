import { Router } from 'express'
import multerConfig from '../middleware/multer-config'
import { signUp, signIn } from '../controllers/authController'
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

// user DB
router.get('/', auth, getAllUsers)
router.get('/:id', auth, userInfo)
router.put('/:id', auth, multerConfig, updateUser)
router.delete('/:id', auth, deleteUser)

export default router
