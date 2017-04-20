var fs = require('fs');

// This expects a json file to be parsed in and returns it as a json object
module.exports = function(file, callback) {
    var secrets = fs.readFileSync(file, 'utf8');
    secrets = JSON.parse(secrets);
    return callback(null, secrets);
};
