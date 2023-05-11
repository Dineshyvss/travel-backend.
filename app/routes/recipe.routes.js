module.exports = (app) => {
  const Recipe = require("../controllers/recipe.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/recipes/", [authenticateRoute], Recipe.create);

  // Retrieve all Recipes for user
  router.get(
    "/recipes/user/:userId",
    [authenticateRoute],
    Recipe.findAllForUser
  );

  // Retrieve all published Recipes
  router.get("/recipes/", Recipe.findAllPublished);

  // Retrieve a single Recipe with id
  router.get("/recipes/:id", Recipe.findOne);

  // Update a Recipe with id
  router.put("/recipes/:id", [authenticateRoute], Recipe.update);

  // Delete a Recipe with id
  router.delete("/recipes/:id", [authenticateRoute], Recipe.delete);

  // Delete all Recipes
  router.delete("/recipes/", [authenticateRoute], Recipe.deleteAll);

  app.use("/recipeapi", router);
};
