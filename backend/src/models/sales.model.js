const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT S.date, SP.sale_id, SP.product_id, SP.quantity 
    FROM sales AS S
    INNER JOIN sales_products AS SP
    ON S.id = SP.sale_id
    ORDER BY SP.sale_id, SP.product_id;`,
  );
  return sales;
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

module.exports = {
  findAllSales,
  findSaleById,
};