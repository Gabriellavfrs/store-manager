const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const allProducts = async (req, res) => {
  const { status, data } = await productService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.getProductById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const newProduct = async (req, res) => {
  const productData = req.body;
  const { status, data } = await productService.insertNewProduct(productData);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  const { status, data } = await productService.updateProductInfo(id, productData);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.deleteProductById(id);
  return res.status(mapStatusHTTP(status)).json(data) || res.sendStatus(status);
};

module.exports = {
  allProducts,
  productById,
  newProduct,
  updatedProduct,
  deleteProduct,
};