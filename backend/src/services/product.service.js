const { productModel } = require('../models');

const getAllProducts = async () => {
  const products = await productModel.findAllProducts();
  if (products.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'There are no products' } };
  }
  return { status: 'SUCCESSFUL', data: products };
};

const getProductById = async (productID) => {
  const product = await productModel.findProductById(productID);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: product };
};

const insertNewProduct = async (product) => {
  const newProductID = await productModel.insertProduct(product);
  const newProduct = await productModel.findProductById(newProductID);
  // if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
};