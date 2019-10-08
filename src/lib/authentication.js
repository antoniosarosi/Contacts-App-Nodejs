module.exports = {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            return next();
        else 
            return res.redirect('/signin');
    },

    isNotAuthenticated(req, res, next) {
        if (!req.isAuthenticated())
            return next();
        return res.redirect('/profile');
    }
}