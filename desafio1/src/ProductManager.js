class ProductManager{
    constructor(){
        this.products = []
        this.nextId = 1
    }

    addProduct(product){        
        if (!this.isProductValid(product)){
            console.log("Error : Producto invalido")
            return
        }

        if(this.isCodeDuplicate(product.code)){
            console.log("Error : El codigo del Producto ya esta en uso")
            return
        }

        product.id = this.nextId++
        this.products.push(product)        
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find( (p)=>p.id === id )
        if(product){
            return product
        }
        else{
            console.log("Error : producto no encontrado")
        }
    }

    isProductValid(product){
        return(
            product.title && 
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code){
        return this.products.some((p)=>p.code === code)
    }

}

const productManager = new ProductManager();

productManager.addProduct({
    title: "Producto A",
    description : "descripcion producto A",
    price: 10.99,
    thumbnail : 'ruta/imagenA.jpg',
    code: 'P001',
    stock:5
})

productManager.addProduct({
    title: "Producto B",
    description : "descripcion producto B",
    price: 20.99,
    thumbnail : 'ruta/imagenB.jpg',
    code: 'P002',
    stock:10
})

productManager.addProduct({
    title: "Producto C",
    description : "descripcion producto C",
    price: 25,
    thumbnail : 'ruta/imagenC.jpg',
    code: 'P004',
    stock:10
})

const productos = productManager.getProducts()
const producto = productManager.getProductById(2)
console.log(producto)