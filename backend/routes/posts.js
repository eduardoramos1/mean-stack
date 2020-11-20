const express = require("express");
// multer permite extrair arquivos enviados pela requisição
const multer = require("multer");
const { create } = require("./../models/post");
const Post = require("./../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Mime type inválido");
    if (isValid) {
      error = null;
    }
    // caminho é relativo ao arquivo server.js
    callback(error, "backend/images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    // cosntroi uma imagem com nome único
    callback(null, name + "-" + Date.now() + "." + extension);
  },
});

// multer vai tentar extrair a única imagem que vai vir da requisição
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    // constroi uma url
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });

    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post incluido com sucesso",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }

    const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
    });
    Post.updateOne({ _id: req.params.id }, post).then((post) => {
      console.log(post);
      res.status(200).json({ message: "Post atualizado!" });
    });
  }
);

router.get("", (req, res, next) => {
  // todo valor que vem do parametro da url é string
  // + converte a string para número
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();

  let fetchedPosts = null;

  // checa se há parametro para paginação e realiza paginação
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((posts) => {
      fetchedPosts = posts;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts retornados com sucesso!",
        posts: fetchedPosts,
        maxPosts: count,
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
