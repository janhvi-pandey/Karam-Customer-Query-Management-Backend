const express = require("express");
const queryRoute = express.Router();
const Query = require('../models/query');
const User = require("../models/User");

// Get all queries
queryRoute.get('/getquery', async (req, res) => {
    const result = await Query.find();
    res.send(result);
});

// Get pending queries for a user
queryRoute.get('/getpenquery/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Query.find({ uid: id, status: "pen" });
    res.send({ msg: "Success", result: result });
});

// Get processing queries for a user
queryRoute.get('/getproquery/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Query.find({ uid: id, status: "pro" });
    res.send({ msg: "Success", result: result });
});

// Get completed queries for a user
queryRoute.get('/getcomquery/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Query.find({ uid: id, status: "com" });
    console.log(result);
    res.send({ msg: "Success", result: result });
});

// Add a new query
queryRoute.post('/addquery', async (req, res) => {
    const query = req.body;
    const { uid } = req.body;

    const user = await User.findById(uid);
    await user.querycount++;
    await user.save();
    console.log(query);
    const result = await Query.create(req.body);
    res.send({ msg: "Query added" });
});

// Get user query counts
queryRoute.get('/getuserquerycounts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const pendingCount = await Query.countDocuments({ uid: id, status: 'pen' });
        const processingCount = await Query.countDocuments({ uid: id, status: 'pro' });
        const completedCount = await Query.countDocuments({ uid: id, status: 'com' });

        res.json({
            pendingCount,
            processingCount,
            completedCount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user query counts' });
    }
});

// Update a query
queryRoute.put('/updatequery/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedQuery = await Query.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedQuery) {
            return res.status(404).json({ message: 'Query not found' });
        }
        res.json({ message: 'Success', result: updatedQuery });
    } catch (error) {
        res.status(500).json({ message: 'Error updating query' });
    }
});

// Getquery by ID
queryRoute.get('/getquery/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ msg: "Query not found" });
        }
        res.json({ msg: "Success", result: query });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching query" });
    }
});

// Deletequery by ID
queryRoute.delete('/deletequery/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedQuery = await Query.findByIdAndDelete(id);

        if (!deletedQuery) {
            return res.status(404).json({ message: 'Query not found' });
        }
        res.json({ message: 'Query deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting query' });
    }
});

// Update query status to "pending"
queryRoute.patch('/raisetopen/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const updatedQuery = await Query.findByIdAndUpdate(id, { status: "pen" }, { new: true });
      if (!updatedQuery) {
          return res.status(404).json({ message: 'Query not found' });
      }
      res.json({ message: 'Query status updated to pending', result: updatedQuery });
  } catch (error) {
      res.status(500).json({ message: 'Error updating query status' });
  }
});

module.exports = queryRoute;
