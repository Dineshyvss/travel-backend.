module.exports = (app) => {
  const RecipeStep = require("../controllers/recipeStep.controller.js");
  // const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Recipe Step for a Recipe
  router.post("/recipes/:recipeId/recipeSteps/", RecipeStep.create);

  // Retrieve all Recipe Steps
  router.get("/recipeSteps/", RecipeStep.findAll);

  // Retrieve all Recipe Steps for a Recipe
  router.get("/recipes/:recipeId/recipeSteps/", RecipeStep.findAllForRecipe);

  // Retrieve all Recipe Steps for a Recipe and include the ingredients
  router.get(
    "/recipes/:recipeId/recipeStepsWithIngredients/",
    RecipeStep.findAllForRecipeWithIngredients
  );

  // Retrieve a single Recipe Step with id
  router.get("/recipeSteps/:id", RecipeStep.findOne);

  // Update a Recipe Step with id
  router.put("/recipeSteps/:id", RecipeStep.update);

  // Delete a Recipe Step with id
  router.delete("/recipeSteps/:id", RecipeStep.delete);

  // Delete all Recipe Steps
  router.delete("/recipeSteps/", RecipeStep.deleteAll);

  app.use("/recipeapi", router);
};
