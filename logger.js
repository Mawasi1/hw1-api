const fs = require('fs');
const pino = require('pino');

const logStream = fs.createWriteStream('./logs.txt', { flags: 'a' });

const logger = pino({
    level: 'info',
    timestamp: () => `,"time":"${new Date().toISOString()}"`
}, logStream);

module.exports = { logger };