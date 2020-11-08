import * as dotenv from 'dotenv';

import BaseConfig from './BaseConfig';

dotenv.config();

export enum AppEnvironmentEnum {
  LOCAL = 'local',
  TEST = 'test',
  DEV = 'development',
  STAG = 'staging',
  PROD = 'production'
}

const AppConfig = {

  get environment(): AppEnvironmentEnum {
    return process.env.NODE_ENV as AppEnvironmentEnum;
  },

  get isDebugActive(): boolean {
    const active = process.env.DEBUG_ACTIVE == 'true';
    return BaseConfig.logAndReturn(active);
  },

  get port(): string {
    const port = process.env.PORT as string;
    return BaseConfig.logAndReturn(port);
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

    const uri = `mongodb://${host}:${mongoPort}/${mongoDB}?${option}`;
    return BaseConfig.logAndReturn(uri);
  },

  get baseUrl(): string {
    const base_url = process.env.BASE_URL as string;
    const port = process.env.PORT as string;

    return BaseConfig.logAndReturn(`${base_url}:${port}`);
  },

  get logLevel(): string {
    let logLevel = 'info';
    if (process.env.LOG_LEVEL) {
      logLevel = process.env.LOG_LEVEL as string;
    }
    return logLevel;
  },

  get useApm(): boolean {
    const useApm = process.env.ELASTICSEARCH_USE_APM == 'true';
    return BaseConfig.logAndReturn(useApm);
  },
};

export default AppConfig;
