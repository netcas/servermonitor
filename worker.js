const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');

const sleep = require('system-sleep');
const cpu = require('./cpu');

if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

const logFile = './data' + path.sep + new Date().toISOString().replace(/T.+/, '') + '.log';

while (true) {
  let cpuUsage = cpu.cpuUsage().toFixed(2);
  let memUsage = (100 - 100 * os.freemem() / os.totalmem()).toFixed(2);
  let time = Math.round(Date.now() / 1000);

  let record = util.format('%s:%s:%s\n', time, cpuUsage, memUsage);
  console.log(record);
  fs.appendFileSync(logFile, record);

  sleep(3000);
}
