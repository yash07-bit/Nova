const Product = require("../models/product");

/**
 * Display all products or filter by category.
 * Handles GET /products
 */
module.exports.index = async (req, res) => {
  const { category } = req.query;
  let products;
  let pageTitle = "Curated Selection";

  if (category && category !== "all") {
    // Filter products if category is present in query string
    products = await Product.find({ category });
    pageTitle = category.charAt(0).toUpperCase() + category.slice(1);
    if (category === "deals") pageTitle = "Hot Deals";
  } else {
    // Show all products if no category selected
    products = await Product.find({});
  }

  res.render("products/index", {
    products,
    category: category || "all",
    pageTitle,
  });
};

/**
 * Show details for a specific product.
 * Handles GET /products/:id
 */
module.exports.showProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("seller");

  if (!product) {
    req.flash("error", "Cannot find that product!");
    return res.redirect("/products");
  }
  res.render("products/show", { product });
};

/**
 * Render the form to create a new product.
 * Handles GET /products/new
 */
module.exports.renderNewForm = (req, res) => {
  res.render("products/new");
};

/**
 * Create a new product in the database.
 * Handles POST /products
 */
module.exports.createProduct = async (req, res) => {
  const product = new Product(req.body.product);
  // Map uploaded files to image objects
  if (req.files) {
    product.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
  }
  product.seller = req.user._id;
  await product.save();
  req.flash("success", "Successfully made a new product!");
  res.redirect(`/products/${product._id}`);
};

/**
 * Render the edit form for a product.
 * Handles GET /products/:id/edit
 */
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    req.flash("error", "Cannot find that product!");
    return res.redirect("/products");
  }
  res.render("products/edit", { product });
};

/**
 * Update an existing product.
 * Handles PUT /products/:id
 */
module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { ...req.body.product });

  if (req.files) {
    const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    product.images.push(...imgs);
  }

  await product.save();
  req.flash("success", "Successfully updated product!");
  res.redirect(`/products/${id}`);
};

/**
 * Delete a product.
 * Handles DELETE /products/:id
 */
module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted product");
  res.redirect("/products");
};
