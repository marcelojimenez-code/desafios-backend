const socket = io()

socket.on('updateProducts', function (products) {
    const productList = document.getElementById('productList')
    productList.innerHTML = ''
    products.forEach(product => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>$${product.price}</td>
        <td><button class="btn btn-danger" onclick="confirmDelete('${product.id}')">Eliminar</button></td>`
        productList.appendChild(row)
    })
})

document.getElementById('addProductForm').addEventListener('submit', function (e) {
    e.preventDefault()
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    const productId = generateUniqueId()
    socket.emit('addProduct', {
        id: productId,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail
    })
    document.getElementById('title').value = ''
    document.getElementById('description').value = ''
    document.getElementById('price').value = ''
    document.getElementById('thumbnail').value = ''
})

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9)
}

function confirmDelete(id) {
    Swal.fire({
        title: 'Eliminar producto',
        text: 'Esta acción eliminará el producto de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id)
        }
    })
}

function deleteProduct(id) {
    socket.emit('deleteProduct', id)
}

socket.on('productDeleted', function (productId) {
    socket.emit('getProducts')
})