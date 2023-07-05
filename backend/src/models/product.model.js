const connection = require('./connection');
const { 
  getFormattedColumnNames, 
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findProductById = async (productID) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productID]);
  return product;
};

const insertProduct = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;
  const values = Object.values(product);

  const [{ insertId }] = await connection.execute(query, [...values]);
  return insertId;
};

module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
};