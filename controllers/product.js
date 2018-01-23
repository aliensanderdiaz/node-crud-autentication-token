'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) =>{
        if(err) return res.status(500).send({mensaje: 'Error al realizar la petición'})
        if (!product) return res.status(404).send({mensaje: 'El producto no existe'})

        res.status(200).send({ product })
    })
}

function getProducts (req, res) {
    Product.find( (err, products) =>{
        if(err) return res.status(500).send({ mensaje: 'Error al realizar la petición' })
        if (!products) return res.status(404).send({ mensaje: 'No existen productos' })

        res.status(200).send({ products })
    })
}

function saveProduct (req, res) {
    let product = new Product()

    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category =  req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send( {mensaje: `Error al guardar en la base de datos: ${err}`} )

        res.status(200).send({product: productStored})
    })
}

function updateProduct (req, res) {
    let productId = req.params.productId

    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send( {mensaje: `Error al actualizar en la base de datos: ${err}`} )

        res.status(200).send({product: productUpdated})
    })
}

function deleteProduct (req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) =>{
        if(err) return res.status(500).send({mensaje: `Error al borrar el producto ${err}`})
        if (!product) return res.status(404).send({mensaje: 'El producto no existe'})

        product.remove(err => {
            if(err) return res.status(500).send({mensaje: `Error al borrar el producto ${err}`})
            res.status(200).send({ mensaje: 'Producto Eliminado' })
        })

    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}