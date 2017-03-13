var express  = require("express"),
    app      = express(),
    bodyParser  = require("body-parser"),
    http     = require("http"),
    server   = http.createServer(app),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

// AZURE CONNECTION
mongoose.connect('mongodb://rtdmongo:PwrUxQR1EKZzNZRogbhBPFrQODCyv2pqBWqLds6ErtgfyOR3LkqW2NrrDPpbM2nSJ6iNnwGj4FCrM24ZLowQ2A==@rtdmongo.documents.azure.com:10250/users?ssl=true', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    else
    {
        console.log('Connected to database');
    }
});

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// REQUIRES
var models    = require('./models/users')(app, mongoose);
var UsersCtrl = require('./controllers/users');


// API routes
var usersRoute = express.Router();
usersRoute.route('/users')
    .post(UsersCtrl.addUser);


app.use('/api', usersRoute);

app.use(function (req, res, next) {
        var hostname = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host;
        res.setHeader('Access-Control-Allow-Origin', "http://"+hostname+":3000");
        res.header('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);

app.listen(3030, function() {
    console.log("Node server running on http://localhost:3030");
});

