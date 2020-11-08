import * as dotenv from 'dotenv';

import AppConfig, { AppEnvironmentEnum } from './AppConfig';

dotenv.config();

const AwsConfig = {
  get connectionOption() {
    let region = process.env.SNS_REGION as string;
    if (!region) {
      region = 'eu-west-1';
    }

    if ([AppEnvironmentEnum.TEST, AppEnvironmentEnum.LOCAL].indexOf(AppConfig.environment) < 0) {
      return {
        region,
      };
    }
    return {
      accessKeyId: process.env.SNS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.SNS_ACCESS_SECRET_KEY as string,
      region,
    };
  },
};

export default AwsConfig;
