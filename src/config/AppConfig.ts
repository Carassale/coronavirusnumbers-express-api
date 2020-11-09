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
    return process.env.MONGO_URI as string;
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
