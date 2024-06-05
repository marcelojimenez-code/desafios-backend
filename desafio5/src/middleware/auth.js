export const isAdmin = (req,res,next) => {
    if (req.session.user.role === 'admin'){
        return next()
    }
};

export const isAuthenticated = (req, res, next) => {
    console.log(req.session.user)
    if (!req.session.user) {
        return res.redirect('/login');

    } 
    next()
};

export const isNotAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } 
};

