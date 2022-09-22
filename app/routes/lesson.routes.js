module.exports = app => {
    const lessons = require("../controllers/lesson.controller.js");
    var router = require("express").Router();
    // Create a new Lesson for a Tutorial
    router.post("/:tutorialId/lessons/", lessons.create);
    // Retrieve all Lessons for a Tutorial
    router.get("/:tutorialId/lessons/", lessons.findAll);
    // Retrieve all published Lessons for a Tutorial
    router.get("/:tutorialId/lessons/published", lessons.findAllPublished);
    // Retrieve a single Lesson with id
    router.get("/:tutorialId/lessons/:id", lessons.findOne);
    // Update a Lesson with id
    router.put("/:tutorialId/lessons/:id", lessons.update);
    // Delete a Lesson with id
    router.delete("/:tutorialId/lessons/:id", lessons.delete);
    // Delete all Lessons
    router.delete("/:tutorialId/lessons/:id", lessons.deleteAll);
    app.use('/api/tutorials', router);
};