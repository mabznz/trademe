// gets new request token although don't need to

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


//describe('OAuth1.0',function(){
var OAuth = require('oauth');
var util = require('util');
var signature = new Buffer("BC471D463FB792B2DA671DD782A0F84C&").toString('utf8').toString('base64');
//if('tests trends Trademe API', function(done){
    var oauth = new OAuth.OAuth(
        '32A0824401FC29F2AE91473C0C021FEF', // request token?
        '829EEA43BFAD0FB8871D848404DD9F66', // access token
        '9EAA7C41CD3AC1E0F583DCA2DA2E68E8', //consumer key
        'BC471D463FB792B2DA671DD782A0F84C',  //consumer secret
        '1.0',
        signature,
        'HMAC-SHA1'
    );
    //console.log('Oauth object' + util.inspect(oauth));
//POST&https%3A%2F%2Fsecure.trademe.co.nz%2FOauth%2FRequestToken
    oauth.get(
        'https://secure.tmsandbox.co.nz/Oauth/RequestToken?scope=MyTradeMeRead,MyTradeMeWrite',
        null,
        null,
        function(error, data, responce){
            if (error) console.error(error);
            console.log('no error' + util.inspect(responce));
            console.log(util.inspect(data));
            //done();
        });
//    });
//});

//replace any “trademe.co.nz” URL with “tmsandbox.co.nz
//get https://secure.trademe.co.nz/Oauth/RequestToken?scope=<scope>
