const { productSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Product = require("./models/product");
const Review = require("./models/review");

// ======================
// AUTHENTICATION MIDDLEWARE
// ======================

/**
 * Checks if the user is authenticated (logged in).
 * If not, redirects to the login page and stores the original URL.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Store the URL the user was trying to reach
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
};

// ======================
// PERMISSION MIDDLEWARE
// ======================

/**
 * Checks if the current user is the seller (owner) of the product.
 * Assumes `req.params.id` is the product ID.
 */
module.exports.isSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    // Check if product exists before checking ownership
    if (!product) {
      req.flash("error", "Product not found!");
      return res.redirect("/products");
    }

    if (!product.seller.equals(req.user._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/products/${id}`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Checks if the current user is the author of the review.
 * Assumes `req.params.reviewId` is the review ID.
 */
module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    // Check if review exists before checking ownership
    if (!review) {
      req.flash("error", "Review not found!");
      return res.redirect(`/products/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/products/${id}`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

// ======================
// DATA VALIDATION MIDDLEWARE
// ======================

/**
 * Validates the request body against the Product Joi schema.
 * Throws a 400 ExpressError if validation fails.
 */
module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

/**
 * Validates the request body against the Review Joi schema.
 * Throws a 400 ExpressError if validation fails.
 */
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
