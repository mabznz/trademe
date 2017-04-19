
/* Trade me details */
/* https://developer.trademe.co.nz/api-overview/ */

/* will insert data into database from tradame api's */

console.log('Starting Insert Periodically');


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

// Get a list of districts from database

//replace any “trademe.co.nz” URL with “tmsandbox.co.nz
oauth.get(
    //https://api.tmsandbox.co.nz/v1/Search/Property/Residential.json?adjacent_suburbs=false&district=81
    'https://api.tmsandbox.co.nz/v1/Search/Property/Residential.json?district=81',
    '32A0824401FC29F2AE91473C0C021FEF',
    '829EEA43BFAD0FB8871D848404DD9F66',
    function(error, data, responce){
        if (error) console.error(error);

        var output = JSON.parse(data);
        //console.log(output);
        output.List.forEach( function (listing)
        {
            //INSERT INTO table (a,b,c) VALUES (1,2,3)
            //ON DUPLICATE KEY UPDATE c=c+1;
            console.log(listing.ListingId + listing.Title + listing.StartDate);
            //Need to convert date
            var upsert =
                'INSERT INTO residential \
                ( \
                    listing_id, \
                    district_id, \
                    price, \
                    bedrooms, \
                    type, \
                    description \
                ) \
                VALUES \
                ( ?, ?, ?, ?, ?, ? ) \
                ON DUPLICATE KEY UPDATE \
                district_id = ?, \
                price = ?, \
                bedrooms = ?, \
                type = ?, \
                description = ?;';
            connection.query(upsert,
                [
                    listing.ListingId,
                    listing.DistrictId,
                    listing.PriceDisplay,
                    listing.Bedrooms,
                    listing.PropertyType,
                    listing.Title,
                    listing.DistrictId,
                    listing.PriceDisplay,
                    listing.Bedrooms,
                    listing.PropertyType,
                    listing.Title
                ], function(error, results, fields) {
                if (error) console.error(error);
                console.log('inserted residential ' + results.affectedRows + ' rows');
            });
        });
        connection.end();
});
