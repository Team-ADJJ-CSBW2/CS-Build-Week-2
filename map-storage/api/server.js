// Dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Server instance
const server = express();

// sanity check
server.get("/", (req, res) => {
  res.send("Welcome to CS Build Week 2!");
});

// Library Middleware
server.use(cors(), helmet(), express.json());

// Routers
const mapRouter = require("../controllers/map");

// API endpoints
server.use("/api/map", mapRouter);

// Error Handling
server.use(errorHandler);

function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(500).json({ error: "Data could not be retrieved" });
}

module.exports = server;
