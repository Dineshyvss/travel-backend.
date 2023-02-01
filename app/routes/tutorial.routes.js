module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", [authenticate], tutorials.create);

  // Retrieve all Tutorials
  router.get("/", [authenticate], tutorials.findAll);

  // Retrieve all Tutorials for user
  router.get("/userTut/:userId", [authenticate], tutorials.findAllForUser);

  // Retrieve a single Tutorial with id
  router.get("/:id", [authenticate], tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", [authenticate], tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", [authenticate], tutorials.delete);

  // Delete all Tutorials
  router.delete("/", [authenticate], tutorials.deleteAll);

  app.use("/tutorial/tutorials", router);
};
