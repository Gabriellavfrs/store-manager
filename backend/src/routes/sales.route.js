const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/:id', salesController.saleById);
route.get('/', salesController.allSalles);

module.exports = route;
