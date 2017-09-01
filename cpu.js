const os = require('os');
const sleep = require('system-sleep');

const cpuTotal = () => {
  let totalIdle = 0, totalTick = 0;
  let cpus = os.cpus();

  for (let i = 0; i < cpus.length; i++) {
    let cpu = cpus[i];

    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }

    totalIdle += cpu.times.idle;
  }

  return { idle: totalIdle, total: totalTick };
}

const cpuUsage = () => {
  let percentageCPU = 0;

  let pervTotal = cpuTotal();
  sleep(200);
  let currTotal = cpuTotal();

  let idleDiff = currTotal.idle - pervTotal.idle;
  let totalDiff = currTotal.total - pervTotal.total;

  if (totalDiff > 0 && idleDiff > 0) {
    return 100 - 100 * idleDiff / totalDiff;
  } else {
    return 0;
  }
}

module.exports = {
  cpuUsage
}
