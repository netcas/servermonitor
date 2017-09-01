const fs = require('fs');
const os = require('os');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/usage/current', (req, res) => {
  const logFile = './data' + path.sep + new Date().toISOString().replace(/T.+/, '') + '.log';
  const lines = fs.readFileSync(logFile).toString().split('\n').slice(-20);

  let usages = [];
  for (let i in lines) {
    let line = lines[i];
    let fileds = line.split(':');
    
    if (fileds.length >= 3) {
      usages.push({
        time: parseInt(fileds[0]),
        cpu: parseFloat(fileds[1]),
        mem: parseFloat(fileds[2])
      })
    }
  }

  res.json(usages);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
