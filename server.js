//Call libraries
var express        = require('express');      
var app            = express();                
var bodyParser     = require('body-parser');
var postgreData    = require('./postgre.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Set port
var port = process.env.PORT || 8080;       
var router = express.Router();              
//Add route
router.get('/', function(req, res) {
    res.json({ postgreData });   
});

app.use('/api', router);
//Output
app.listen(port);
console.log('Running on port: ' + port);