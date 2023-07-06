const connection = require('./connection');
const { 
  getFormattedColumnNames, 
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
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
  const [{ insertId }] = await connection.execute(query, values);
  return insertId;
};

const updateProduct = async (productID, productData) => {
  const columns = getFormattedUpdateColumns(productData);
  const query = `UPDATE products SET ${columns} WHERE id = ?`;
  const values = [...Object.values(productData), productID];
  return connection.execute(query, values);
};
module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
  updateProduct,
};