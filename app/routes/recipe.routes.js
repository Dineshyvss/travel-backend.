module.exports = (app) => {
  const Recipe = require("../controllers/recipe.controller.js");
  // const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/recipes/", Recipe.create);

  // Retrieve all Recipes
  router.get("/recipes/all", Recipe.findAll);

  // Retrieve all Recipes for user
  router.get("/recipes/user/:userId", Recipe.findAllForUser);

  // Retrieve all Recipes without user
  router.get("/recipes/", Recipe.findAllWithoutUser);

  // Retrieve a single Recipe with id
  router.get("/recipes/:id", Recipe.findOne);

  // Update a Recipe with id
  router.put("/recipes/:id", Recipe.update);

  // Delete a Recipe with id
  router.delete("/recipes/:id", Recipe.delete);

  // Delete all Recipes
  router.delete("/recipes/", Recipe.deleteAll);

  app.use("/recipeapi", router);
};
