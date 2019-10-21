const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const session = require('express-session');
const mysqlSession = require('express-mysql-session');
const passport = require('passport');
const flash = require('connect-flash');

const { database } = require('./keys');
require('./lib/passport');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'contactsapp',
    resave: false,
    saveUninitialized: false,
    store: mysqlSession(database)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes/'));
app.use(require('./routes/contacts'));
app.use(require('./routes/authentication'));
app.use(require('./routes/api'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});