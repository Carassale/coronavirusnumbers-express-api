import * as dotenv from 'dotenv';

dotenv.config();

const AppConfig = {

  get environment(): string {
    return process.env.NODE_ENV as string;
  },

  get port(): string {
    return process.env.PORT as string;
  },

  get mongoUri(): string {
    let option = '';

    const replicaSet = process.env.MONGO_OPTIONS_REPLICA_SET as string;
    if (replicaSet && replicaSet != 'null') {
      option = `replicaSet=${replicaSet}`;
    }

    let mongoPort = process.env.MONGO_PORT as string;
    if (!mongoPort) {
      mongoPort = '27017';
    }

    let mongoDB = process.env.MONGO_DB as string;
    if (!mongoDB) {
      mongoDB = 'orso_bruno';
    }

    let host = process.env.MONGO_HOST as string;
    if (!host) {
      host = 'localhost';
    }

    return `mongodb://${host}:${mongoPort}/${mongoDB}?${option}`;
  },

  get logLevel(): string {
    let logLevel = 'info';
    if (process.env.LOG_LEVEL) {
      logLevel = process.env.LOG_LEVEL as string;
    }
    return logLevel;
  },
};

export default AppConfig;
