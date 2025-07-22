const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {

  const response = await api
    .get('/home/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.length, helper.initialBlogs.length)

  
})

test('a specific blog is within  the returned blogs', async () => {
  const response = await api.get('/home/blogs')
  const titles = response.body.map(b => b.title)
  assert.strictEqual(titles.includes('React patterns'), true)
})

test('all blogs are returned', async () => {
  const res = await api.get('/home/blogs')
  assert.strictEqual(res.body.length, helper.initialBlogs.length)
})

test('a new blog can be added', async () => {
  const newBlog = {
    author: 'yakub',
    title: 'all is well',
    url: 'http://yakub.com',
    likes: 2,
  }

  await api
    .post('/home/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(b => b.title)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert(titles.includes('all is well'))
})

test('blog without author is not added', async () => {
  const newBlog = {
    title: 'all is well',
    url: 'http://yakub.com',
    likes: 2,
  }

  await api
    .post('/home/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a single blog can be viewed', async () => {
  const blogSAtStart = await helper.blogsInDb()
  const blogToView = blogSAtStart[0]

  const response = await api
    .get(`/home/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(response.body, blogToView)
})

test('a non existing blog fails with status code 404', async () => {
  const id = await helper.nonExistingId()
  await api
    .get(`/home/blogs/${id}`)
    .expect(404)
})
test('an ivalid id fails with status code 400', async () => {
  const id = '12345643213245ergf'
  await api
    .get(`/home/blogs/${id}`)
    .expect(400)
})


after(async () => {
  await mongoose.connection.close()
})