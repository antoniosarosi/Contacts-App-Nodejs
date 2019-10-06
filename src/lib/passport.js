const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const pool = require('../database');
const bcrypt = require('../lib/bcrypt') ;

passport.use('local.signin', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];  
        const validPassword = await bcrypt.comparePasswords(password, user.password);
        if (validPassword) 
            done(null, user); 
        else 
            done(null, false, req.flash('message', 'Incorrect Password'));
    }
    else
        done(null, false, req.flash('message', 'Incorrect Username'));
}));

passport.use('local.signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = { username, fullname: req.body.fullname };
    user.password = await bcrypt.encryptPassword(password);
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