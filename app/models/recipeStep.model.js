module.exports = (sequelize, Sequelize) => {
  const RecipeStep = sequelize.define("recipeStep", {
    stepNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    instruction: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
  });
  return RecipeStep;
};
