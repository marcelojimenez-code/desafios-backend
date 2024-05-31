import { Router } from 'express';
import userModel from '../../models/user.model.js';

const router = Router();

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

router.get('/failregister', async (req, res) => {
    console.log("Estrategia fallida")
    res.send({ error: "Falló" })
})

router.post('/login', async (req, res) => {
    const login = req.body;
    console.log(login.email, login.password)
    try {
        const user = await userModel.findOne({ email: login.email , password: login.password });
        console.log(user)

        if (!user) return res.status(404).send('Usuario no encontrado');
            req.session.user = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
            };
            console.log(req.session.user)
            res.redirect('/profile');

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.get('/faillogin', (req, res) => {
    res.send({ error: "Login fallido" })
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

export default router;