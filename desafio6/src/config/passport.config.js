import passport from 'passport';
import local from 'passport-local';
import userService from '../models/user.model';
import { createHash, isValidPassword } from '../utils';

const LocalStrategy = local.Strategy;
const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req. username, password, done) => {

            const {name, lastname, email, age} = req.body;

            try {
                    let user = await userService.findOne({email: username});
                    if(user){
                        console.log("Usuario registrado");
                        return done(null,false)
                    }
                    const newUser = {
                        name,
                        lastname,
                        email,
                        password: createHash(password),
                        age
                    }
                    let result = await userService.create(newUser);
                    return done(null, result);
                    
            } catch (error) {
                return done("Error al obtener Usuario : "+ error)
            }
        
    }))
}

export default initializePassport;