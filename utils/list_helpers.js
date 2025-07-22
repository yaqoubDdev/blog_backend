const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if(blogs.length === 0) return 0
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return null
  const blog = blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite
  })

  return blog
}

module.exports = {dummy, totalLikes, favoriteBlog}