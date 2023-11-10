import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import Form from './components/Form'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from '../../notes/components/Notification'

export default function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [newNotification, setNewNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response.data))
      .catch(err => console.error('Error connecting to API:', err.message))
  }, [])

  const addName = e => {
    e.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const updatedPerson = { ...existingPerson, number: newNumber }

      personsService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(prevPersons =>
            prevPersons.map(person =>
              person.id === response.data.id ? response.data : person
            )
          )
          console.log(`${response.data.name}'s number was updated`)
          setNewName('')
          setNewNumber('')
        })
        .catch(err => console.error('Error updating person:', err))
    } else {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }

      personsService
        .create(newPerson)
        .then(response => {
          setPersons([...persons, response.data])
          console.log(`${response.data.name} was added to the phonebook`)
          setNewName('')
          setNewNumber('')
          setNewNotification(
            `Added ${response.data.name}`
          )
          setTimeout(() => {
            setNewNotification(null)
          }, 3000);
        })
        .catch(err => {
          console.error('Error adding new person:', err)
        })
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

  const handleDelete = id => {
    const personsToDelete = persons.find(person => person.id === id)

    if (!personsToDelete) {
      console.error('Person not found for deletion')
    }

    if (
      window.confirm(
        `Are you sure you want to delete '${personsToDelete.name}' from the phonebook?`
      )
    ) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(`${personsToDelete.name} was deleted from the phonebook`)
        })
        .catch(error => {
          console.error('Error deleting person:', error.message)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} />
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
      <Persons
        persons={persons}
        searchInput={searchInput}
        handleDelete={handleDelete}
      />
    </div>
  )
}
