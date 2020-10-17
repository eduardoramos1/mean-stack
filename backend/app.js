const app = require("express")();
const bodyParser = require("body-parser");
const { error } = require("console");
const mongoose = require("mongoose");

const Post = require("./models/post");

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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save().then((result) => {
    res.status(201).json({
      message: "Post incluido com sucesso",
      post: result,
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((res) => {
    console.log(res);
    res.status(200).json({ message: "Post atualizado!" });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((posts) => {
      console.log(posts);
      res.status(200).json({
        message: "Posts retornados com sucesso!",
        posts,
      });
    })
    .catch((err) => {
      console.log("Não foi possivel buscar dados");
      console.error(err);
    });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post não encontrado" });
    }
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post excluído com sucesso" });
  });
});

module.exports = app;
