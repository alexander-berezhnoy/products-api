const { Router } = require('express');
const routers = Router();
const productsRouter = require('./products.router');

routers.use('/products', productsRouter);

module.exports = routers;
