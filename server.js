// Call libraries
const express = require('express');
const app = express();
const routes = require('./routes/routes');
app.use('/', routes);
// Error handling
app.use( function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// Display error
app.use( function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
        status: 'error',
        message: err,
    });
});
// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Running on port 3000');
});
