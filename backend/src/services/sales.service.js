const { salesModel } = require('../models');

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

module.exports = {
  getAllSales,
  getSaleById,
};