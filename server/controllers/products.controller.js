const {
  getAllProducts,
  getProductsByUserId,
} = require("../db/products.db");

const getProducts = async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
};

const getProductsByUser = async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).send({ error: 'user_id requerido' });
  const products = await getProductsByUserId(user_id);
  res.send(products);
};

module.exports = {
  getProducts,
  getProductsByUser,
}; 