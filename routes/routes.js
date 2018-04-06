// Call libraries
const express = require('express');
const router = express.Router();
// const app = express();
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
router.get('/', function(req, res) {
  req.res.send('postal-code-api');
});
// Find a single place via postal code
router.get('/postcodes/:code', function(req, res, next) {
  // Request data
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
router.get('/states/:statecode', function(req, res, next) {
  // Set default page
  let page = parseInt(req.query.page, 10);
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  // Set default limit
  let limit = parseInt(req.query.limit, 10);
  // If parameter does not specify, give 20 records
  if (isNaN(limit)) {
    limit = 20;
  } else if (limit > 50) {
    limit = 50;
  } else if (limit < 1) {
    limit = 1;
  }
  let offset = (page - 1) * limit;
  // Request data with offset and limit
  db.any("SELECT * FROM postal_codes WHERE state_code='" + req.params.statecode + "' OFFSET " + offset + " LIMIT " + limit)
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
// Export routes
module.exports = router;
