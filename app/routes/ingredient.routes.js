module.exports = (app) => {
  const Ingredient = require("../controllers/ingredient.controller.js");
  var router = require("express").Router();

  // Create a new Ingredient
  router.post("/ingredients/", Ingredient.create);

  // Retrieve all Ingredient
  router.get("/ingredients/", Ingredient.findAll);

  // Retrieve a single Ingredient with ingredientId
  router.get("/ingredients/:id", Ingredient.findOne);

  // Update an Ingredient with ingredientId
  router.put("/ingredients/:id", Ingredient.update);

  // Delete an Ingredient with ingredientId
  router.delete("/ingredients/:id", Ingredient.delete);

  // Create a new Ingredient
  router.delete("/ingredients/", Ingredient.deleteAll);

  app.use("/recipeapi", router);
};
