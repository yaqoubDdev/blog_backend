require('dotenv').config()
const mongo = require('mongoose')
mongo.set('strictQuery', false)

mongo.connect(process.env.MONGODB_URI)
  .then(result => console.log("connected to MongoDb"))
  .catch(error => console.log('error connecting to MongoDb:', error.message) )

const blogSchema = new mongo.Schema({
  author: String,
  likes: Number
})

module.exports = mongo.model('Blog', blogSchema)

