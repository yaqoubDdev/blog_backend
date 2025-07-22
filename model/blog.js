const mongo = require("mongoose");

const blogSchema = new mongo.Schema({
  author: {
    type: String,
    minLength: 4,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongo.model("Blog", blogSchema)
