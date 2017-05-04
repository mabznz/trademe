
/* Trade me details */
/* https://developer.trademe.co.nz/api-overview/ */

/* will insert data into database from tradame api's */

console.log('Starting Insert Periodically');

//describe('OAuth1.0',function(){
var OAuth = require('oauth');
var util = require('util');
var mysql = require('mysql');
var login = require('./login.js');

var secrets = '';

// Don't check in your secrets file
login('./secrets/secrets.json', function(error, data) {
    if (error) { console.error(error); }
    secrets = data;
});

var signature = new Buffer(secrets.consumer_secret + "&").toString('utf8').toString('base64');

var oauth = new OAuth.OAuth(
    secrets.request_token,
    secrets.access_token,
    secrets.consumer_key,
    secrets.consumer_secret,
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

/*
    Fetch all districts
*/

var select =
'SELECT  \
    id, \
    description \
FROM \
    districts';

connection.query(select, function(error, rows, fields) {
    if (error) console.error(error);
    rows.forEach( function(row)
    {
        console.log('Fetching ' + row.description);

//replace any “trademe.co.nz” URL with “tmsandbox.co.nz
oauth.get(

    'https://api.tmsandbox.co.nz/v1/Search/Property/Residential.json?district=' + row.id,
    null,
    null,
    function(error, data, responce){
        if (error) console.error(error);

        var output = JSON.parse(data);
        //console.log(output);
        output.List.forEach( function (listing)
        {
            // Convert Trademe date of '/Date(epoch)/' to timestamp for db
            var e = "new " + listing.StartDate.split('/')[1];
            var listingDate = eval(e);

            // Convert PriceDisplay to a number if possible and store in seperate column
            var price = listing.PriceDisplay.split('$')[1];
            if (price != undefined) {
              price = parseInt(price.replace(',', ''));
            }

            var upsert =
                'INSERT INTO residential \
                ( \
                    listing_id, \
                    district_id, \
                    listing_date, \
                    price, \
                    price_display, \
                    bedrooms, \
                    type, \
                    description \
                ) \
                VALUES \
                ( ?, ?, ?, ?, ?, ?, ?, ? ) \
                ON DUPLICATE KEY UPDATE \
                district_id = ?, \
                listing_date = ?, \
                price = ?, \
                price_display = ?, \
                bedrooms = ?, \
                type = ?, \
                description = ?;';
            connection.query(upsert,
                [
                    listing.ListingId,
                    listing.DistrictId,
                    listingDate,
                    price,
                    listing.PriceDisplay,
                    listing.Bedrooms,
                    listing.PropertyType,
                    listing.Title,
                    listing.DistrictId,
                    listingDate,
                    price,
                    listing.PriceDisplay,
                    listing.Bedrooms,
                    listing.PropertyType,
                    listing.Title
                ], function(error, results, fields) {
                if (error) console.error(error);
                console.log('changed residential ' + results.affectedRows + ' rows');
            });

        });

});
//connection.end(); /* Need to explore queries and callbacks
});

});
