const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const create = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: product.insertId, name };
};

const update = async (name, id) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
  return { name, id };
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
