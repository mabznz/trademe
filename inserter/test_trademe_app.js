// gets new request token although don't need to

/* Trade me details */
/* https://developer.trademe.co.nz/api-overview/ */

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

var login = require('./login.js');
var OAuth = require('oauth');
var util = require('util');

var secrets = '';

// Don't check in your secrets file
login('./secrets/secrets.json', function(error, data) {
    if (error) { console.error(error); }
    secrets = data;
});
//console.log('s' + secrets);

var oauth = new OAuth.OAuth(
    secrets.request_token,
    secrets.access_token,
    secrets.consumer_key,
    secrets.consumer_secret,
    '1.0',
    signature,
    'HMAC-SHA1'
);

var signature = new Buffer(secrets.consumer_secret + "&").toString('utf8').toString('base64');

    //console.log('Oauth object' + util.inspect(oauth));
//POST&https%3A%2F%2Fsecure.trademe.co.nz%2FOauth%2FRequestToken
oauth.get(
    'https://secure.tmsandbox.co.nz/Oauth/RequestToken?scope=MyTradeMeRead,MyTradeMeWrite',
    null,
    null,
    function(error, data, responce){
        if (error) console.error(error);
        //console.log('no error' + util.inspect(responce));
        console.log(util.inspect(data));
        //done();
    });
