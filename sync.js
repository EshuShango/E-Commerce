const db = require("./models");
db.sequelize.sync().then(function() {
  console.log("models synced")
  process.exit()
});

//? Put this in Package.JSON, but then would that affect the db connection and re-seeding ?
//* "start": "node server.js",
//*  "deploy": "npx sequelize db:drop && npx sequelize db:create && node sync.js && npm run seed && node server.js",
//* "seed": "npx sequelize db:seed:all"
//?---