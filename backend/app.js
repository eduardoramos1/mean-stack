const app = require("express")();
const bodyParser = require("body-parser");
const { error } = require("console");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");

mongoose
  .connect(
    "mongodb+srv://eduardo:bWwBxDUhL0HBjFop@cluster0.dbezk.mongodb.net/MeanStack?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Conexão com banco de dados funcionando"))
  .catch((err) => {
    console.log("Houve um erro ao tentar a conexão");
    console.error(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // corrige erro de Cors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
