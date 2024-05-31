import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/', isNotAuthenticated, (req, res) => {
    res.render('login',{title: 'Ecommerce'});
});

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login',{title: 'Ecommerce'});
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register',{title: 'Ecommerce'});
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.session.user});
});

router.get('/admin', isAuthenticated, (req, res) => {
    res.render('admin', { user: req.session.user});
});


export default router;