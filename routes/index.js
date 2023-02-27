const router = require('express').Router();
const apiRoutes = require('./api/index.js');

const apiApp = router;

apiApp.use('/api', apiRoutes);

apiApp.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = apiApp;

//!---

// import express from "express";
// import apiRoutes from "./api/index.js";

// const appAPI = express.Router();

// appAPI.use("/api", apiRoutes);

// appAPI.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>");
// });

// export default appAPI;

//!---