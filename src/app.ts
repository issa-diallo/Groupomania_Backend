import express from 'express'
import config from 'config'
import logger from './utils/logger'
import { Sequelize } from 'sequelize'

const port = config.get<number>('port')
const app = express()

const MYSQL_HOST = config.get<string>('MYSQL_HOST')
const MYSQL_USER = config.get<string>('MYSQL_USER')
const MYSQL_PASSWORD = config.get<string>('MYSQL_PASSWORD')
const MYSQL_DATABASE = config.get<string>('MYSQL_DATABASE')
const MYSQL_PORT = config.get<number>('MYSQL_PORT')

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  port: MYSQL_PORT,
})

const connexion = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Connection has been established successfully.')
  } catch (error) {
    logger.fatal('Unable to connect to the database:', error)
  }
}

connexion()

app.listen(port, () => {
  logger.info(`Listening on port at http://localhost:${port}`)
})
