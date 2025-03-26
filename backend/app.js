const express = require('express');
const app = express(); 

const errorMiddleware = require('./middleware/errors');


app.use(express.json());


//import all routes
const products = require('./routes/products');
const blogRoutes = require('./routes/blogs');
const auth = require('./routes/auth');

// API for products routes
app.use('/api/v1', products);

// API for Blog Routes
app.use('/api/v1', blogRoutes);

// API for auth routes
app.use('/api/v1', auth);

//  Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;