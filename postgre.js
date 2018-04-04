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
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  let data = '';
  for (let row of res.rows) {
  	data = data + JSON.stringify(row)
    console.log(JSON.stringify(row));
  }
  module.exports = data;
  client.end();
});
