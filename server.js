const express = require('express');
const apiApp = require('./routes/index.js');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiApp);

//? sync sequelize models to the database, then turn on the server
//? I believe i did this correct
connect.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});




