module.exports = (app) => {
  const Ingredients = require("../controllers/ingredient.controller.js");
  var router = require("express").Router();

  // Create a new Ingredient
  app.post("/ingredients", Ingredients.create);

  // Retrieve all Ingredients
  app.get("/ingredients", Ingredients.findAll);

  // Retrieve a single Ingredient with ingredientId
  app.get("/ingredients/:ingredientId", Ingredients.findOne);

  // Update an Ingredient with ingredientId
  app.put("/ingredients/:ingredientId", Ingredients.update);

  // Delete an Ingredient with ingredientId
  app.delete("/ingredients/:ingredientId", Ingredients.delete);

  // Create a new Ingredient
  app.delete("/ingredients", Ingredients.deleteAll);

  app.use("/recipeapi", router);
};
