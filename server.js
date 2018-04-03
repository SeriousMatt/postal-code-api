//Call libraries
var express    = require('express');      
var app        = express();                
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Set port
var port = process.env.PORT || 8080;       
var router = express.Router();              
//Add route
router.get('/', function(req, res) {
    res.json({ message: 'postal-code-api' });   
});

app.use('/api', router);
//Output
app.listen(port);
console.log('Running on port: ' + port);