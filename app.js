var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' });

var app = express();


var routePayment = require('./routes/routePayment');

//connect to mongo
//---------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/payment', routePayment);

module.exports = app;
