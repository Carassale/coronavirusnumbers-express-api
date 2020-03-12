import * as dotenv from "dotenv"

import BaseConfig from "./BaseConfig"

dotenv.config()

export enum AppEnvironmentEnum {
	LOCAL = "local",
	TEST = "test",
	DEV = "development",
	STAG = "staging",
	PROD = "production"
}

const AppConfig = {

	get environment(): AppEnvironmentEnum {
		return process.env.NODE_ENV as AppEnvironmentEnum
	},

	get isDebugActive(): boolean {
		let active = process.env.DEBUG_ACTIVE == "true"
		return BaseConfig.logAndReturn(active)
	},

	get port(): string {
		let port = process.env.PORT as string
		return BaseConfig.logAndReturn(port)
	},

	get mongoUri(): string {
		let option = ''

		let replicaSet = process.env.MONGO_OPTIONS_REPLICA_SET as string
		if (replicaSet && replicaSet != 'null') {
			option = `replicaSet=${replicaSet}`
		}

		let mongoPort = process.env.MONGO_PORT as string
		if (!mongoPort) {
			mongoPort = "27017"
		}

		let mongoDB = process.env.MONGO_DB as string
		if (!mongoDB) {
			mongoDB = "runner_booster_db"
		}

		let uri = `mongodb://${process.env.MONGO_HOST}:${mongoPort}/${mongoDB}?${option}`
		return BaseConfig.logAndReturn(uri)
	},

	get triggerNewTimeoutAfter(): number {
		let time = 600000
		if (process.env.TRIGGER_TIMEOUT_AFTER) {
			time = parseInt(process.env.TRIGGER_TIMEOUT_AFTER)
		}
		return BaseConfig.logAndReturn(time)
	},

	get triggerTimeoutResendNewAfter(): number {
		let time = 60000
		if (process.env.TRIGGER_TIMEOUT_RESEND_NEW_AFTER) {
			time = parseInt(process.env.TRIGGER_TIMEOUT_RESEND_NEW_AFTER)
		}
		return BaseConfig.logAndReturn(time)
	},

	get triggerAcceptedTimeoutAfter(): number {
		let time = 600000
		if (process.env.TRIGGER_ACCEPTED_TIMEOUT_AFTER) {
			time = parseInt(process.env.TRIGGER_ACCEPTED_TIMEOUT_AFTER)
		}
		return BaseConfig.logAndReturn(time)
	},

	get saPathImgUrl(): string {
		let path = process.env.SA_PATH_IMG_URL as string
		return BaseConfig.logAndReturn(path)
	},

	get baseUrl(): string {
		let url = process.env.BASE_URL as string
		return BaseConfig.logAndReturn(url)
	},

	get logLevel(): string {
		let logLevel = "info"
		if (process.env.LOG_LEVEL) {
			logLevel = process.env.LOG_LEVEL as string
		}
		return logLevel
	},

	get useApm(): boolean {
		let useApm = process.env.ELASTICSEARCH_USE_APM == "true"
		return BaseConfig.logAndReturn(useApm)
	}
}

export default AppConfig
