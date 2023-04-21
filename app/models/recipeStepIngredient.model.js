module.exports = (sequelize, Sequelize) => {
  const RecipeStepIngredient = sequelize.define("recipeStepIngredient", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  return RecipeStepIngredient;
};
