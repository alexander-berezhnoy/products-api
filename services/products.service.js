const Product = require('../models/products')

module.exports.create = product => Product.create(product);
module.exports.deleteById = id => Product.findByIdAndDelete(id)
module.exports.findById = id => Product.findById(id, { name: 1, price: 1, picture: 1, description: 1})
module.exports.list = () => Product.find({}, { name: 1, price: 1, picture: 1});
module.exports.updateById = (id, changes) => Product.findByIdAndUpdate(id, changes)
