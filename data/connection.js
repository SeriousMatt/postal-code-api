// Use bluebird promises
const promise = require('bluebird');
const options = {
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);
// Set for Heroku
pgp.pg.defaults.ssl = true;
// Abstract later for security
const connectionString = 'postgres://rlujyumwdxsfhb:1b6b8ee88cb54126c5fbbcd6f5dde7d083e9e795448060ee1aed85093934a2d2@ec2-23-21-121-220.compute-1.amazonaws.com:5432/d8m1gq2dnorrtm';
const db = pgp(connectionString);

// Export db
module.exports = db;
