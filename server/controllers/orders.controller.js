const {
  getAllOrders,
} = require("../db/orders.db");

const getOrders = async (req, res) => {
  const orders = await getAllOrders();
  res.send(orders);
};

module.exports = {
  getOrders,
}; 