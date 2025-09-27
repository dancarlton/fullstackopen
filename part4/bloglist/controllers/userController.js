const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET all
usersRouter.get('/', async (request, response, next) => {
  try {
    const user = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })
    response.json(user)
  } catch (err) {
    next(err)
  }
})

// POST new
usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long',
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter
