import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const addName = e => {
    e.preventDefault()

    if (
      persons.find(
        person => person.name === newName || person.number === newNumber
      )
    ) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }
      setPersons([...persons, newPerson])
      setNewName['']
      setNewNumber['']
    }
  }

  const handleNewName = e => {
    setNewName(e.target.value)
  }

  const handleNewNumber = e => {
    setNewNumber(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  if (searchInput.length > 0) {
    persons.filter(person => {
      return person.name.match(searchInput)
    })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={searchInput} onChange={handleSearch} />
      </div>

      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(searchInput)).map(person => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  )
}

export default App
