export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect('/profile');
    }
};

export const isNotAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};

export const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).send('Error: Acceso no autorizado');
    }
    else {
        if (req.session.usuario.role === 'admin') {
            // Si el usuario es administrador, redirigir al listado de usuarios
            return res.redirect('/listado');
        } else {
            if(req.session.usuario.role === 'user'){
                // redirigir al profile
                return res.redirect('/profile');
            }
            else{
                //si es vacio se va al login
                return res.redirect('/login');
            }
        }
    }    
};
