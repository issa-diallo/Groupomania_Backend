import { sequelize } from '../database/sequelizeDb'
import { createUser } from '../controllers/authController'

const main = async () => {
  await sequelize.authenticate()
  const pseudo = process.env.ADMIN_PSEUDO
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const user = await createUser(pseudo, email, password)
  user.isAdmin = true
  await user.save()
  sequelize.close()
}
main()
