import express, {NextFunction, Request, Response} from "express"
import compression from "compression"
import {EventEmitter} from "events"
import helmet from "helmet"

import * as Socket from "./App/Helpers/SocketHelper"
import WebRoutes from "./routes/WebRoutes"
import AppConfig from "./config/AppConfig"
import ApiRouter from "./routes/ApiRouter"
import agenda from "./App/Jobs/AgendaJS"
import Listeners from "./App/Listeners"
import * as Mongo from "./utils/mongo"
import {logger} from "./utils/logger"

const {engine} = require('express-edge')
const session = require("express-session")
const cors = require('cors')

if (AppConfig.useApm) {
	require('elastic-apm-node').start({
		serviceName: `gucci-runner-booster-${AppConfig.environment}`
	})
}

Mongo.initialize().catch(logger.error)

export const eventEmitter = new EventEmitter()
Listeners(eventEmitter)

export const app: express.Application = express()
app.use(compression())
app.use(helmet())
app.use(cors({
	credentials: false,
  }))

app.use(session({secret: "keyboard cat", resave: false, saveUninitialized: true}))
app.use(session({secret: 'CHANGE-IT', resave: false, saveUninitialized: true, cookie: {}}))

app.use(engine)
app.set('views', `./build/resources/views`)

app.use('/api', ApiRouter)
app.use('/admin', WebRoutes)
app.get('/', (req: Request, res: Response, _next: NextFunction) => {
	return res.redirect('/admin')
})
app.get("/healthcheck", require("express-healthcheck")())

app.use(express.static('./build/public'))

agenda.start().then(async () => {
	let found = await agenda.jobs('update-country-data')
	if (found.length == 0) {
		const minutelyUpdate = agenda.create('update-country-data')
		await minutelyUpdate.repeatEvery('10 minute').save()
	}
})

let server = Socket.initialize(app)
server.listen(AppConfig.port, () => {
	logger.info(`App listening on port ${AppConfig.port}!`, {type: 'app', module: 'Server', service: 'Express'})
	logger.info(`Socket listening on port ${AppConfig.port}`, {type: 'app', module: 'Server', service: 'Socket'})
})
