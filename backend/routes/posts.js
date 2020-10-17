const express = require("express");
const Post = require("./../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((post) => {
    console.log(post);
    res.status(200).json({ message: "Post atualizado!" });
  });
});

router.get("", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post não encontrado" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post excluído com sucesso" });
  });
});

module.exports = router;
