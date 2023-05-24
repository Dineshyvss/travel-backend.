module.exports = (app) => {
  const express = require("express");
const router = express.Router();
const SubscribeController = require("../controllers/subscribe.controller");

// Create a new subscription
router.post("/subscribe/", SubscribeController.create);

// Retrieve all subscriptions
router.get("/subscribe/", SubscribeController.findAll);

// Get a subscription by ID
router.get("/subscribe/:id", SubscribeController.findById);

module.exports = router;


  app.use("/travelapi", router);
};
