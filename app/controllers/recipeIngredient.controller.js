const db = require("../models");
const RecipeIngredient = db.recipeIngredient;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new RecipeIngredient
exports.create = (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error("Quantity cannot be empty for recipe ingredient!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.recipeId === undefined) {
    const error = new Error("Recipe ID cannot be empty for recipe ingredient!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.ingredientId === undefined) {
    const error = new Error(
      "Ingredient ID cannot be empty for recipe ingredient!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a RecipeIngredient
  const recipeIngredient = {
    quantity: req.body.quantity,
    recipeId: req.body.recipeId,
    recipeStepId: req.body.recipeStepId ? req.body.recipeStepId : null,
    ingredientId: req.body.ingredientId,
  };
  // Save RecipeIngredient in the database
  RecipeIngredient.create(recipeIngredient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the RecipeIngredient.",
      });
    });
};

// Retrieve all RecipeIngredients from the database.
exports.findAll = (req, res) => {
  const recipeIngredientId = req.query.recipeIngredientId;
  var condition = recipeIngredientId
    ? {
        id: {
          [Op.like]: `%${recipeIngredientId}%`,
        },
      }
    : null;

  RecipeIngredient.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving recipeIngredients.",
      });
    });
};

exports.findAllForRecipe = (req, res) => {
  const recipeId = req.params.recipeId;
  RecipeIngredient.findAll({
    where: { recipeId: recipeId },
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
          "Some error occurred while retrieving recipeIngredients for a recipe.",
      });
    });
};

// Find all RecipeIngredients for a recipe step and include the ingredients
exports.findAllForRecipeStepWithIngredients = (req, res) => {
  const recipeStepId = req.params.recipeStepId;
  RecipeIngredient.findAll({
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
          "Some error occurred while retrieving recipeIngredients for a recipe step.",
      });
    });
};

// Find a single RecipeIngredient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  RecipeIngredient.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving RecipeIngredient with id=" + id,
      });
    });
};

// Update a RecipeIngredient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  RecipeIngredient.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "RecipeIngredient was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update RecipeIngredient with id=${id}. Maybe RecipeIngredient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating RecipeIngredient with id=" + id,
      });
    });
};

// Delete a RecipeIngredient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  RecipeIngredient.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "RecipeIngredient was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete RecipeIngredient with id=${id}. Maybe RecipeIngredient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete RecipeIngredient with id=" + id,
      });
    });
};

// Delete all RecipeIngredients from the database.
exports.deleteAll = (req, res) => {
  RecipeIngredient.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} RecipeIngredients were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all recipeIngredients.",
      });
    });
};
