const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/:id', productController.productById);
route.get('/', productController.allProducts);

module.exports = route;