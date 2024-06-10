import passport from 'passport';
import local from 'passport-local';
import userService from '../models/user.model';
import { createHash, isValidPassword } from '../utils';

const LocalStrategy = local.Strategy;
const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req. username, password, done) => {

            const {name, lastname, email, age} = req.body;

            try {
                let user = await userService.findOne({email: username});
            } catch (error) {
                
            }
        }
    ))

}