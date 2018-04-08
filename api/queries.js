// Set connection
const db = require('../data/connection');
// Request data by postal code
let getPostalCode = (req, res, next) => {
  db.any('SELECT * FROM postal_codes WHERE postal_code=' + req.params.code)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Pulling place by postal code',
        });
    })
    // Catch query errors
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'error',
          message: 'bad query',
        });
    });
}
// Request data by state
let getStateCodes = (req, res, next) => {
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
          status: '200',
          data: data,
          message: 'Pulling data by state',
        });
    })
    // Catch query errors
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'error',
          message: 'bad query',
        });
	});
}

// Export query functions to routes
module.exports = {
    getPostalCode: getPostalCode,
    getStateCodes: getStateCodes,
};