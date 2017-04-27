var express = require('express'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var app = express();
// module.exports = express.createServer();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(app.router);
app.use(express.static(__dirname + '/public'));

/*app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});*/

// routes
app.use('/', routes);
//require('./routes/index')(app);
//require('./routes/localities')(app);

app.listen(3000, function() {
    console.log("Server listening port");

});
