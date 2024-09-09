const express = require("express");
const queryRoute = express.Router();
const Query = require('../models/query');

// Fetch a specific query by ID
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

// Update a specific query by ID
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

module.exports = queryRoute;
