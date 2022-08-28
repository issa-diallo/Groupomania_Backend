import { Router } from 'express'
import { signUp } from '../controllers/authController'
const router = Router()

router.post('/register', signUp)

export default router
