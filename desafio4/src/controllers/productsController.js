import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';

const productsFilePath = path.join(__dirname, 'data', 'productos.json')

export async function readProductsFromFile() {
    try {
        const data = await fs.promises.readFile(productsFilePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error al intentar leer los productos:', error)
        throw error
    }
}

export async function home(req, res) {
    try {
        const products = await readProductsFromFile()
        res.render('home', { products })
    } catch (error) {
        console.error('Error al cargar la página de inicio:', error)
        res.status(500).render('error', { message: 'Error al cargar la página de inicio.' })
    }
}

export async function getProductById(req, res) {
    const productId = (req.params.pid)

    try {
        const products = await readProductsFromFile()
        const product = products.find(p => p.id === productId)
        if (!product) {
            const productList = products.map(({ id, title }) => ({ id, title }))
            return res.status(404).render('error', {
                message: 'Producto no encontrado. Aquí está una lista de productos disponibles:',
                products: productList
            })
        } else {
            res.render('productDetail', { product })
        }
    } catch (error) {
        console.error('Error al buscar el producto especificado:', error)
        res.status(500).render('error', { message: 'Error al buscar el producto especificado.' })
    }
}