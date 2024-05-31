export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};

export const isNotAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        //pero aqui esta redireccionando, necesito buscar donde esta el router.get res.render
        res.redirect('/profile');
    }
};