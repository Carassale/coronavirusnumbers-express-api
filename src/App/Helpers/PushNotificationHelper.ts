import * as SNS from "aws-sdk/clients/sns"
import * as AWS from "aws-sdk"

import {ResponseError} from "../../utils/errors"
import SnsConfig from "../../config/SnsConfig"
import {logger} from "../../utils/logger"
import {User} from "../Models/UserModel"

export default class PushNotificationRepository {

	private sns: AWS.SNS

	constructor() {
		this.sns = new AWS.SNS(SnsConfig.connectionOption)
	}

	async pushNotification(user: User, title: string, body: string): Promise<void> {
		logger.info(`Sending push notification`, {user: user, title: title, body: body})

		if (SnsConfig.blockSNSPush) {
			logger.info(`Push notification blocked by env`, {
				type: 'connector',
				module: 'PushNotification',
				service: 'PushNotification'
			})
			return
		}

		let params: SNS.Types.PublishInput = {
			TargetArn: user.endpoint,
			MessageStructure: "json",
			Message: JSON.stringify({
				default: body,
				APNS: JSON.stringify({
					aps: {
						alert: {
							title: title,
							body: body
						},
						sound: "default",
						badge: 0
					}
				})
			})
		}

		await this.sns.publish(
			params
		).promise().then((data: SNS.Types.PublishResponse) => {
			logger.info(`Message pushed`, {
				user: user,
				type: 'connector',
				module: 'PushNotification',
				service: 'PublishMessage',
				message_id: data.MessageId
			})
		}).catch((err: AWS.AWSError) => {
			throw new ResponseError(err.statusCode, err.message, [{
				user: user,
				type: 'connector',
				module: 'PushNotification',
				service: 'PublishMessage'
			}])
		})
	}

	public async addDeviceToken(user: User): Promise<string> {
		let params = {
			PlatformApplicationArn: SnsConfig.platformApplicationArn,
			Token: user.deviceToken
		}

		let endpointArn = ""

		await this.sns.createPlatformEndpoint(
			params
		).promise().then((data: SNS.Types.CreateEndpointResponse) => {
			if (data.EndpointArn) {
				logger.info(`Platform endpoint created`, {
					type: 'connector',
					module: 'PushNotification',
					service: 'SNSAddEndpoint',
					endpointArn: data.EndpointArn
				})
				endpointArn = data.EndpointArn
			}
		}).catch((err: AWS.AWSError) => {
			throw new ResponseError(err.statusCode, err.message)
		})

		return endpointArn
	}

	public async removeDeviceToken(user: User): Promise<void> {
		let endpointArn = user.endpoint

		let params: SNS.Types.DeleteEndpointInput = {
			EndpointArn: endpointArn
		}

		await this.sns.deleteEndpoint(
			params
		).promise().then((_data: {}) => {
			logger.info(`Platform endpoint removed`, {
				type: 'connector',
				module: 'PushNotification',
				service: 'SNSDeleteEndpoint',
				endpointArn: endpointArn
			})
		}).catch((err: AWS.AWSError) => {
			throw new ResponseError(err.statusCode, err.message)
		})
	}
}
