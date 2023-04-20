module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    servings: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
  });
  return Recipe;
};
