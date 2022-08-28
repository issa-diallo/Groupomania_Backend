import app from './app'
import logger from './utils/logger'

app.listen(process.env.PORT, () => {
  logger.info(`Listening on port at http://localhost:${process.env.PORT}`)
})

export default app
