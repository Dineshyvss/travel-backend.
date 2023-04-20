module.exports = (sequelize, Sequelize) => {
  const RecipeStepIngredient = sequelize.define("recipeStepIngredient", {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return RecipeStepIngredient;
};
