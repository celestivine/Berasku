const express = require('express');
const app = express(); 

const errorMiddleware = require('./middleware/errors');

app.use(express.json());


//import all routes
const products = require('./routes/products');


app.use('/api/v1', products);

//  Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;