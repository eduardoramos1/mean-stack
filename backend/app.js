const app = require("express")();

app.use((req, res, next) => {
  console.log("Primeiro Middleware");
  next();
});

app.use((req, res, next) => {
  res.send("Eai");
});

module.exports = app;
