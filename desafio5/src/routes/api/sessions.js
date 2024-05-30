import { Router } from 'express';
import userModel from '../../models/user.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { name, lastname, email, password, age } = req.body;
    try {
        const newUser = new userModel({ name, lastname, email, password, age });
        await newUser.save();
        console.log("usuario registrado")
        res.redirect('/users/login');
    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const login = req.body;
    console.log(login.email, login.password)
    try {
        const user = await userModel.findOne({ email: login.email , password: login.password });
        console.log(user)

        if (!user){
            //res.redirect('/users/login',{message:"Error al intentar iniciar sesión"} );
            //return res.status(200).send('Usuario no encontrado');
            return res.render('users/login',{message:"Credenciales inválidas"})
        } 
        
        req.session.user = {
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            age: user.age,
            role: user.role,
        };
        console.log(req.session.user)

        if( user.role === 'admin' ){
            return res.render('users/listado',{message:"Perfil Administrador"})
        }
        else{
            return res.render('users/profile',{message:"Bienvenido "})
        }

    } catch (err) {
        //res.status(500).send('Error al iniciar sesión');
        res.redirect('/users/login');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/users/login');
    });
});

export default router;