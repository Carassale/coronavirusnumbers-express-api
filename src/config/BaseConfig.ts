import * as dotenv from "dotenv"

import {logger} from "../utils/logger"

dotenv.config()

const BaseConfig = {

	logAndReturn(value: any): any {
		logger.debug("Get variable from env", {
			module: "config",
			// service: FileName,
			// method: MethodName,
			value: value
		})

		return value
	}
}

export default BaseConfig
