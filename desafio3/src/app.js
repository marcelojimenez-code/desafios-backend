import ProductManager from './ProductManager.js';
import express, { urlencoded } from 'express';
const manager = new ProductManager('./src/productos.json');

const server = express();
const PORT = 8080;
server.use(urlencoded({ extended: true }));

server.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
})

server.get('/products', async(req, res)=>{
    try {
        const productsArray = await manager.readFile();
        let limit = parseInt(req.query.limit)
        if(limit){
            const arraylimit = productsArray.slice(0, limit)
            return res.send(arraylimit)
        }else{
            return res.send(productsArray)
        }
    } catch (error) {
        console.error(error);
        return res.send('No se pudieron obtener los productos')
    }
})

server.get('/products/:pid', async(req, res) =>{
    try {
        let parameterId = parseInt(req.params.pid)
        const sought = await manager.getProductById(parameterId)
        if(parameterId){
            return res.send(sought);
        }else{
            console.log('No se encontro el producto con el id especificado');
        }
    } catch (error) {
        console.error(error)
        return res.send('Error al traer el producto por su id')
    }
})