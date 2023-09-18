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

const createData = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (NOW());');
  return insertId;
};

const create = async (insertId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [insertId, productId, quantity],
  );
};

module.exports = {
  getAll,
  getById,
  createData,
  create,
};