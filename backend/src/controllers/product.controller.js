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
  if (!productData.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { status, data } = await productService.insertNewProduct(productData);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  allProducts,
  productById,
  newProduct,
};