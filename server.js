// Call libraries
const express = require('express');
const app = express();
const promise = require('bluebird');
// Use bluebird promises
const options = {
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);
// Set for Heroku
pgp.pg.defaults.ssl = true;
// Abstract later for security
const connectionString = 'postgres://rlujyumwdxsfhb:1b6b8ee88cb54126c5fbbcd6f5dde7d083e9e795448060ee1aed85093934a2d2@ec2-23-21-121-220.compute-1.amazonaws.com:5432/d8m1gq2dnorrtm';
const db = pgp(connectionString);
// Add routes
app.get('/', function(req, res) {
  req.res.send('postal-code-api');
});
// Find a single place via postal code
app.get('/postal/:code', function(req, res) {
  db.any('SELECT * FROM postal_codes WHERE postal_code=' + req.params.code)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Pulling place by postal code',
        });
    })
    .catch(function(err) {
      return next(err);
    });
});
// Find all of the postal codes in a state
app.get('/state/:code/:page', function(req, res) {
  db.any("SELECT * FROM postal_codes WHERE state_code='" + req.params.code + "' LIMIT " + req.params.page)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Pulling postal codes for state',
        });
    })
    .catch(function(err) {
      return next(err);
    });
});
// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Running on port 3000');
});
