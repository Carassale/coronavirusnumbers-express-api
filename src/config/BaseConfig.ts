import * as dotenv from 'dotenv';

import Logger from '../utils/logger';

dotenv.config();

const BaseConfig = {

  logAndReturn(value: any): any {
    Logger.debug('Get variable from env', {
      module: 'config',
      // service: FileName,
      // method: MethodName,
      value,
    });

    return value;
  },
};

export default BaseConfig;
