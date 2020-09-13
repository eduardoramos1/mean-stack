const app = require("express")();
const bodyParser = require("body-parser");

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
  console.log(req.body);
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
