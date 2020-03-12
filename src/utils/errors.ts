import {Response} from "express"

import AppConfig from "../config/AppConfig"
import {logger} from "./logger"

const DEFAULT_STATUS_CODE = 500
const DEFAULT_MESSAGE = 'Something went wrong!<br />¯\\_(ツ)_/¯'
const DEFAULT_ERROR_VIEW = 'utils/error'

class ResponseError extends Error {
	statusCode: number
	message: string
	meta: Array<any>

	constructor(statusCode: number, message: string, meta: Array<any> = []) {
		super(message)
		this.statusCode = statusCode
		this.message = message
		this.meta = meta
	}
}

const writeError = (e: any, res: Response) => {
	if (!(e instanceof ResponseError)) {
		logger.error(e)
	}

	if (!e.statusCode) e.statusCode = DEFAULT_STATUS_CODE
	if (!e.message) e.message = DEFAULT_MESSAGE
	if (!e.meta) e.meta = []

	res.status(e.statusCode).send({error: e.message, meta: e.meta})
}

const writeViewError = (e: any, res: Response) => {
	if (!(e instanceof ResponseError)) {
		logger.error(e)
	}

	if (!e.statusCode) e.statusCode = DEFAULT_STATUS_CODE
	if (!e.message) e.message = DEFAULT_MESSAGE
	let stackTrace = AppConfig.isDebugActive ? e.stack : undefined

	res.status(e.statusCode).render(DEFAULT_ERROR_VIEW, {
		message: e.message,
		stackTrace: stackTrace
	})
}

export {ResponseError, writeError, writeViewError}
