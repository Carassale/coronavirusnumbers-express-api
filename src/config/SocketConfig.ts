import * as dotenv from "dotenv"

import BaseConfig from "./BaseConfig"

dotenv.config()

const SocketConfig = {
	get channelPath(): string {
		let path = process.env.SOCKET_CHANNEL_PATH as string
		if (!path) {
			path = "gucci_runner_store_"
		}
		return BaseConfig.logAndReturn(path)
	},

	get redisPort(): string {
		let port = process.env.REDIS_PORT as string
		if (!port) {
			port = "6379"
		}
		return BaseConfig.logAndReturn(port)
	},

	get redisEndpoint(): string {
		let endpoint = process.env.REDIS_ENDPOINT as string
		if (!endpoint) {
			endpoint = "localhost"
		}
		return BaseConfig.logAndReturn(endpoint)
	}
}

export default SocketConfig
