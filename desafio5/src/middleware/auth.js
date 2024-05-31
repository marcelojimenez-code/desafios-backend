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

export const verificarAdmin = (req, res, next) => {
      // Suponiendo que el rol del usuario está almacenado en req.session.usuario.rol
      if (req.session && req.session.usuario && req.session.usuario.rol === 'admin') {
        // Si el usuario es administrador, redirigir al listado de usuarios
        return res.redirect('/listado');
      } else {
        // Si el usuario no es administrador, redirigir a la página de productos
        return res.redirect('/profile');
      }
    
};
