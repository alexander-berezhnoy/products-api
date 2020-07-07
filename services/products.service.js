const Product = require('../models/product');

const basicProjection = { name: 1, price: 1, picture: 1};

module.exports.create = product => Product.create(product);
module.exports.deleteById = id => Product.findByIdAndDelete(id)
module.exports.findById = (id,
                           projection = {...basicProjection, description: 1}
                           ) => Product.findById(id, projection)
module.exports.find = (filter = {}, projection = basicProjection) => Product.find(filter, projection);
module.exports.updateById = (id, changes) => Product.findByIdAndUpdate(id, changes)
