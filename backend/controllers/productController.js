const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');

// Create new product => /api/v1/product/new
exports.newProduct = async(req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

// Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
};

// Get single product details => /api/v1/product/:nama
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            nama: { $regex: req.params.nama, $options: 'i' } // 'i' = case-insensitive
        });
        
        if (!product) {
            return next(new ErrorHandler('Produk tidak ditemukan', 404));
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Update Product => /api/v1/product/:nama
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findOne({
            nama: { $regex: req.params.nama, $options: 'i' }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }

        product = await Product.findOneAndUpdate(
            { nama: { $regex: req.params.nama, $options: 'i' } },
            req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Delete Product => /api/v1/admin/product/:nama
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({ nama: { $regex: req.params.nama, $options: 'i' } });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }

        await Product.deleteOne({ nama: { $regex: req.params.nama, $options: 'i' } });

        res.status(200).json({
            success: true,
            message: 'Produk berhasil dihapus'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};