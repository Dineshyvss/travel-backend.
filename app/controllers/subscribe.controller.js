const db = require('../models');
const Subscribe = db.subscribe;
const { validationResult } = require('express-validator');


// Get a subscription by ID
exports.findById = async (req, res) => {
  const subscriptionId = req.params.id;

  try {
    const subscription = await Subscribe.findByPk(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the subscription.' });
  }
};
// Update a subscriber by ID
exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedSubscriber = req.body;

  try {
    const subscriber = await Subscribe.findByPk(id);

    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    // Update the subscriber fields
    subscriber.name = updatedSubscriber.name;
    subscriber.email = updatedSubscriber.email;
    subscriber.contact = updatedSubscriber.contact;
    // Add other fields to update as needed

    // Save the updated subscriber
    await subscriber.save();

    res.status(200).json(subscriber);
  } catch (error) {
    console.error('Error updating subscriber:', error);
    res.status(500).json({ error: 'An error occurred while updating the subscriber.' });
  }
};

// Create a new subscription
exports.create = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a subscription object
    const subscription = {
      email: req.body.email,
      name: req.body.name,
      contact: req.body.contact,
      message: req.body.message,
      // Add other properties as needed
    };

    // Save the subscription in the database
    const createdSubscription = await Subscribe.create(subscription);
    res.status(201).json(createdSubscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'An error occurred while creating the subscription.' });
  }
};


// Update a subscriber by ID
exports.updateSubscriber = async (req, res) => {
  const { id } = req.params;
  const updatedSubscriber = req.body;

  try {
    const subscriber = await Subscribe.findByPk(id);

    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    // Update the subscriber fields
    subscriber.name = updatedSubscriber.name;
    subscriber.email = updatedSubscriber.email;
    subscriber.contact = updatedSubscriber.contact;
    subscriber.message = updatedSubscriber.message;
    // Add other fields to update as needed

    // Save the updated subscriber
    await subscriber.save();

    res.status(200).json(subscriber);
  } catch (error) {
    console.error('Error updating subscriber:', error);
    res.status(500).json({ error: 'An error occurred while updating the subscriber.' });
  }
};


// Retrieve all subscriptions
exports.findAll = async (req, res) => {
  try {
    const subscriptions = await Subscribe.findAll();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error retrieving subscriptions:', error);
    res.status(500).json({ error: 'An error occurred while retrieving subscriptions.' });
  }
};

// Update a subscription
exports.update = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const subscriptionId = req.params.id;

  try {
    // Find the subscription by ID
    const subscription = await Subscribe.findByPk(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }
    // Get a subscription by ID
    exports.findById = async (req, res) => {
      const subscriptionId = req.params.id;
    
      try {
        const subscription = await Subscribe.findByPk(subscriptionId);
        if (!subscription) {
          return res.status(404).json({ error: 'Subscription not found.' });
        }
    
        res.status(200).json(subscription);
      } catch (error) {
        console.error('Error retrieving subscription:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the subscription.' });
      }
    };
    // Update the subscription object
    subscription.email = req.body.email;
    subscription.name = req.body.name;
    subscription.contact = req.body.contact;
    subscription.message = req.body.message;
    // Update other properties as needed

    // Save the updated subscription in the database
    await subscription.save();
    res.status(200).json(subscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'An error occurred while updating the subscription.' });
  }
};
