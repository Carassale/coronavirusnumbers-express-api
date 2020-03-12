import * as mongoose from "mongoose"
import {MongoError} from "mongodb"

import AppConfig from "../config/AppConfig"
import {logger} from "./logger"

let _kill = (err: any) => {
	logger.error(err)
	logger.error("MongoDB connection error. Please make sure MongoDB is running.", {
		type: 'services', module: 'Mongo', service: 'Connection'
	})
	process.exit()
}

let _successfulConnected = () => {
	logger.info("Connected to mongodb", {
		type: 'services', module: 'Mongo', service: 'Connection'
	})
	_seed().catch(logger.error)
}

let _seed = async () => {
}

let initialize = async () => {
	const serverMongoUri = AppConfig.mongoUri

	logger.info(`Connecting to mongo`, {
		type: 'services', module: 'Mongo', service: 'Initialize', uri: serverMongoUri
	})

	await mongoose.connect(serverMongoUri, {
		useNewUrlParser: true,
		useFindAndModify: false,
		autoReconnect: true,
		reconnectTries: 5,
		reconnectInterval: 500,
		connectTimeoutMS: 2000
	}, (err: MongoError) => {
		if (err) {
			_kill(err)
		}
		_successfulConnected()
	})

	mongoose.connection.on("connected", (err: Error) => {
		if (err) {
			_kill(err)
		}
		_successfulConnected()
	})

	mongoose.connection.on("error", (err: Error) => {
		_kill(err)
	})
}

export {initialize}
