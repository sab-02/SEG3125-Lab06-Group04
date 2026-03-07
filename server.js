const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dataPath = path.join(__dirname, "data", "responses.json");

// API to save survey responses
router.post("/survey", (req, res) => {

  const newResponse = req.body;

  // Read existing data
  let responses = [];

  if (fs.existsSync(dataPath)) {
    const fileData = fs.readFileSync(dataPath);
    responses = JSON.parse(fileData);
  }

  // Add new response
  responses.push(newResponse);

  // Save back to file
  fs.writeFileSync(dataPath, JSON.stringify(responses, null, 2));

  res.json({ message: "Survey submitted successfully" });

});

// API to get results
router.get("/results", (req, res) => {

  if (!fs.existsSync(dataPath)) {
    return res.json([]);
  }

  const fileData = fs.readFileSync(dataPath);
  const responses = JSON.parse(fileData);

  res.json(responses);

});

module.exports = router;
