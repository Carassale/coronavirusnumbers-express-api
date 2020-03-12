import {logger} from "./logger"

/**
 * Convert hex string to ascii
 *
 * @param {string} str1
 * @constructor
 */
export const HexToAscii = (str1: string): string => {
	logger.debug(`Convert hex string to ascii`, {type: 'utils', module: 'Conversion', service: 'HexToAscii'})
	let hex = str1.toString()
	let str = ""
	for (let n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
	}
	return str
}
