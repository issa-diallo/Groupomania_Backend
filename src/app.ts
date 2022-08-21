import express from 'express'
import 'dotenv/config'
import logger from './utils/logger'
import { Sequelize } from 'sequelize'

const app = express()

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: 3310,
  }
)

const connexion = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Connection has been established successfully.')
  } catch (error) {
    logger.fatal('Unable to connect to the database:', error)
  }
}

connexion()

app.listen(process.env.PORT, () => {
  logger.info(`Listening on port at http://localhost:${process.env.PORT}`)
})
