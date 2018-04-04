//Call libraries
var express        = require('express');      
var app            = express();                
//Add routes
//Set default route
app.get('/', (req) => {
  req
    .res.send('postal-code-api');
});
//Find a single place via postal code
app.get('/postal/:code', function (req, res) {
	var query    = "SELECT * FROM postal_codes WHERE postal_code=" + req.params.code;
	let response = queryPostgre(res, query);
  res.send(response);
});
//Find all of the postal codes in a state
app.get('/state/:code', function (req, res) {
	let query = "SELECT * FROM postal_codes WHERE state_code = '"+ req.params.code +"'";
	let response = queryPostgre(res, query);
  res.send(response);
});
//Listen on port 3000
app.listen(3000, () => {
  console.log('Running on port 3000');
});
//Postgre query
var queryPostgre = function (res, query){ 
	console.log(query);
	//Heroku Cli
	//https://devcenter.heroku.com/articles/heroku-postgresql#using-the-cli
	const { Client } = require('pg');
	//Connection String to Cloud Database
	const client = new Client({
	  connectionString: 'postgres://rlujyumwdxsfhb:1b6b8ee88cb54126c5fbbcd6f5dde7d083e9e795448060ee1aed85093934a2d2@ec2-23-21-121-220.compute-1.amazonaws.com:5432/d8m1gq2dnorrtm',
	  ssl: true,
	});
	//Form Connection
	client.connect();
	//Postgre Query
	client.query(query, (err, res) => {
	  if (err) throw err;
	  let data = '';
	  for (let row of res.rows) {
	  	data = data + JSON.stringify(row)
	  	// return data;
	  	console.log(data);
	  }
	  client.end();
	});
}