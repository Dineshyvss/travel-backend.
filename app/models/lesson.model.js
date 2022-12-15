module.exports = (sequelize, Sequelize) => {
  const Lesson = sequelize.define("lesson", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Lesson;
};
