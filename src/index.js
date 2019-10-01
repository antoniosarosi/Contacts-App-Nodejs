const path = require('path');
const express = require('express');
const morgan = require('morgan');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/'));

// Server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});