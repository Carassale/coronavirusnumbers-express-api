import * as nodeMailer from "nodemailer"
import * as dotenv from "dotenv"
import * as aws from "aws-sdk"

import {logger} from "../utils/logger"
import BaseConfig from "./BaseConfig"

dotenv.config()

const EmailConfig = {
	get makeTransporter(): any { // nodeMailer.Transporter | aws.SES
		if (this.isSmtp) {
			let options = {
				host: process.env.MAIL_SMTP_HOST,
				port: parseInt(process.env.MAIL_SMTP_PORT as string),
				auth: {
					user: process.env.MAIL_SMTP_USERNAME,
					pass: process.env.MAIL_SMTP_PASSWORD
				}
			}
			logger.debug("Get from env", {config: "EmailConfig", method: "makeTransporter_options", value: options})
			return nodeMailer.createTransport(options)
		} else {
			logger.info("Make transport email SES")
			return new aws.SES({
				region: "eu-west-1"
			})
		}
	},

	get fromEmail(): string {
		let email = process.env.MAIL_FROM as string
		return BaseConfig.logAndReturn(email)
	},

	get isSmtp(): boolean {
		let methodTransporter = process.env.MAIL_METHOD_TRANSPORTER as string
		let isSmtp = methodTransporter == "smtp"
		return BaseConfig.logAndReturn(isSmtp)
	}
}

export default EmailConfig
