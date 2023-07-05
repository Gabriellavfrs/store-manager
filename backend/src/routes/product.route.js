const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/:id', productController.productById);
route.get('/', productController.allProducts);
route.post('/', productController.newProduct);

module.exports = route;