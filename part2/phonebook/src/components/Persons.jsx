import { useState } from 'react'

export default function Persons({ persons, searchInput }) {
  return (
    <div>
      {Array.isArray(persons) &&
        persons
          .filter(person => {
            const name = person.name ? person.name.toLowerCase() : ''
            const search = searchInput ? searchInput.toLowerCase() : ''
            return name.includes(search)
          })
          .map(person => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))}
    </div>
  )
}
