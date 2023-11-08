import { useState } from 'react'

export default function Form({
  addName,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
}) {
  return (
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
  )
}
