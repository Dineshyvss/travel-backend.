module.exports = (app) => {
  const RecipeStep = require("../controllers/recipeStep.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new Recipe Step for a Recipe
  router.post(
    "/recipes/:recipeId/recipeSteps/",
    [authenticateRoute],
    RecipeStep.create
  );

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
  router.get("/recipes/:recipeId/recipeSteps/:id", RecipeStep.findOne);

  // Update a Recipe Step with id
  router.put(
    "/recipes/:recipeId/recipeSteps/:id",
    [authenticateRoute],
    RecipeStep.update
  );

  // Delete a Recipe Step with id
  router.delete(
    "/recipes/:recipeId/recipeSteps/:id",
    [authenticateRoute],
    RecipeStep.delete
  );

  // Delete all Recipe Steps
  router.delete("/recipeSteps/", [authenticateRoute], RecipeStep.deleteAll);

  app.use("/recipeapi", router);
};
