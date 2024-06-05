import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated, isLoggedIn } from '../middleware/auth.js';

const router = Router();

router.get('/', isNotAuthenticated, (req, res) => {
    res.render('/users/login',{title: 'Ecommerce'});
});

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('/users/login',{title: 'Ecommerce'});
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('/users/register',{title: 'Ecommerce'});
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('/users/profile', { user: req.session.user});
});

router.get('/listado', isAuthenticated, (req, res) => {
    res.render('/users/listado');
});

router.get('/error', (req, res) => {
    res.render('error');
});

export default router;