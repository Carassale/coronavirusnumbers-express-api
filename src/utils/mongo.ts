import AppConfig from '../config/AppConfig';
import Logger from './logger';

const mongoose = require('mongoose');

const MongoInitializer = async () => {
  const {mongoUri} = AppConfig;

  const mongoOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    autoReconnect: true,
    reconnectTries: 5,
    reconnectInterval: 500,
    connectTimeoutMS: 2000,
    useCreateIndex: true,
  };

  const logOptions = {
    type: 'services',
    module: 'Mongo',
    service: 'Initialize',
    mongoUri,
    mongoOptions,
  };

  const db = mongoose.connection;

  db.on('connecting', () => {
    Logger.info('Connecting to mongo', logOptions);
  });
  db.on('error', (error: any) => {
    Logger.error(`Error in MongoDb connection: ${error}`, logOptions);
    mongoose.disconnect();
  });
  db.on('connected', () => {
    Logger.info('MongoDB connected!', logOptions);
  });
  db.once('open', () => {
    Logger.info('MongoDB connection opened!', logOptions);
  });
  db.on('reconnected', () => {
    Logger.info('MongoDB reconnected!', logOptions);
  });
  db.on('disconnected', () => {
    Logger.info('MongoDB disconnected!', logOptions);
    mongoose.connect(mongoUri, mongoOptions);
  });

  mongoose.connect(mongoUri, mongoOptions).catch((e: any) => Logger.error(e, logOptions));
};

export default MongoInitializer;
