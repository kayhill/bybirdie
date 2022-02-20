require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');
console.log(`NODE_ENV=${process.env.NODE_ENV}`);

// import routers
const apiRouter = require('./routes/api.js');
const sessionRouter = require('./routes/session.js');

// initialize application
const app = express();

// set up CORS for Cross-Origin-Resource-Sharing
app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// converts API responses to JSON
app.use(bodyParser.json());

// import database credentials
const db = process.env.MONGO_URI;

// initialize database
mongoose
  .connect(db, () => {}, { useNewUrlParser: true })
  .then(() => console.log('Mongo Database connected'))
  .catch((err) => console.log(err));

// configure routes
app.use('/api', apiRouter);
app.use('/api/session/', sessionRouter);

// serve static files
app.use(express.static(path.join(__dirname, '../client', 'build')));

// route to respond with main app
app.get('/', (req, res, next) => {
  console.log('trying');
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use('/*', (req, res) => res.sendStatus(404));

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

// intialize the server and logs a message
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

module.exports = app;
