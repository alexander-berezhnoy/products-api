const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('./configs/mongo'),
      productRouter = require('./routes/products.router'),
      PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRouter);
app.use(function(err, req, res, next){
    const message = err.message || err;
    const status = err.status || 500; 
    console.err(err.stack);
    res.status(status).json({ error: message });
});

mongoose.connection.on("connected", () => {
    app.listen(PORT, function() {
        console.log(`Server is running on port ${PORT}`)
    })
})