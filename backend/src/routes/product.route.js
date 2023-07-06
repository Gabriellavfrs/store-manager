const route = require('express').Router();
const { productController } = require('../controllers');
const productFieldValidation = require('../middlewares/productValidations');

route.get('/:id', productController.productById);
route.get('/', productController.allProducts);
route.post('/', productFieldValidation, productController.newProduct);
route.put('/:id', productFieldValidation, productController.updatedProduct);

module.exports = route;