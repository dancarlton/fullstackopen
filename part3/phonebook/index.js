require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/phonebook')

const app = express()

app.use(express.json())

morgan.token('body', req => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// display all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// add a person
app.post('/api/persons', (req, res) => {
  const {name, number } = req.body
  const randomId = Math.floor(Math.random() * 1000000)

  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' })
  }

  // check uniqueness
  Person.findOne({ name })
  .then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({ error: 'name bust be unique' }).end()
      } else {

        const person = new Person({
          id: randomId,
          name,
          number,
        })

        person.save().then(savedPerson => res.json(savedPerson))
      }
    })

})

// get individual person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
})

// delete a person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
  .then(person => {
    if (person) res.status(204).end()
  })


})

// get info
app.get('/info', (req, res) => {
  const ppl = persons.length
  const date = new Date()

  res.send(`<p>Phonebook has info for ${ppl} people</p>
        <p>${date}</p>`)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
