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

const update = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  await connection.execute(query, [id, name]);
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
