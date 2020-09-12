const app = require("express")();

app.use("/api/posts", (req, res, next) => {
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
