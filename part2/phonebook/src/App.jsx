import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
    },
  ])
  const [newName, setNewName] = useState('')

  const addName = e => {
    e.preventDefault()
    setPersons(persons.concat({name: newName}))
    console.log(persons)
  }

  const handleNewName = e => {
    e.preventDefault()
    setNewName(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <li key={person.id}>{person.name}</li>
      ))}
    </div>
  )
}

export default App
