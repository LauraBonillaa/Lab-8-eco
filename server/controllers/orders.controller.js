const {
  getAllOrders,
  createOrderInDB,
  updateOrderInDb,
  deleteOrderInDb,
} = require("../db/orders.db");

const getOrders = async (req, res) => {
  const orders = await getAllOrders();
  res.send(orders);
};

const createOrder = async (req, res) => {
  const { user_id, total, created_at } = req.body;
  const response = await createOrderInDB({ user_id, total, created_at });
  res.send(response);
};

const updateOrder = async (req, res) => {
  const { user_id, total, created_at } = req.body;
  const { id: orderId } = req.params;
  const response = await updateOrderInDb({ user_id, total, created_at }, orderId);
  res.send(response);
};

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const response = await deleteOrderInDb(orderId);
  res.send(response);
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
}; 