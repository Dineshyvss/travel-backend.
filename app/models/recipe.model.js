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
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isPublished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  return Recipe;
};
