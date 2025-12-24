const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

// ======================
// VIEW ORDERS
// ======================
module.exports.viewOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.render("orders/orders", { orders });
};

// ======================
// CREATE ORDER
// ======================
module.exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  if (!cart || cart.items.length === 0) {
    req.flash("error", "Your cart is empty!");
    return res.redirect("/cart");
  }

  const items = cart.items.map((i) => ({
    product: i.product._id,
    title: i.product.title,
    price: i.product.price,
    quantity: i.quantity,
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = new Order({
    user: req.user._id,
    items,
    totalAmount,
    status: "placed",
  });

  await order.save();

  // Clear cart
  cart.items = [];
  await cart.save();

  req.flash("success", "Order placed successfully!");
  res.redirect("/orders");
};
