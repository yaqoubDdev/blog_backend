const blogRouter = require("express").Router();
const Blog = require("../model/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs);
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
  const { author, likes, url, title } = req.body;
  if (!author || !likes || !title || !url) {
    return res
      .status(400)
      .json({
        error: "missing author and/or likes",
      })
      .end();
  }
  const blog = new Blog({ author, likes, url, title });
  blog
    .save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
