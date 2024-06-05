import { Router } from 'express';
import { isAdmin, isAuthenticated  } from '../middleware/auth.js';
import userModel from '../models/user.model.js';

const router = Router();

router.get('/',  (req, res) => {
    res.render('users/login',{title: 'Ecommerce'});
});

router.get('/login',  (req, res) => {
    const usuarioSesion = req.session.user
    console.log(usuarioSesion)
   // res.render('users/login',{title: 'Ecommerce', layout: false, usuarioSesion});
   res.render('users/login',{title: 'Ecommerce'});
});

router.get('/register',  (req, res) => {
    res.render('users/register',{title: 'Ecommerce'});
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('users/profile', { user: req.session.user});
});

router.get('/listado', isAuthenticated, isAdmin, async (req, res) => {
    const usuarioSesion = req.session.user
    console.log(usuarioSesion)
    const user = await userModel.find().lean().exec()
    res.render('users/listado', {users: user, usuarioSesion});
});

router.get('/editar/:id', isAuthenticated, isAdmin, async (req, res) => {
    
    const user = await userModel.findOne({ _id: req.params.id }).lean().exec()
    console.log(user)
    res.render('users/editar', {user: user});
    
});

router.get('/error', (req, res) => {
    res.render('error');
});

router.get('/logout',  (req, res) => {
    res.render('users/login',{title: 'Ecommerce'});
});

export default router;