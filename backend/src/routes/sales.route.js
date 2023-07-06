const route = require('express').Router();
const { salesController } = require('../controllers');
const saleFieldsValidation = require('../middlewares/salesValidations');

route.get('/:id', salesController.saleById);
route.get('/', salesController.allSalles);
route.post('/', saleFieldsValidation, salesController.newSale);

module.exports = route;
