import { sequelize } from '../database/sequelizeDb'
import { createUser } from '../controllers/authController'
import { faker } from '@faker-js/faker'
import Post from '../models/post'

const main = async () => {
  await sequelize.authenticate()
  faker.setLocale('fr')
  for (let p = 0; p < 15; p++) {
    // User
    const pseudo = faker.name.firstName()
    const email = faker.internet.email().toLowerCase()
    const password = 'password'
    const user = await createUser(pseudo, email, password)
    user.picture = faker.image.avatar()
    await user.save()
    // Post
    const post = new Post()
    post.user_id = user.id
    post.message = faker.lorem.paragraph()
    post.picture = faker.image.sports(570, 570, true)
    await post.save()
  }

  sequelize.close()
}
main()
