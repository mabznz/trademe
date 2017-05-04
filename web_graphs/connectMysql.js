// set up mysql connection
var mysql = require('mysql');

//TODO: move to secret file
var db_pool = mysql.createPool({
  host     : 'localhost',
  user     : 'trademe_app',
  password : 'password',
  database : 'trademe'
});

module.exports = db_pool;
