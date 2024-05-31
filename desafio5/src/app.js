import express from 'express'

import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'

import userRouter from './routes/users.router.js'
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messageRouter from './routes/message.router.js'

import { Server } from 'socket.io'
import dotenv from 'dotenv'

import cookieParser from 'cookie-parser'
import FileStore from 'session-file-store'

import session from 'express-session';
import bodyParser from 'body-parser';

import mongoose from 'mongoose'
//import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/api/sessions.js';
import viewsRouter from './routes/views.js';
// import viewsRouter from './routes/views.router.js'

dotenv.config()

/**
 * 
 */

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Conectado a la base de datos") })
    .catch(error => console.error("Error en la conexion", error))

const FileStoreInstance = FileStore(session)

/* Nombramos la variable app con la función de express */
const app = express();

/* Definimos los middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * CODIGO COOKIES Y CREA SESIONES
 */
    app.use(cookieParser())
    app.use(session({
        // store: new FileStoreInstance({ path: './sessions', ttl: 100, retries: 0 }),
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://marcelo:marcelo123456@cluster0.rx8t5f1.mongodb.net/ecommerce',
            ttl: 100,
        }),
        secret: 'keyboard',
        resave: false,
        saveUninitialized: false,
    }))

    app.get('/', (req, res) => {
        if (req.session.views) {
            req.session.views++;
            res.send(`<p>Visitas: ${req.session.views}</p>`);
        } else {
            req.session.views = 1;
            res.send('Bienvenido a la página por primera vez! Actualiza para contar las visitas.');
        }
        console.log('Sesión:', req.session);
    });



/**
 * Definimos el puerto 
 */
const PORT = 8080 || 3000;
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))


/*inicializamos el motor indicando con app engine */
/**
 * HANDLEBARS
 */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))

/**
 * RUTAS DEL SISTEMA
 */
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter)
/*
app.use('/users', userRouter)
app.use('/chat', messageRouter)
app.use('/products', productRouter)
*/
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messageRouter)


/**
 * CONEXION DE SOCKETS
 */
const socketServer = new Server(httpServer)
    
socketServer.on('connection', socket => {
    socket.on('message', async data => {
        await messagesModel.create(data)
        let messages = await messagesModel.find().lean().exec()
        console.log(`mensaje recibido ${data}`)
        socketServer.emit('logs', messages)
    })
})
