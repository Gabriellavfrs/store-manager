const { salesModel, productModel } = require('../models');
const { saleQuantitySchema } = require('./validations/schemas');

const getAllSales = async () => {
  const sales = await salesModel.findAllSales();
  if (sales.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'There are no sales' } };
  }
  return { status: 'SUCCESSFUL', data: sales };
};

const getSaleById = async (saleID) => {
  const sale = await salesModel.findSaleById(saleID);
  if (sale.length < 1) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sale };
};

const insertNewSale = async (sale) => {
  const { error } = saleQuantitySchema.validate(sale);
  if (error) {
    return { 
    status: 'INVALID_VALUE', 
    data: { message: '"quantity" must be greater than or equal to 1' }, 
    }; 
  }

  const validateProducts = sale.map(({ productId }) => productModel.findProductById(productId));
  const result = await Promise.all(validateProducts);
  if (result.includes(undefined)) { 
    return { 
      status: 'NOT_FOUND', 
      data: { message: 'Product not found' } }; 
  }

  const newSale = await salesModel.registerSale(sale);
  return { status: 'CREATED', data: newSale };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertNewSale,
};