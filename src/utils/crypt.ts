import {logger} from "./logger"

/**
 * Encrypt an email
 *
 * @param {string} email
 * @constructor
 * @return string
 */
let encryptEmail = (email: string): string => {
	const regex = /(.).*(.@.*)/gm
	const subst = `$1***$2`

	const output = email.replace(regex, subst)
	logger.debug(`Encrypting email`, {
		type: 'utils',
		module: 'Conversion',
		service: 'HexToAscii',
		input: email,
		output: output
	})
	return output
}

export {encryptEmail}
