const db = require("../models");
const RecipeStepIngredient = db.recipeStepIngredient;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new RecipeStepIngredient
exports.create = (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error(
      "Quantity cannot be empty for recipe step ingredient!"
    );
    error.statusCode = 400;
    throw error;
  } else if (req.body.recipeStepId === undefined) {
    const error = new Error(
      "Recipe step ID cannot be empty for recipe step ingredient!"
    );
    error.statusCode = 400;
    throw error;
  } else if (req.body.ingredientId === undefined) {
    const error = new Error(
      "Ingredient ID cannot be empty for recipe step ingredient!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a RecipeStepIngredient
  const recipeStepIngredient = {
    quantity: req.body.quantity,
    recipeStepId: req.body.recipeStepId,
    ingredientId: req.body.ingredientId,
  };
  // Save RecipeStepIngredient in the database
  RecipeStepIngredient.create(recipeStepIngredient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the RecipeStepIngredient.",
      });
    });
};

// Retrieve all RecipeStepIngredients from the database.
exports.findAll = (req, res) => {
  const recipeStepIngredientId = req.query.recipeStepIngredientId;
  var condition = recipeStepIngredientId
    ? {
        id: {
          [Op.like]: `%${recipeStepIngredientId}%`,
        },
      }
    : null;

  RecipeStepIngredient.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving recipeStepIngredients.",
      });
    });
};

// Find all RecipeStepIngredients for a recipe step and include the ingredients
exports.findAllForRecipeStepWithIngredients = (req, res) => {
  const recipeStepId = req.params.recipeStepId;
  RecipeStepIngredient.findAll({
    where: { recipeStepId: recipeStepId },
    include: [
      {
        model: Ingredient,
        as: "ingredient",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving recipeStepIngredients for a recipe step.",
      });
    });
};

// Find a single RecipeStepIngredient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  RecipeStepIngredient.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving RecipeStepIngredient with id=" + id,
      });
    });
};

// Update a RecipeStepIngredient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  RecipeStepIngredient.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "RecipeStepIngredient was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update RecipeStepIngredient with id=${id}. Maybe RecipeStepIngredient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error updating RecipeStepIngredient with id=" + id,
      });
    });
};

// Delete a RecipeStepIngredient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  RecipeStepIngredient.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "RecipeStepIngredient was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete RecipeStepIngredient with id=${id}. Maybe RecipeStepIngredient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete RecipeStepIngredient with id=" + id,
      });
    });
};

// Delete all RecipeStepIngredients from the database.
exports.deleteAll = (req, res) => {
  RecipeStepIngredient.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} RecipeStepIngredients were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all recipeStepIngredients.",
      });
    });
};
