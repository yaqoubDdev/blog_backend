const { test, describe } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/list_helpers').favoriteBlog

describe('favorite blog test', () => {
  test('of an empty blogs array', () => {
    const blogs = []
    const result = favoriteBlog(blogs)
    assert.deepEqual(result, null)
  })
  test('of a blogs array caontaining some blogs', () => {
    const blogs = [
      { title: "Blog A", author: "Author A", likes: 10 },
      { title: "Blog B", author: "Author B", likes: 25 },
      { title: "Blog C", author: "Author C", likes: 18 }
    ]
    const result = favoriteBlog(blogs)
    assert.deepEqual(result, blogs[1])
  })
  test('of a array of blogs with two same likes count', () => {
    const blogs = [
      { title: "Blog A", author: "Author A", likes: 10 },
      { title: "Blog B", author: "Author B", likes: 2 },
      { title: "Blog C", author: "Author B", likes: 25 },
      { title: "Blog D", author: "Author C", likes: 25 }
    ]
    const result = favoriteBlog(blogs)
    assert.deepEqual(result, blogs[2])
  })
})