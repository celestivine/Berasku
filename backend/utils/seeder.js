const product = require('../models/product');
const dotenv = require('dotenv');

const connectDatabase = require('../config/database');
const { connect } = require ('mongoose');

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });

// Connecting to Database
connectDatabase();

// Connecting to JSON file
const products = require('../data/products.json');

const seedProducts = async () => {
    try {
        
        await product.deleteMany();
        console.log('Produk telah di hapus');

        await product.insertMany(products);
        console.log ('Produk berhasil di tambahkan');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();