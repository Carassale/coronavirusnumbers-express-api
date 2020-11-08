import * as SNS from 'aws-sdk/clients/sns';
import * as AWS from 'aws-sdk';

import { ResponseError } from '../../utils/errors';
import SnsConfig from '../../config/SnsConfig';
import Logger from '../../utils/logger';
import { User } from '../Models/UserModel';

export default class PushNotificationRepository {
  private sns: AWS.SNS;

  constructor() {
    this.sns = new AWS.SNS(SnsConfig.connectionOption);
  }

  async pushNotification(user: User, title: string, body: string): Promise<void> {
    Logger.info('Sending push notification', {user, title, body});

    if (SnsConfig.blockSNSPush) {
      Logger.info('Push notification blocked by env', {
        type: 'connector',
        module: 'PushNotification',
        service: 'PushNotification',
      });
      return;
    }

    const params: SNS.Types.PublishInput = {
      TargetArn: user.endpoint,
      MessageStructure: 'json',
      Message: JSON.stringify({
        default: body,
        APNS: JSON.stringify({
          aps: {
            alert: {
              title,
              body,
            },
            sound: 'default',
            badge: 0,
          },
        }),
      }),
    };

    await this.sns.publish(
      params,
    ).promise().then((data: SNS.Types.PublishResponse) => {
      Logger.info('Message pushed', {
        user,
        type: 'connector',
        module: 'PushNotification',
        service: 'PublishMessage',
        message_id: data.MessageId,
      });
    }).catch((err: AWS.AWSError) => {
      throw new ResponseError(err.statusCode, err.message, [{
        user,
        type: 'connector',
        module: 'PushNotification',
        service: 'PublishMessage',
      }]);
    });
  }

  public async addDeviceToken(deviceToken: string): Promise<string> {
    const params = {
      PlatformApplicationArn: SnsConfig.platformApplicationArn,
      Token: deviceToken,
    };

    let endpointArn = '';

    await this.sns.createPlatformEndpoint(
      params,
    ).promise().then((data: SNS.Types.CreateEndpointResponse) => {
      if (data.EndpointArn) {
        Logger.info('Platform endpoint created', {
          type: 'connector',
          module: 'PushNotification',
          service: 'SNSAddEndpoint',
          endpointArn: data.EndpointArn,
        });
        endpointArn = data.EndpointArn;
      }
    }).catch((err: AWS.AWSError) => {
      throw new ResponseError(err.statusCode, err.message);
    });

    return endpointArn;
  }

  public async removeDeviceToken(user: User): Promise<void> {
    if (!user.endpoint) {
      return;
    }

    const params: SNS.Types.DeleteEndpointInput = {
      EndpointArn: user.endpoint,
    };

    await this.sns.deleteEndpoint(
      params,
    ).promise().then((_data: {}) => {
      Logger.info('Platform endpoint removed', {
        type: 'connector',
        module: 'PushNotification',
        service: 'SNSDeleteEndpoint',
        endpointArn: user.endpoint,
      });
    }).catch((err: AWS.AWSError) => {
      throw new ResponseError(err.statusCode, err.message);
    });
  }
}
