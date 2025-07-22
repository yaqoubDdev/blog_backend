const { test, describe } = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/list_helpers').totalLikes

describe('total likes test', () => {
  test('of empty list is 0', () => {
    const blogs = []
    const result = totalLikes(blogs)
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{author: 'benjamin', likes: 5}]
    const result = totalLikes(blogs)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right', () => {
    const blogs = [
      {author: 'benjamin', likes: 5},
      {author: 'chorol', likes: 10},
      {author: 'aflik', likes: 50}
    ]

    const result = totalLikes(blogs)
    assert.strictEqual(result, 65)
  })
})