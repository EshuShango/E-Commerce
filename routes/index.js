const router = require('express').Router();
const apiR = require('./api/index.js');

const apiApp = router;

apiApp.use('/api', apiR);

apiApp.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = apiApp;
