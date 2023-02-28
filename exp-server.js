// //! VER 1
// const express = require('express');
// const routes = require('./routes');
// // import sequelize connection
// const sequelize = require('./config/connection');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(routes);

// //! Keep in mind that you need to run 'npm run seed' whenever you see a seed file!!!

// // sync sequelize models to the database, then turn on the server
// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
// });
// //! ----

// //^------------------------------------------

// //! VER 2
// import express from "express";
// import appAPI from "./routes/index.js";
// import connection from "./config/connection.js";

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(appAPI);

// // sync sequelize models to the database, then turn on the server
// connection.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
// });
// //! ----