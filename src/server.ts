import compression from 'compression';
import { EventEmitter } from 'events';
import express from 'express';
import helmet from 'helmet';

import MongoInitializer from './utils/mongo';
import AppConfig from './config/AppConfig';
import ApiRouter from './routes/ApiRouter';
import agenda from './App/Jobs/AgendaJS';
import Listeners from './App/Listeners';
import Logger from './utils/logger';

const cors = require('cors');

MongoInitializer().catch(Logger.error);

export const eventEmitter = new EventEmitter();
Listeners(eventEmitter);

const app: express.Application = express();
app.use(compression());
app.use(helmet());
app.use(cors({
  credentials: false,
}));

app.use('/api', ApiRouter);

agenda.start().then(async () => {
  const found = await agenda.jobs('update-country-data');
  if (found.length == 0) {
    const minutelyUpdate = agenda.create('update-country-data');
    await minutelyUpdate.repeatEvery('10 minute').save();
  }
});

const server = require('http').createServer(app);

server.listen(AppConfig.port, () => {
  Logger.info(`App listening on port ${AppConfig.port}!`, {type: 'app', module: 'Server', service: 'Express'});
});
