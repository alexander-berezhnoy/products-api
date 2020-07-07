const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      db = require('./configs/db'),
      routers = require('./routes'),
      PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routers);

app.use(function(err, req, res, next){
    const message = err.message || err;
    const status = err.status || 500; 
    console.error(err.stack);
    res.status(status).json({ error: message });
});

db.on("connected", () => {
    app.listen(PORT, function() {
        console.log(`Server is running on port ${PORT}`)
    })
})