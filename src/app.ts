import express from 'express';
import config from 'config';
import logger from './utils/logger';

const port = config.get<number>('port');

const app = express();

app.listen(port, () => {
  logger.info(`Listening on port at http://localhost:${port}`);
});
