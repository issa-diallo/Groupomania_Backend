import { Router } from 'express'
import multerConfig from '../middleware/multer-config'
import { signUp, signIn, getUserToken } from '../controllers/authController'
import {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser,
  uploadUser,
} from '../controllers/userController'
import { auth } from '../middleware/auth'

const router = Router()

// auth
router.post('/register', signUp)
router.post('/login', signIn)
router.get('/jwtid', getUserToken)

// user DB
router.get('/', auth, getAllUsers)
router.post('/upload/:id', auth, multerConfig, uploadUser)
router.get('/:id', auth, userInfo)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

export default router
