const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");
const router = express.Router();

router.get("/orders", getOrders);
router.post("/orders", createOrder);
router.patch("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

module.exports = router; 