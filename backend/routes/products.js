const express = require ('express');
const router = express.Router();


const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct,
    deleteProduct
    } = require('../controllers/productController');


router.route('/products').get(getProducts);
router.route('/products/:nama').get(getSingleProduct);

router.route('/product/new').post(newProduct);

router.route('/admin/product/:nama')
                .put(updateProduct)
                .delete(deleteProduct);

module.exports = router;