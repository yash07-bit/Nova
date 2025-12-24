const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const catchAsync = require("../utils/catchAsync");
const products = require("../controllers/products");
const { isLoggedIn, isSeller, validateProduct } = require("../middleware");

router.get("/", catchAsync(products.index));
router.get("/new", isLoggedIn, products.renderNewForm);
router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateProduct,
  catchAsync(products.createProduct)
);
router.get("/:id", catchAsync(products.showProduct));
router.get(
  "/:id/edit",
  isLoggedIn,
  isSeller,
  catchAsync(products.renderEditForm)
);
router.put(
  "/:id",
  isLoggedIn,
  isSeller,
  upload.array("image"),
  validateProduct,
  catchAsync(products.updateProduct)
);
router.delete("/:id", isLoggedIn, isSeller, catchAsync(products.deleteProduct));

module.exports = router;
