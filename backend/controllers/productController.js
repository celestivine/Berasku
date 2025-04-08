const Product = require('../models/product');


const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require('../utils/apiFeatures');

// Create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => { 
    
        const product = await Product.create(req.body);
    
    res.status(201).json({
        success: true,
        product
    });
});

// Get all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query).search();
    console.log("Keyword diterima:", req.query.keyword);

     const products = await apiFeatures.query;

    console.log("Products Found:", products.length); // 🔍 Cek jumlah produk ditemukan

    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
});


// Get single product details => /api/v1/product/:nama
exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
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
});

// Update Product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    try {

        let product = await Product.findById(req.params.id); 
        console.log('Product:', product);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
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
});


// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'ID produk tidak valid'
            });
        }

        const product = await Product.findById(req.params.id);
        console.log('Product:', product);

        if (!product) {
            console.log('Produk tidak ditemukan');
            return res.status(404).json({
                success: false,
                message: 'Produk tidak ditemukan'
            });
        }

        await product.deleteOne();
        console.log('Produk berhasil dihapus');

        res.status(200).json({
            success: true,
            message: 'Produk berhasil dihapus'
        });

    } catch (error) {
        console.error('Error saat deleteProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});



// Get alll producs => /api/v1/products?keyword=Medium
exports.getProducts =  catchAsyncErrors (async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})