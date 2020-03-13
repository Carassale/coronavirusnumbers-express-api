import {EventEmitter} from "events"

import CountryListeners from "./CountryListeners"

export default (eventEmitter: EventEmitter) => {

	CountryListeners(eventEmitter)
}
