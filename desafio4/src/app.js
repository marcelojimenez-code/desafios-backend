import express from 'express'

import __dirname from './utils.js';
import { Server } from 'socket.io'

import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'

import { handleSocketConnection } from './controllers/socketController.js';


/* Nombramos la variable app con la función de express */
const app = express();

/* Definimos el puerto */
const PORT = 8080 || 3000;
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)

/* Definimos los middlewares */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*inicializamos el motor indicando con app engine */
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')
/* definimos el archivo estatico */
app.use(express.static(__dirname + '/public'))

//app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)

handleSocketConnection(socketServer)



/* Escuchar los cambios del servidor */
/*
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
*/