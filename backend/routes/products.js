const express = require ('express');
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct,
    deleteProduct
    } = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
 

router.route('/products').get(getProducts);
router.route('/products/:nama').get(getSingleProduct);

router.route('/product/new').post(newProduct);

router.route('/admin/product/:id')
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);
  // .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  // .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;