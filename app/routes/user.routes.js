module.exports = (app) => {
  const User = require("../controllers/user.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new User
  router.post("/users/", User.create);

  // Retrieve all Users
  router.get("/users/", User.findAll);

  // Retrieve a single User with id
  router.get("/users/:id", User.findOne);

  // Update a User with id
  router.put("/users/:id", [authenticateRoute], User.update);

  // Delete a User with id
  router.delete("/users/:id", [authenticateRoute], User.delete);

  // Delete all User
  router.delete("/users/", [authenticateRoute], User.deleteAll);

  app.use("/recipeapi", router);
};
