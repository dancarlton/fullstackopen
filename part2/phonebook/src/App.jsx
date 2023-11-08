import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '',
    },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  )
}

export default App
