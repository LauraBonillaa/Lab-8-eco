const express = require("express");
const {
  getProducts,
  getProductsByUser,
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/by-user", getProductsByUser);

module.exports = router; 