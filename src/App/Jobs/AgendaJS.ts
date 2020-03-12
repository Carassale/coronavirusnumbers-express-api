import AgendaJS from 'agenda'

import UpdateCountryDataJob from "./UpdateCountryDataJob"
import AppConfig from "../../config/AppConfig"

const agenda = new AgendaJS({
	db: {address: AppConfig.mongoUri, collection: 'my-agendajs-jobs'},
	processEvery: '5 seconds'
})

agenda.define('update-country-data',
	{priority: 'high', concurrency: 10},
	new UpdateCountryDataJob().handler, // reference to the handler, but not executing it!
)


export default agenda
