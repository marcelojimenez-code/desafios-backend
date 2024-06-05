import { Router } from 'express';
import userModel from '../../models/user.model.js';
import { isLoggedIn } from '../../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
    res.redirect('/login');
});

router.post('/register', async (req, res) => {
    const { name, lastname, email, password, age } = req.body;
    try {
        const newUser = new userModel({ name, lastname, email, password, age });
        await newUser.save();
        console.log("usuario registrado")
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const login = req.body;
    console.log(login.email, login.password)
    try {
        const user = await userModel.findOne({ email: login.email , password: login.password }).exec();
        console.log(user)

        if (!user) return res.status(404).send('Usuario no encontrado');
            req.session.user = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
            };
            res.cookie('userData', { username: user.username, role: user.role }, { maxAge: 3600000 }); 
            console.log(req.session.user)

            res.redirect('/');

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

export default router;