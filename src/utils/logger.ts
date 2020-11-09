import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import * as Transport from 'winston-transport';

import AppConfig  from '../config/AppConfig';

const expressWinston = require('express-winston');
const winston = require('winston');

const _formatter = winston.format((info: any, _opts: any) => {
  if (info.message instanceof Error) {
    info.message = {
      message: info.message.message,
      stack: info.message.stack,
      ...info.message,
    };
  }

  if (info instanceof Error) {
    return info;
  }

  info.level = info.level.toUpperCase();
  info.environment = process.env.NODE_ENV;

  return info;
});

const _transports = (): Transport[] => {
  return [
    _consoleTransport(),
    _fileTransport()
  ];
};

let _consoleTransport = (): ConsoleTransportInstance => {
  return new winston.transports.Console();
};

let _fileTransport = (): FileTransportInstance => new winston.transports.File({
  dirname: `${__dirname}/../../logs/`,
  filename: 'error.log',
});

const Logger = winston.createLogger({
  level: AppConfig.logLevel,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({stack: true}),
    winston.format.splat(),
    _formatter(),
    winston.format.json(),
  ),
  transports: _transports(),
});

const expressLogger = new expressWinston.logger({
  transports: _transports(),
  format: winston.format.combine(
    _formatter(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  requestWhitelist: ['headers', 'query', 'body'],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});

export default Logger;
export { expressLogger };
