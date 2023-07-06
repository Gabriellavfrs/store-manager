const { productModel } = require('../models');
const { productNameSchema } = require('./validations/schemas');

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
  const { error } = productNameSchema.validate(product);
  if (error) return { status: 'INVALID_VALUE', data: { message: error.message } };
  
  const newProductID = await productModel.insertProduct(product);
  const newProduct = await productModel.findProductById(newProductID);
  return { status: 'CREATED', data: newProduct };
};

const updateProductInfo = async (productID, productData) => {
  const { error } = productNameSchema.validate(productData);
  if (error) return { status: 'INVALID_VALUE', data: { message: error.message } };

  const isValidProductId = await productModel.findProductById(productID);
  if (!isValidProductId) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  await productModel.updateProduct(productID, productData);
  const updatedProduct = await productModel.findProductById(productID);
  return { status: 'SUCCESSFUL', data: updatedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
  updateProductInfo,
};