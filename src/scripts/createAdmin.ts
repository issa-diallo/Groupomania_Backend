import { connexion } from '../database/sequelizeDb'
import { createUser } from '../controllers/authController'

const main = async () => {
  await connexion()
  const pseudo = process.env.ADMIN_PSEUDO
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const user = await createUser(pseudo, email, password)
  user.isAdmin = true
  user.save()
}
main()
