const Blog = require('../models/blogs')

const initialBlogs = [
  { title: 'First blog', author: 'Author One', url: 'http://example.com/1', likes: 1 },
  { title: 'Second blog', author: 'Author Two', url: 'http://example.com/2', likes: 2 }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
