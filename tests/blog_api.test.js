const {test, after, beforeEach, before, describe} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blog')
const helper = require('./test_helper')
const { request } = require('node:http')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {

  await api
    .get('/home/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
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

  const res = await api.get('/home/blogs')
  const titles = res.body.map(b => b.title)
  console.log(res.body)
  console.log(titles)
  assert.strictEqual(res.body.length, helper.initialBlogs.length + 1)
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

  const res = await api.get('/home/blogs')
  assert.strictEqual(res.body.length, helper.initialBlogs.length)
})


after(async () => {
  await mongoose.connection.close()
})