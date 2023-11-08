import { useState } from 'react'

export default function SearchBar({ searchInput, handleSearch}) {
  return (
    <div>
      filter shown with
      <input value={searchInput} onChange={handleSearch} />
    </div>
  )
}
