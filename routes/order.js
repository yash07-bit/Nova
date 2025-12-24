const express = require("express");
const router = express.Router();
const orders = require("../controllers/orders");
const { isLoggedIn } = require("../middleware");

router.post("/", isLoggedIn, orders.createOrder);
router.get("/", isLoggedIn, orders.viewOrders);

module.exports = router;
