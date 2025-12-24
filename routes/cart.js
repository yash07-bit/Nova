const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, cart.viewCart);
router.post("/add/:productId", isLoggedIn, cart.addToCart);
router.post("/update/:productId", isLoggedIn, cart.updateQuantity);
router.post("/remove/:productId", isLoggedIn, cart.removeItem);

module.exports = router;
