
/* Trade me details */
/* https://developer.trademe.co.nz/api-overview/ */

/* will insert data into database from tradame api's */

console.log('Starting Trade me app');


//describe('OAuth1.0',function(){
var OAuth = require('oauth');
var util = require('util');
var mysql = require('mysql');

var signature = new Buffer("BC471D463FB792B2DA671DD782A0F84C&").toString('utf8').toString('base64');

// get these keys and passwords from file for prod so they are not checked in
var oauth = new OAuth.OAuth(
    '32A0824401FC29F2AE91473C0C021FEF', // request token?
    '829EEA43BFAD0FB8871D848404DD9F66', // access token
    '9EAA7C41CD3AC1E0F583DCA2DA2E68E8', //consumer key
    'BC471D463FB792B2DA671DD782A0F84C',  //consumer secret
    '1.0',
    signature,
    'HMAC-SHA1'
);


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'trademe_app',
  password : 'password',
  database : 'trademe'
});

connection.connect();

//replace any “trademe.co.nz” URL with “tmsandbox.co.nz
oauth.get(
    'https://api.tmsandbox.co.nz/v1/Localities.json',
    '32A0824401FC29F2AE91473C0C021FEF',
    '829EEA43BFAD0FB8871D848404DD9F66',
    function(error, data, responce){
        if (error) console.error(error);

        var output = JSON.parse(data);

        output.forEach( function (locality)
        {
            var insert =
                'INSERT INTO localities \
                ( \
                    id, \
                    description \
                ) \
                VALUES \
                (' +
                    locality.LocalityId + ',' +
                    '"' + locality.Name + '"' +
                ')';
            console.log(insert);
            connection.query(insert, function (error, results, fields) {
                if (error) throw error;
                console.log('inserted ' + results.affectedRows + ' rows');
            });

        });
        connection.end();
});
