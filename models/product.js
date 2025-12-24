const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [ImageSchema],

    category: {
      type: String,
      required: true,
      enum: [
        "electronics",
        "fashion",
        "home",
        "books",
        "beauty",
        "sports",
        "other",
      ],
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    // Additional modern e-commerce fields
    rating: {
      type: Number,
      default: 0,
    },
    stockCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ======================
// DELETE REVIEWS WHEN PRODUCT DELETED
// ======================
ProductSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews },
    });
  }
});

module.exports = mongoose.model("Product", ProductSchema);
