const productService = require('../services/products.service')

module.exports.getAllProducts = async(req, res, next) => {
    try{
        const products = await productService.list();
        res.json(products);
    } catch (err) {
        next(err);
    }    
}

module.exports.getProduct = async(req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productService.findById(id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

module.exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.create(req.body);
        res.json(newProduct);
    } catch (err) {
        next(err);
    }   
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedProduct = await productService.updateById(id, req.body);
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProduct = await productService.deleteById(id);
        res.json(deletedProduct);
    } catch (err) {
        next(err);
    }
}