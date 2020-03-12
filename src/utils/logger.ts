import {ConsoleTransportInstance, FileTransportInstance} from "winston/lib/winston/transports"
import * as Transport from 'winston-transport'
import {Request, Response} from "express"

import AppConfig, {AppEnvironmentEnum} from "../config/AppConfig"

const winston = require('winston')
const ElasticSearch = require('winston-elasticsearch')
const expressWinston = require("express-winston")

const _formatter = winston.format((info: any, _opts: any) => {
	if (info.message instanceof Error) {
		info.message = Object.assign({
			message: info.message.message,
			stack: info.message.stack
		}, info.message)
	}

	if (info instanceof Error) {
		return Object.assign({
			message: info.message,
			stack: info.stack
		}, info)
	}

	info.level = info.level.toUpperCase()
	info.environment = process.env.NODE_ENV

	return info
})

let _transports = (): Transport[] => {
	let transports: Transport[] = [
		_consoleTransport()
	]
	if (AppConfig.environment == AppEnvironmentEnum.LOCAL) {
		transports.push(_logStashTransport())
	} else {
		transports.push(_fileTransport())
	}
	return transports
}

let _logStashTransport = () => {
	const {Client} = require('@elastic/elasticsearch')
	const client = new Client({
		node: process.env.ELASTICSEARCH_NODE
	})

	return new ElasticSearch({
		client: client,
		indexPrefix: "gucci_runner_booster_local"
	})
}

let _consoleTransport = (): ConsoleTransportInstance => {
	let options
	if (AppConfig.environment == AppEnvironmentEnum.LOCAL) {
		options = {
			format: winston.format.combine(
				winston.format.cli(),
				winston.format.splat(),
			)
		}
	}
	return new winston.transports.Console(options)
}

let _fileTransport = (): FileTransportInstance => {
	return new winston.transports.File({
		dirname: __dirname + `/../../logs/`,
		filename: `error.log`
	})
}

const logger = winston.createLogger({
	level: AppConfig.logLevel,
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.errors({stack: true}),
		winston.format.splat(),
		_formatter(),
		winston.format.json()
	),
	transports: _transports()
})

const expressLogger = new expressWinston.logger({
	transports: _transports(),
	format: winston.format.combine(
		_formatter(),
		winston.format.timestamp(),
		winston.format.json()
	),
	requestWhitelist: ['headers', 'query', 'body'],
	meta: true, // optional: control whether you want to log the meta data about the request (default to true)
	msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
	colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
	ignoreRoute: function (req: Request, _res: Response) {
		if (req.url.includes('data_table')) {
			return true
		}

		const ignoredRoute = [
			"/healthcheck"
		]
		return ignoredRoute.includes(req.url)
	}
})

export {logger, expressLogger}
