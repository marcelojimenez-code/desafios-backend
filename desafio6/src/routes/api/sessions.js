import { Router } from 'express';
import userModel from '../../models/user.model.js';

const router = Router();

router.get('/', async (req, res) => {
    res.redirect('/login');
});

router.post('/register', async (req, res) => {
    const { name, lastname, email, password, age } = req.body;
    try {
        const newUser = await userModel.create({ name, lastname, email, password, age });
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/edit/:id', async (req, res) => {
    
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const newUser = await userModel.findByIdAndUpdate(userId, updatedUserData);
        res.redirect('/listado');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.get('/eliminar/:id', async (req, res) => {

    try {
        const userId = req.params.id;
        console.log(userId)
        const newUser = await userModel.findByIdAndDelete(userId);
        console.log(newUser)
        res.redirect('/listado');
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
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                age: user.age,
                role: user.role
            };
            
            res.cookie('userData', { username: user.name, role: user.role, id: user._id }, { maxAge: 3600000 }); 
            console.log(req.session.user)

            if (req.session.user.role === 'admin'){
                return res.redirect('/listado');
            }else {
                // redirigir al profile
                return res.redirect('/profile');
            }

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.get('/logout', (req, res) => {
    return res.clearCookie('userData').redirect('/login')
});

export default router;