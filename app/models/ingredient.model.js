module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("ingredient", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pricePerUnit: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });
  return Ingredient;
};
