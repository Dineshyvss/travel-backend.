module.exports = (app) => {
  const User = require("../controllers/user.controller.js");
  // const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new User
  router.post("/user/", User.create);

  // Retrieve all Users
  router.get("/user/", User.findAll);

  // Retrieve a single User with id
  router.get("/user/:id", User.findOne);

  // Update a User with id
  router.put("/user/:id", User.update);

  // Delete a User with id
  router.delete("/user/:id", User.delete);

  // Delete all User
  router.delete("/user/", User.deleteAll);

  app.use("/recipeapi", router);
};
