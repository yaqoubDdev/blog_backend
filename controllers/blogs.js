const blogsRouter = require("express").Router()
const Blog = require("../model/blog")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id

  const blog = await Blog.findById(id)
  if(blog) {
    res.json(blog)
  }else{
    res.status(404).end()
  }
    

});

blogsRouter.post("/", async (req, res, next) => {
  const { author, likes, url, title } = req.body
  const blog = new Blog({ author, likes, url, title })

  try {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
});

module.exports = blogsRouter;
