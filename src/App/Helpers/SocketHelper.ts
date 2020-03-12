import {Application, NextFunction} from "express"

import {logger} from "../../utils/logger"

let socketIO: any

let initialize = (app: Application) => {
	const server = require("http").createServer(app)
	socketIO = require("socket.io")(server)

	socketIO.use(async (client: any, _next: NextFunction) => {
	})

	socketIO.on("connection", async (client: any) => {
		try {
			logger.info('Client connected', {
				event: 'connect',
				module: 'Socket',
				service: 'SocketConnection'
			})

			client.on("disconnect", async (reason: any) => {
				logger.info('Client disconnected', {
					reason: reason,
					event: 'disconnect',
					module: 'Socket',
					service: 'SocketConnection'
				})
			})
		} catch (e) {
			if (e.toConsole) {
				e.toConsole()
			} else {
				logger.error(e)
			}
		}
	})

	return server
}

export {initialize, socketIO}
