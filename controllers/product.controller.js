const productService = require('../services/products.service')

module.exports.getAllProducts = async(req, res, next) => {
    try{
        const products = await productService.find();
        res.json(products);
    } catch (err) {
        next(err);
    }    
}

module.exports.getProduct = async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.findById(id);
        res.json(product);
    } catch (err) {
        next(err);
    }
}

module.exports.createProduct = async (req, res, next) => {
    try {
        const isProductExists = await productService.find({name: req.body.name});
        if (isProductExists && isProductExists.length) throw new Error('Product exists');
        await productService.create(req.body);
        res.json({message: 'Product was successfully created'});
    } catch (err) {
        if (err.message === 'Product exists'){
            res.status(400).json({ errors: [{
                    field: "name",
                    error: "Name exists"
                }]})
        } else next(err);
    }   
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        await productService.updateById(id, req.body);
        res.json({ message: 'Product was successfully updated' });
    } catch (err) {
        next(err);
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        await productService.deleteById(id);
        res.json({message: 'Product was successfully deleted'});
    } catch (err) {
        next(err);
    }
}