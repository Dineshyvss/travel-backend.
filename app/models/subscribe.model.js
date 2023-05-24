module.exports = (sequelize, Sequelize) => {
    const Subscribe = sequelize.define("subscribe", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
      },
    });
  
    return Subscribe;
  };
  