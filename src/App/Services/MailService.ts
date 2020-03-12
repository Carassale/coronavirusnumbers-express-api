import EmailConfig from "../../config/EmailConfig"
import {logger} from "../../utils/logger"

const path = require("path")
const EmailTemplate = require("email-templates")

let _send = async (email: string, subject: string, template: string, meta: object): Promise<void> => {
	logger.info("Sending email", {email: email, subject: subject, template: template, meta})

	let emailTemplate = new EmailTemplate({
		message: {from: EmailConfig.fromEmail},
		views: {
			options: {extension: 'ejs'},
			root: path.join(__dirname, '..', '..', 'resources', 'views', 'emails')
		}
	})

	emailTemplate.render(template, meta).then(async (dataHtml: any) => {
		let transporter = EmailConfig.makeTransporter

		if (EmailConfig.isSmtp) {
			logger.info("Sending with SMTP")
			await transporter.sendMail({
				from: EmailConfig.fromEmail,
				to: email,
				subject: subject,
				html: dataHtml
			}, (err: any, data: any) => {
				logger.info("Response from SMTP")
				if (err) {
					logger.error(err.stack)
				} else {
					logger.info("Sent", {email: email, subject: subject, data: data})
				}
			})
		} else {
			logger.info("Sending with SES")
			await transporter.sendEmail({
				Destination: {ToAddresses: [email]},
				Source: EmailConfig.fromEmail,
				Message: {
					Body: {Html: {Charset: "UTF-8", Data: dataHtml}},
					Subject: {Charset: 'UTF-8', Data: subject}
				}
			}, (err: any, data: any) => {
				logger.info("Response from SES")
				if (err) {
					logger.error(err.stack)
				} else {
					logger.info("Sent", {email: email, subject: subject, data: data})
				}
			})
		}
	}).catch(logger.error)
}
