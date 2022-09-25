import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import userModel from '../models/user'
import postModel from '../models/post'
import { Sequelize } from 'sequelize-typescript'
dotenv.config({ override: true })

export const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  dialect: 'mysql',
  port: 3306,
  username: process.env.USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  host: process.env.HOST,
  models: [userModel, postModel],
  logging: false,
})

export const connexion = async () => {
  try {
    await sequelize.authenticate()
    console.info(
      `Connection has ${process.env.MYSQL_DATABASE} been established successfully.`
    )
    // await sequelize.sync({ force: true }) // (force: true) completely deleted the table at each synchronization
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error
  }
}
