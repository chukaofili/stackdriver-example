const enviroment = process.env.NODE_ENV;
const { version, name } = require('./package.json');
require('@google-cloud/debug-agent').start({
  allowExpressions: true,
  serviceContext: {
    service: `${name}-${enviroment}`,
    version: version
  }
});

require('@google-cloud/trace-agent').start({
  enhancedDatabaseReporting: true,
  ignoreMethods: ['options'],
  serviceContext: {
    service: `${name}-${enviroment}`,
    version: version
  }
});

const ErrorReporting = require('@google-cloud/error-reporting').ErrorReporting;
global.GoogleErrors = new ErrorReporting({
  reportMode: 'always',
  serviceContext: {
    service: `${name}-${enviroment}`,
    version: version
  }
});

const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT
const messages = require('./routes/messages')

app.use('/', routes)
app.use(function (err, req, res, next) {
  console.error(err.stack)
  GoogleErrors.report(err)
  res.status(500).send(err.message)
})

// Application will fail if environment variables are not set
if (!process.env.PORT) {
  const errMsg = "PORT environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

if (!process.env.GUESTBOOK_DB_ADDR) {
  const errMsg = "GUESTBOOK_DB_ADDR environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

// Connect to MongoDB, will retry only once
messages.connectToMongoDB()

// Starts an http server on the $PORT environment variable
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app