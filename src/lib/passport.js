const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const pool = require('../database');

passport.use('local.signin', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];   
        done(null, user);
    }
    else
        done(null, false);
}));

passport.use('local.signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = { username, password, fullname: req.body.fullname };
    await pool.query('INSERT INTO users SET ?', [user]);
    done(null, user);
}));

passport.serializeUser((user, done) => {
    console.log("Serialize: ");
    console.log(user);
    done(null, user.username);
});

passport.deserializeUser(async (id, done) => {
    const user = await pool.query('SELECT * FROM users WHERE username = ?', [id]);
    done(null, user[0]);
});