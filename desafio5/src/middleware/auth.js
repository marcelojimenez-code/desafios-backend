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

export const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    else {
        if (req.session.usuario.role === 'admin') {
            // Si el usuario es administrador, redirigir al listado de usuarios
            return res.redirect('/listado');
        } else {
            // Si el usuario no es administrador, redirigir al profile
            return res.redirect('/profile');
        }

    }    
        
    
};
