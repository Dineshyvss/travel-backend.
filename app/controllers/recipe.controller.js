const db = require("../models");
const Recipe = db.recipe;
const RecipeStep = db.recipeStep;
const RecipeIngredient = db.recipeIngredient;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.servings === undefined) {
    const error = new Error("Servings cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.time === undefined) {
    const error = new Error("Time cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Recipe
  const recipe = {
    name: req.body.name,
    description: req.body.description,
    servings: req.body.servings,
    time: req.body.time,
    userId: req.body.userId ? req.body.userId : null,
  };
  // Save Recipe in the database
  Recipe.create(recipe)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe.",
      });
    });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  const recipeId = req.query.recipeId;
  var condition = recipeId
    ? {
        id: {
          [Op.like]: `%${recipeId}%`,
        },
      }
    : null;
  Recipe.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes.",
      });
    });
};

// Find all Recipes for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Recipe.findAll({ where: { userId: userId }, order: [["name", "ASC"]] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recipes for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Recipes for user with id=" + userId,
      });
    });
};

// find all Recipes without a user
exports.findAllWithoutUser = (req, res) => {
  Recipe.findAll({
    where: { userId: null },
    include: [
      {
        model: RecipeStep,
        as: "recipeStep",
        required: false,
        include: [
          {
            model: RecipeIngredient,
            as: "recipeIngredient",
            required: false,
            include: [
              {
                model: Ingredient,
                as: "ingredient",
                required: false,
              },
            ],
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
      [RecipeStep, "stepNumber", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recipes without a user.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Recipes without a user.",
      });
    });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Recipe.findAll({
    where: { id: id },
    include: [
      {
        model: RecipeStep,
        as: "recipeStep",
        required: false,
        include: [
          {
            model: RecipeIngredient,
            as: "recipeIngredient",
            required: false,
            include: [
              {
                model: Ingredient,
                as: "ingredient",
                required: false,
              },
            ],
          },
        ],
      },
    ],
    order: [[RecipeStep, "stepNumber", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recipe with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Recipe with id=" + id,
      });
    });
};
// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Recipe.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Recipe was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Recipe with id=" + id,
      });
    });
};
// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Recipe was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Recipe with id=" + id,
      });
    });
};
// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Recipes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipes.",
      });
    });
};
