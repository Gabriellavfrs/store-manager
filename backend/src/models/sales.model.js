const camelize = require('camelize');
const connection = require('./connection');
const { 
  getFormattedColumnNames, getFormattedPlaceholders, 
  // getFormattedPlaceholders, 
} = require('../utils/generateFormattedQuery');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT S.date, SP.sale_id, SP.product_id, SP.quantity 
    FROM sales AS S
    INNER JOIN sales_products AS SP
    ON S.id = SP.sale_id
    ORDER BY SP.sale_id, SP.product_id;`,
  );
  return camelize(sales);
};

const findSaleById = async (saleID) => {
  const [sale] = await connection.execute(
    `SELECT S.date, SP.product_id, SP.quantity 
    FROM sales AS S
    INNER JOIN sales_products AS SP
    ON S.id = SP.sale_id
    WHERE S.id = ?
    ORDER BY SP.sale_id, SP.product_id;`, 
    [saleID],
  );
  return camelize(sale);
};

const insertSaleProducts = async (saleId, sales) => {
  const columns = getFormattedColumnNames(sales[0]);
  const placeholders = sales.map((sale) => `(?, ${getFormattedPlaceholders(sale)})`).join(', ');

  const values = sales.flatMap((sale) => [saleId, ...Object.values(sale)]);
  const query = `INSERT INTO sales_products (sale_id, ${columns}) VALUES ${placeholders};`;
  return connection.execute(query, values);
};

const registerSale = async (sales) => {
  const query = 'INSERT INTO sales () VALUES ();';
  const [{ insertId }] = await connection.execute(query, []);
  await insertSaleProducts(insertId, sales);
  const registeredSale = {
    id: insertId,
    itemsSold: sales,
  };
  return registeredSale;
};

module.exports = {
  findAllSales,
  findSaleById,
  insertSaleProducts,
  registerSale,
};