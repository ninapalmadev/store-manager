const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT DISTINCT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity '
    + 'FROM sales AS s JOIN sales_products AS sp ORDER BY sp.sale_id, sp.product_id;',
  );

  return result;
};

const getById = async (id) => {
  const query = 'SELECT s.date, sp.product_id AS productId, sp.quantity '
  + 'FROM sales AS s JOIN sales_products AS sp ON s.id = sp.sale_id WHERE s.id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
};