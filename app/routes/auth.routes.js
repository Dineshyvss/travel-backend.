module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Login
  router.post("/login", auth.login);

  // Logout
  router.post("/logout", auth.logout);

  app.use("/recipeapi", router);
};
