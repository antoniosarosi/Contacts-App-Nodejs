module.exports = {
    checkAuthentication(req, res, next) {
        if (req.isAuthenticated())
            next();
        else 
            res.redirect('/signin');
    }
}