const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isAuthenticated, isNotAuthenticated } = require('../lib/authentication');

// Sign Up
router.get('/signup', isNotAuthenticated, (req, res) => {
    res.render('authentication/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// Sign In
router.get('/signin', (req, res) => {
    res.render('authentication/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

// Profile
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile');
});

// Log Out
router.get('/logout', isAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('signin');
})

module.exports = router;
    
