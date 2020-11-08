import * as SNS from 'aws-sdk/clients/sns';
import * as dotenv from 'dotenv';

import BaseConfig from './BaseConfig';
import AwsConfig from './AwsConfig';

dotenv.config();

const SnsConfig = {
  get connectionOption(): SNS.Types.ClientConfiguration {
    const options = AwsConfig.connectionOption;
    return BaseConfig.logAndReturn(options);
  },

  get platformApplicationArn(): string {
    const arn = process.env.SNS_APP_ARN as string;
    return BaseConfig.logAndReturn(arn);
  },

  get blockSNSPush(): boolean {
    const block = process.env.SNS_PUSH_BLOCK == 'true';
    return BaseConfig.logAndReturn(block);
  },
};

export default SnsConfig;
