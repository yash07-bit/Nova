const Product = require("../models/product");
const Review = require("../models/review");

// ======================
// CREATE REVIEW
// ======================
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    req.flash("error", "Product not found!");
    return res.redirect("/products");
  }

  const review = new Review(req.body.review);
  review.author = req.user._id;
  product.reviews.push(review);
  await review.save();
  await product.save();

  req.flash("success", "Review added!");
  res.redirect(`/products/${id}`);
};

// ======================
// DELETE REVIEW
// ======================
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.redirect(`/products/${id}`);
};
