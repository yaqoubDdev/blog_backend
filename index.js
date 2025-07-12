const express = require("express");
const Blog = require("./model/blogs");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const logger = (req, res, next) => {
  console.log("----------------------");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("----------------------");

  next();
};

const blogs = [
  {
    author: "yaqoub",
    likes: 10,
  },
  {
    author: "bepo",
    likes: 50,
  },
];

app.use(logger);

app.get("/", (req, res) => {
  res.send(`<h1>Hello world from app re:</h1>`);
});

app.get("/home/blogs", (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((error) => res.json(error.message));
});

app.post("/home/blogs", (req, res) => {
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
    .catch((error) => {
      res.json(error.message);
    });
});

app.listen(PORT, () => console.log(`App is alive at http://localhost:${PORT}`));
