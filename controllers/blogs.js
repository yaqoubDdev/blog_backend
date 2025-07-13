const blogRouter = require("express").Router();
const Blog = require("../model/blog");

blogRouter.get("/", (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((error) => res.json(error.message));
});

blogRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((blog) => {
      if (!blog) return res.status(404).end();
      res.json(blog);
    })
    .catch((error) => next(error));
});

blogRouter.post("/", (req, res, next) => {
  const { author, likes } = req.body;
  if (!author || !likes) {
    return res
      .status(400)
      .json({
        error: "missing author and/or likes",
      })
      .end();
  }
  const blog = new Blog({ author, likes });
  blog
    .save()
    .then((savedBlog) => {
      res.json(savedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
