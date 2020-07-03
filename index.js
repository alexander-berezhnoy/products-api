const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      Product = require('./models/product'),
      PORT = 4000;

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/products-app', { useNewUrlParser: true,  useUnifiedTopology: true }); 
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(bodyParser.json());

const productRouter = express.Router();
app.use('/products', productRouter)
app.use(function(err, req, res, next){
    const message = err.message || err;
    const status = err.status || 500; 
    console.err(err.stack);
    res.status(status).json({ error: message });
});

productRouter.get('/', async (req, res, next) => {
    try{
        const products = await Product.find({}, { name: 1, price: 1, picture: 1});
        res.json(products);
    } catch (err) {
       next(err);
    }    
});

productRouter.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        const product = await Product.findById(id, { name: 1, price: 1, picture: 1, description: 1})
        res.json(product);
    } catch (err) {
        next(err);
    }
});

productRouter.post('/', async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (err) {
        next(err);
    }   
})

productRouter.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
});

productRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.json(deletedProduct);
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})