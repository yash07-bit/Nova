/**
 * Main Application Entry Point
 */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");

// Import Route Handlers
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const app = express();

// ======================
// DATABASE CONNECTION
// ======================
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/nova";

mongoose
  .connect(dbUrl, { dbName: "nova" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ======================
// CONFIGURATION & MIDDLEWARE
// ======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ======================
// SESSION & FLASH CONFIGURATION
// ======================
const sessionConfig = {
  name: "session", // Extra security: don't use default connect.sid
  secret: process.env.SECRET || "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true, // Uncomment this when you have HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// ======================
// AUTHENTICATION CONFIGURATION
// ======================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
// GLOBAL VARIABLES MIDDLEWARE
// ======================
app.use((req, res, next) => {
  // Handle redirect logic for Passport (v0.6+)
  if (!["/login", "/"].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl;
  }
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ======================
// ROUTE MOUNTING
// ======================
app.use("/products", productRoutes);
app.use("/products/:id/reviews", reviewRoutes);
app.use("/", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

/**
 * Home Route
 * Redirects to the main products listing.
 */
app.get("/", (req, res) => {
  res.redirect("/products");
});

// ======================
// ERROR HANDLING MIDDLEWARE
// ======================

/**
 * 404 Handler
 * Catches any request that doesn't match a defined route.
 */
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

/**
 * Global Error Handler
 * Renders the error page with the status code and message.
 */
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error", { err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
