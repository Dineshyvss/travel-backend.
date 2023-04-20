module.exports = (app) => {
  const RecipeStepIngredient = require("../controllers/recipeStepIngredient.controller.js");
  var router = require("express").Router();

  // Create a new Recipe Step Ingredient for a Recipe Step
  router.post(
    "/recipeSteps/:recipeStepId/recipeStepIngredients/",
    RecipeStepIngredient.create
  );

  // Retrieve all Recipe Step Ingredients
  router.get("/recipeStepIngredients/", RecipeStepIngredient.findAll);

  // Retrieve all Recipe Step Ingredients for a Recipe Step
  router.get(
    "/recipeSteps/:recipeStepId/recipeStepIngredients/",
    RecipeStepIngredient.findAllForRecipeStepWithIngredients
  );

  // Retrieve a single Recipe Step Ingredient with id
  router.get("/recipeStepIngredients/:id", RecipeStepIngredient.findOne);

  // Update a Recipe Step Ingredient with id
  router.put("/recipeStepIngredients/:id", RecipeStepIngredient.update);

  // Delete a Recipe Step Ingredient with id
  router.delete("/recipeStepIngredients/:id", RecipeStepIngredient.delete);

  // Delete all Recipe Step Ingredients
  router.delete("/recipeStepIngredients/", RecipeStepIngredient.deleteAll);

  app.use("/recipeapi", router);
};
