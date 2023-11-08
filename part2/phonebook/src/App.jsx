import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Form from './components/Form'
import Persons from './components/Persons'

export default function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])

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
      <SearchBar searchInput={searchInput} handleSearch={handleSearch} />

      <h2>Add New</h2>
      <Form
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} searchInput={searchInput} />
    </div>
  )
}
