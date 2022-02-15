const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const path = require('path');
const { redirect } = require('express/lib/response');

// sets the port number depending if we are in production or development
const port = process.env.PORT || 5000

// imports routers
const apiRouter = require('./routes/api.js');
//const sessionRouter = require('./routes/session.js');

// initializes the express application
const app = express()

// sets up CORS for Cross-Origin-Resource-Sharing
app.use(cors())
// converts API responses to JSON for easy use
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// imports our database credentials (stored separately for security)
const db = require('./config/keys').mongoURI

// initializes our database using the credentials
mongoose
  .connect(db, () => {}, {useNewUrlParser: true})
  .then(() => console.log('Mongo Database connected'))
  .catch(err => console.log(err))

// creates a route where we can interact with our API
app.use('/api', apiRouter);
//app.use('/api/session/', sessionRouter);

// where static files can be found
app.use(express.static('client'))

// route to respond with main app
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/index.html'), (err, data) => {
    if (err) next(err);
  });
});



// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));


// configire express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// intializes the server and logs a message
app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app;