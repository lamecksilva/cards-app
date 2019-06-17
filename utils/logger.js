const winston = require('winston');
const fs = require('fs');

const formatTime = require('../utils/format-time');

const { format } = winston;

const logDir = `log/${formatTime(new Date())}`;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    format.simple(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
    }),
    new winston.transports.File({ filename: `${logDir}/combined.log` }),
  ],
});

// logger.error('Error message Here');
// logger.warn('Warning here');
// logger.info('Info of the server Here');
// logger.verbose('Verbose here');
// logger.debug('Debugging the server');
// logger.silly('Silly Here');

module.exports = logger;
