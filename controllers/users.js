const User = require("../models/user");

// ======================
// RENDER SIGNUP
// ======================
module.exports.renderSignup = (req, res) => {
  res.render("users/signup");
};

// ======================
// SIGNUP LOGIC
// ======================
module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to E-Commerce!");
      res.redirect("/products");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// ======================
// RENDER LOGIN
// ======================
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

// ======================
// LOGIN LOGIC
// ======================
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/products";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// ======================
// LOGOUT
// ======================
module.exports.logout = (req, res) => {
  req.logout(() => {
    req.flash("success", "You are logged out!");
    res.redirect("/products");
  });
};
