const env = process.env.NODE_ENV || 'development';

const config = require(`./environment/${env.toLowerCase()}`);

module.exports = config;
