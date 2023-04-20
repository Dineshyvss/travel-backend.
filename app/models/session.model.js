module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    token: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return Session;
};
