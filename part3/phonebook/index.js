const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

// get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// get info
app.get('/info', (req, res) => {
  const ppl = persons.length
  const date = new Date()

  res.send(`<p>Phonebook has info for ${ppl} people</p>
        <p>${date}</p>`)
})

// get individual person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// delete a person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

// add a person
app.post('/api/persons', (req, res) => {
  const body = req.body
  const randomId = Math.floor(Math.random() * 1000000)

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  }

  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({error: 'name bust be unique'})
  }

  const person = {
    id: randomId,
    name: body.name,
    number: body.number,
  }

  persons = [...persons, person]

  res.json(person)
})
