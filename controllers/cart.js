const Cart = require("../models/cart");
const Product = require("../models/product");

// ======================
// VIEW CART
// ======================
module.exports.viewCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }
  res.render("cart/cart", { cart });
};

// ======================
// ADD TO CART
// ======================
module.exports.addToCart = async (req, res) => {
  const { productId } = req.params;
  const cart =
    (await Cart.findOne({ user: req.user._id })) ||
    (await Cart.create({ user: req.user._id, items: [] }));

  const index = cart.items.findIndex((item) => item.product.equals(productId));

  if (index > -1) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({ product: productId, quantity: 1 });
  }

  await cart.save();
  req.flash("success", "Product added to cart!");
  res.redirect("/cart");
};

// ======================
// UPDATE QUANTITY
// ======================
module.exports.updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  const item = cart.items.find((i) => i.product.equals(productId));
  if (item) {
    item.quantity = Math.max(1, parseInt(quantity));
  }

  await cart.save();
  req.flash("success", "Cart updated!");
  res.redirect("/cart");
};

// ======================
// REMOVE ITEM
// ======================
module.exports.removeItem = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });

  cart.items = cart.items.filter((i) => !i.product.equals(productId));

  await cart.save();
  req.flash("success", "Item removed!");
  res.redirect("/cart");
};
