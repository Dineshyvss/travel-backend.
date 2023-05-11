module.exports = (app) => {
  const RecipeIngredient = require("../controllers/recipeIngredient.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new Recipe Ingredient for a Recipe
  router.post(
    "/recipes/:recipeId/recipeIngredients/",
    [authenticateRoute],
    RecipeIngredient.create
  );

  // Retrieve all Recipe Ingredients
  router.get("/recipeIngredients/", RecipeIngredient.findAll);

  // Retrieve all Recipe Ingredients for a Recipe
  router.get(
    "/recipes/:recipeId/recipeIngredients/",
    RecipeIngredient.findAllForRecipe
  );

  // Retrieve all Recipe Ingredients for a Recipe Step and include the ingredients
  router.get(
    "/recipes/:recipeId/recipeSteps/:recipeStepId/recipeIngredientsWithIngredients/",
    RecipeIngredient.findAllForRecipeStepWithIngredients
  );

  // Retrieve a single Recipe Ingredient with id
  router.get(
    "/recipes/:recipeId/recipeIngredients/:id",
    RecipeIngredient.findOne
  );

  // Update a Recipe Ingredient with id
  router.put(
    "/recipes/:recipeId/recipeIngredients/:id",
    [authenticateRoute],
    RecipeIngredient.update
  );

  // Delete a Recipe Ingredient with id
  router.delete(
    "/recipes/:recipeId/recipeIngredients/:id",
    [authenticateRoute],
    RecipeIngredient.delete
  );

  // Delete all Recipe Ingredients
  router.delete(
    "/recipeIngredients/",
    [authenticateRoute],
    RecipeIngredient.deleteAll
  );

  app.use("/recipeapi", router);
};
