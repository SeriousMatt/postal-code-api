// Call libraries
const express = require('express');
const router = express.Router();
const queries = require('../api/queries');
// Add routes
router.get('/', function(req, res) {
  req.res.send('postal-code-api');
});
// Find a single place via postal code
router.get('/postcodes/:code', queries.getPostalCode);
// Find all of the postal codes in a state
router.get('/states/:statecode', queries.getStateCodes);
// Export routes
module.exports = router;
