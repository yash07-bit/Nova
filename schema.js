const Joi = require("joi");

// ======================
// PRODUCT VALIDATION
// ======================
module.exports.productSchema = Joi.object({
  product: Joi.object({
    title: Joi.string().required().trim(), // Added trim() to remove accidental whitespace
    description: Joi.string().allow("").trim(),
    price: Joi.number().min(0).required(),
    category: Joi.string()
      .valid(
        "electronics",
        "fashion",
        "home",
        "books",
        "beauty",
        "sports",
        "other"
      )
      .required(),
  }).required(),
  // Added .optional() and items() to ensure the array contains strings (filenames/IDs)
  deleteImages: Joi.array().items(Joi.string()).optional(),
});

// ======================
// REVIEW VALIDATION
// ======================
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    // rating: ensured it's an integer to prevent ratings like 4.5 if not intended
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required().trim(),
  }).required(),
});
