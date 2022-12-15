const db = require("../models");
const Lesson = db.lesson;
const Op = db.Sequelize.Op;
// Create and Save a new Lesson
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Lesson
  const lesson = {
    tutorialId: req.params.tutorialId,
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  // Save Lesson in the database
  Lesson.create(lesson)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lesson.",
      });
    });
};
// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
  const lessonId = req.query.lessonId;
  var condition = lessonId
    ? {
        lessonId: {
          [Op.like]: `%${lessonId}%`,
        },
      }
    : null;

  Lesson.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
// Retrieve all Lessons for a tutorial from the database.
exports.findAllForTutorial = (req, res) => {
  const tutorialId = req.params.tutorialId;

  Lesson.findAll({ where: { tutorialId: tutorialId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Lesson.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lesson with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Lesson with id=" + id,
      });
    });
};
// Update a Lesson by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Lesson.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Lesson with id=" + id,
      });
    });
};
// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Lesson.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Lesson with id=" + id,
      });
    });
};
// Delete all Lessons from the database.
exports.deleteAll = (req, res) => {
  Lesson.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Lessons were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all lessons.",
      });
    });
};
// Find all published Lessons
exports.findAllPublished = (req, res) => {
  const lessonId = req.query.lessonId;

  Lesson.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
