import {ResponseError} from "../../utils/errors"

export interface TransInterface {
	[key: string]: string
}

export const TransFallback = 'en'

export default class Trans {

	private readonly file: string
	private readonly index: string
	private readonly args?: Object

	constructor(name: string, args?: Object) {
		this.file = name.split(".")[0]
		this.index = name.split(".")[1]
		this.args = args
	}

	public get(language?: string): string {
		let value

		if (language && this.exist(language)) {
			value = this.gerFromFile(language)
		} else {
			value = this.gerFromFile(TransFallback)
		}

		return this.manipulateMeta(value)
	}

	private gerFromFile(language: string): string {
		let value
		try {
			let trans = require(`./${language}/${this.file}`).trans
			value = trans[this.index]
		} catch (e) {
			throw new ResponseError(500, 'Translation not found', [{file: this.file, index: this.index}])
		}
		return value
	}

	private exist(language: string): boolean {
		try {
			let trans = require(`./${language}/${this.file}`).trans
			return trans[this.index] != undefined
		} catch (e) {
			return false
		}
	}

	private manipulateMeta(value: string): string {
		for (let key in this.args) {
			if (this.args.hasOwnProperty(key)) {
				// @ts-ignore
				value = value.replace(`:${key}`, this.args[key])
			}
		}
		return value
	}
}

