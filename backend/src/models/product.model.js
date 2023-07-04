const connection = require('./connection');

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findProductById = async (productID) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productID]);
  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
};