module.exports = (sequelize, Sequelize) => {
  const RecipeIngredient = sequelize.define("recipeIngredient", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  return RecipeIngredient;
};
