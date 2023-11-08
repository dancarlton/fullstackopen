import { useState } from 'react'

export default function Persons({ persons, searchInput }) {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(searchInput))
        .map(person => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
    </div>
  )
}
