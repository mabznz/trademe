
/* Trade me details */
/* https://developer.trademe.co.nz/api-overview/ */

/* Consumer key: 9EAA7C41CD3AC1E0F583DCA2DA2E68E8
Consumer secret: BC471D463FB792B2DA671DD782A0F84C

OAuth Token:
32A0824401FC29F2AE91473C0C021FEF
OAuth Token Secret:
829EEA43BFAD0FB8871D848404DD9F66 */

/* Example test from module
describe('OAuth1.0',function(){
  var OAuth = require('oauth');

  it('tests trends Twitter API v1.1',function(done){
    var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'your application consumer key',
      'your application secret',
      '1.0A',
      null,
      'HMAC-SHA1'
    );
    oauth.get(
      'https://api.twitter.com/1.1/trends/place.json?id=23424977',
      'your user token for this app', //test user token
      'your user secret for this app', //test user secret
      function (e, data, res){
        if (e) console.error(e);
        console.log(require('util').inspect(data));
        done();
      });
  });
});
*/

/* byron@shields:/usr/bin$ sudo ln -s /usr/bin/node nodejs */
console.log('Starting Trade me app');

var OAuth = require('oauth');
var util = require('util');
var url = require('url');
var https = require("https");

var consumer_key = '9EAA7C41CD3AC1E0F583DCA2DA2E68E8';
var consumer_secret = 'BC471D463FB792B2DA671DD782A0F84C';
var request_token = '32A0824401FC29F2AE91473C0C021FEF';
var access_token = '829EEA43BFAD0FB8871D848404DD9F66';
var signature1 = new Buffer("BC471D463FB792B2DA671DD782A0F84C&").toString('utf8').toString('base64');
var oauth = new OAuth.OAuth(
    request_token, // request token?
    access_token, // access token
    consumer_key, //consumer key
    consumer_secret,  //consumer secret
    '1.0',
    signature1,
    'HMAC-SHA1'
);

    //console.log('Oauth object' + util.inspect(oauth));
var token_secret;

oauth.get(
    'https://secure.tmsandbox.co.nz/Oauth/RequestToken?scope=MyTradeMeRead,MyTradeMeWrite',
    null,
    null,
    function(error, data, responce){
        if (error) console.error(error);
        //console.log('no error' + util.inspect(responce));
        console.log(util.inspect(data));




        // extract oauth_token_secret and oauth_token from data, avoid boomerant effect later
        data = '?' + data; //data returned has no query start parameter
        token_secret = url.parse(data,true).query;

        https.get('https://secure.tmsandbox.co.nz/Oauth/Authorize?oauth_token=' + token_secret.oauth_token, function (res) {
            console.log('status Code' + res.statusCode);
            // Detect a redirect
            if (res.statusCode > 300) {
            // The location for some (most) redirects will only contain the path,  not the hostname;
            console.log('status Code' + res.statusCode);
        // detect this and add the host to the path.
        if (url.parse(res.headers.location).hostname) {
              // Hostname included; make request to res.headers.location

        } else {
              // Hostname not included; get host from requested URL (url.parse()) and prepend to location.
              var data = '';

              res.on('data', function (chunk) {
                  data += chunk;
              }).on('end', function () {
                  // Do something with 'data'
                  console.log(data);
              });
        }

    // Otherwise no redirect; capture the response as normal
    } else {
        var data = '';

        res.on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            // Do something with 'data'
            console.log(data);
        });
    }
});

        /*oauth.get(
            'https://secure.tmsandbox.co.nz/Oauth/Authorize?oauth_token=' + token_secret.oauth_token,
            null,
            null,
            function(error, data, responce){
                if (error) console.error(error);
                console.log('no error' + util.inspect(responce));
                console.log(util.inspect('API Call ' + data));
                //console.log(token_secret);
        });*/
        /*request({
            url: 'https://secure.tmsandbox.co.nz/Oauth/Authorize?oauth_token=' + token_secret.oauth_token,
            method: "GET",
            followRedirect: true,
            removeRefererHeader: true,
            followOriginalHttpMethod: true,
            headers: {

                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36',
            }
        }, function(error, response, body) {
            //console.log(response);
            console.log(body);
        });*/

        //access_token = token_secret.oauth_token;
        /* var signature = new Buffer(consumer_secret + "&" + token_secret.oauth_token_secret).toString('utf8').toString('base64');
        oauth = new OAuth.OAuth(
            //null,
            //null,
            //null,
            //null,
            request_token, // request token?
            access_token, // access token
            consumer_key, //consumer key
            consumer_secret,  //consumer secret
            '1.0',
            signature,
            'HMAC-SHA1'
        );

        oauth.get(
            'https://secure.tmsandbox.co.nz/Oauth/Authorize?oauth_token=' + token_secret.oauth_token,
            //token_secret.oauth_token,
            //token_secret.oauth_token_secret,
            null,
            null,
            function(error, data, responce){
                if (error) console.error(error);
                console.log('no error' + util.inspect(responce));
                console.log(util.inspect('API Call ' + data));
                console.log(token_secret);
        });
        token_secret*/
});
console.log('Ending Trade me app');
