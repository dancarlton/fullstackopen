const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

// GET all
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

// POST new
blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.userId) {
      return response.status(400).json({ error: 'userId is required'})
    }

    const user = await User.findById(body.userId)
    if (!user) {
      return response.status(400).json({ error: 'invalid user' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
