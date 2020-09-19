const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

mongoose
  .connect(
    "mongodb+srv://eduardo:bWwBxDUhL0HBjFop@cluster0.dbezk.mongodb.net/<dbname>?retryWrites=true&w=majority",
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
    "GET,POST,PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  res.status(201).json({
    message: "Post incluido com sucesso",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "asdasdsa",
      title: "Primeiro server-side post",
      content: "Primeiro conteudo server-side",
    },
    {
      id: "sASA",
      title: "Segundo server-side post",
      content: "Segundo conteudo server-side",
    },
    {
      id: "daDASas",
      title: "Terceiro server-side post",
      content: "Terceiro conteudo server-side",
    },
  ];
  res.status(200).json({
    message: "Posts retornados com sucesso!",
    posts,
  });
});

module.exports = app;
