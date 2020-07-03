const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      {
          getAllProducts,
          getProduct,
          createProduct,
          updateProduct,
          deleteProduct
      } = require('./controllers/product.controller'),
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

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})