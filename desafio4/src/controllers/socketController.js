import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';

const productsFilePath = path.join(__dirname, 'data', 'productos.json')

export function handleSocketConnection(socketServer) {
    socketServer.on('connection', socket => {
        console.log("Nuevo cliente conectado")

        fs.readFile(productsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading products file:', err)
                return
            }
            const products = JSON.parse(data)
            socket.emit('currentProducts', products)
        })

        socket.on('addProduct', async product => {
            const products = await readProductsFromFile()
            products.push(product)
            await writeProductsToFile(products)
            socketServer.emit('updateProducts', products)
        })

        socket.on('deleteProduct', async productId => {
            const products = await readProductsFromFile()
            const filteredProducts = products.filter(p => p.id !== productId)
            await writeProductsToFile(filteredProducts)
            socketServer.emit('updateProducts', filteredProducts)
            socket.emit('productDeleted', productId)
        })
        readProductsFromFile().then(products => {
            socket.emit('updateProducts', products)
        })

        socket.on('disconnect', socket => {
            console.log("Cliente desconectado")
        })
    })
}

async function readProductsFromFile() {
    const data = await fs.promises.readFile(productsFilePath, 'utf8')
    return JSON.parse(data)
}

async function writeProductsToFile(products) {
    await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8')
}