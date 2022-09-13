import 'dotenv/config'
import logger from '../utils/logger'
import userModel from '../models/user'
import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: 'mysql',
  port: 3306,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  models: [userModel],
  logging: false,
})

export const connexion = async () => {
  try {
    await sequelize.authenticate()
    logger.info(
      `Connection has ${process.env.DATABASE} been established successfully.`
    )
    // await sequelize.sync({ force: true }) // (force: true) completely deleted the table at each synchronization
  } catch (error) {
    logger.fatal('Unable to connect to the database:', error)
  }
}
