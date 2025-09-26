const assert = require('node:assert')
const { test, beforeEach, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    ids.forEach(id => assert(id))
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Async/Await Testing',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Async/Await Testing'))
  })

  test('defaults likes to 0 if missing', async () => {
    const newBlog = {
      title: 'No likes yet',
      author: 'Anonymous',
      url: 'http://nolikes.com'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    assert.strictEqual(result.body.likes, 0)
  })

  test('fails with status 400 if title is missing', async () => {
    const newBlog = { author: 'Anon', url: 'http://fail.com' }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('fails with status 400 if url is missing', async () => {
    const newBlog = { author: 'Anon', title: 'No URL' }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})

